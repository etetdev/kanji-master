/**
 * Parser for Japanese revision markdown files.
 *
 * Supported format:
 * # [Kanji]         ← each heading IS a kanji
 * ---
 * **Signification :** [meaning]
 * **Prononciations :** [readings]
 * **Vocabulaire :**
 * - **[word]** : [reading] — [translation]
 *
 * ----- (separator between kanji blocks)
 *
 * Optionally, the file can start with a non-CJK heading like # SEMAINE 1
 */

/**
 * Check if a string contains CJK characters.
 */
function containsCJK(str) {
  return /[\u3000-\u9FFF\uF900-\uFAFF]/.test(str);
}

/**
 * Parse a markdown string into a structured week object.
 * @param {string} markdown - Raw markdown content
 * @param {string} [fileName] - Optional filename to use as week name fallback
 * @returns {{ weekName: string, kanjis: Array }}
 */
export function parseMarkdown(markdown, fileName) {
  const lines = markdown.split(/\r?\n/);
  let weekName = '';
  const kanjis = [];

  // Collect all headings (#) to determine the file structure
  const headings = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#\s+(.+)$/);
    if (match) {
      headings.push({ index: i, text: match[1].trim() });
    }
  }

  if (headings.length === 0) {
    return { weekName: fileName || 'Import', kanjis: [] };
  }

  // Determine if the first heading is a week name or a kanji
  // If it contains CJK characters and is short, it's a kanji heading
  const firstHeading = headings[0];
  let kanjiHeadings;

  if (containsCJK(firstHeading.text) && firstHeading.text.length <= 6) {
    // All headings are kanji entries — no week name in file
    weekName = fileName || 'Import';
    kanjiHeadings = headings;
  } else {
    // First heading is the week name
    weekName = firstHeading.text;
    kanjiHeadings = headings.slice(1);

    // If remaining headings are NOT CJK, try old block-based parsing
    if (kanjiHeadings.length === 0) {
      // Fallback: try to parse without headings as kanji markers
      return { weekName, kanjis: parseBlockStyle(lines, weekName) };
    }
  }

  // Parse each kanji section (from one # heading to the next, or to -----)
  for (let h = 0; h < kanjiHeadings.length; h++) {
    const startLine = kanjiHeadings[h].index;
    const kanjiChar = kanjiHeadings[h].text;

    // Find end of this block: next heading or end of file
    const endLine = h + 1 < kanjiHeadings.length
      ? kanjiHeadings[h + 1].index
      : lines.length;

    // Extract lines for this block (skip the heading itself)
    const blockLines = lines.slice(startLine + 1, endLine);

    const block = parseKanjiLines(kanjiChar, blockLines);
    if (block) {
      kanjis.push(block);
    }
  }

  return { weekName, kanjis };
}

/**
 * Parse kanji metadata + vocabulary from a slice of lines.
 * @param {string} kanjiChar - The kanji character(s)
 * @param {string[]} blockLines - Lines after the # heading
 * @returns {Object}
 */
function parseKanjiLines(kanjiChar, blockLines) {
  let explanation = '';
  let pronunciations = '';
  const vocabulary = [];
  let inVocab = false;

  for (const line of blockLines) {
    const trimmed = line.trim();

    // Skip separators and empty lines
    if (!trimmed || /^-{3,}\s*$/.test(trimmed)) continue;

    // Skip block separators
    if (/^-{5,}\s*$/.test(trimmed)) continue;

    // Check for explanation/signification
    const explMatch = trimmed.match(/^\*\*(Explication|Signification)\s*:?\*\*\s*:?\s*(.+)$/i);
    if (explMatch) {
      explanation = explMatch[2].trim();
      continue;
    }

    // Check for pronunciations
    const pronMatch = trimmed.match(/^\*\*Prononciations?\s*:?\*\*\s*:?\s*(.+)$/i);
    if (pronMatch) {
      pronunciations = pronMatch[1].trim();
      continue;
    }

    // Check for vocabulary section header
    if (/^\*\*Vocabulaire\s*:?\*\*\s*:?\s*$/i.test(trimmed)) {
      inVocab = true;
      continue;
    }

    // Parse vocabulary items (lines starting with - or *)
    if (inVocab && (trimmed.startsWith('-') || trimmed.startsWith('*'))) {
      const vocabItem = parseVocabLine(trimmed);
      if (vocabItem) {
        vocabulary.push(vocabItem);
      }
    }
  }

  return {
    kanji: kanjiChar,
    explanation,
    pronunciations,
    vocabulary,
  };
}

/**
 * Fallback: parse old block-style format where kanji is a plain line (not a heading).
 */
function parseBlockStyle(lines, weekName) {
  const kanjis = [];
  let i = 0;

  // Skip heading
  while (i < lines.length && !lines[i].match(/^#/)) i++;
  if (i < lines.length) i++; // skip the heading line

  let currentKanji = null;
  let currentLines = [];

  for (; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Block separator
    if (/^-{5,}\s*$/.test(trimmed)) {
      if (currentKanji) {
        const block = parseKanjiLines(currentKanji, currentLines);
        if (block) kanjis.push(block);
      }
      currentKanji = null;
      currentLines = [];
      continue;
    }

    // Detect kanji line: short line with CJK, followed by ---
    if (!currentKanji && containsCJK(trimmed) && trimmed.length <= 6) {
      // Look ahead for ---
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === '') next++;
      if (next < lines.length && /^-{3,}\s*$/.test(lines[next].trim())) {
        currentKanji = trimmed;
        currentLines = [];
        continue;
      }
    }

    if (currentKanji) {
      currentLines.push(lines[i]);
    }
  }

  // Last block
  if (currentKanji) {
    const block = parseKanjiLines(currentKanji, currentLines);
    if (block) kanjis.push(block);
  }

  return kanjis;
}

/**
 * Parse a vocabulary line.
 * Supports:
 *   - **word** : reading — translation
 *   * **word** : reading — translation
 *   - **word** : reading - translation
 *
 * Reading may contain romaji in parentheses, e.g., シッパイ (shippai)
 */
function parseVocabLine(line) {
  // Remove leading bullet (- or *)
  let cleaned = line.replace(/^[\*\-]\s*/, '').trim();

  // Try: **word** : reading — translation
  // Support multiple separator types: —, –, -, --
  const match = cleaned.match(
    /^\*\*(.+?)\*\*\s*[:：]\s*(.+?)\s+[—–\-]{1,2}\s+(.+)$/
  );

  if (match) {
    return extractVocabParts(match[1], match[2], match[3]);
  }

  // Fallback without bold: word : reading — translation
  const fallback = cleaned.match(
    /^(.+?)\s*[:：]\s*(.+?)\s+[—–\-]{1,2}\s+(.+)$/
  );
  if (fallback) {
    return extractVocabParts(fallback[1], fallback[2], fallback[3]);
  }

  return null;
}

/**
 * Extract vocab parts with romaji isolation.
 */
function extractVocabParts(rawWord, rawReading, rawTranslation) {
  const word = rawWord.trim();
  const rawReadingTrimmed = rawReading.trim();
  const translation = rawTranslation.trim();

  let reading = rawReadingTrimmed;
  let romaji = '';

  // Match romaji in parentheses: シッパイ (shippai) or かつ(katsu)
  // Support both () and （）
  const romajiMatch = rawReadingTrimmed.match(/^(.+?)\s*[（(]([a-zA-Zōūāēîô\s,.''\-]+)[）)]\s*$/);
  if (romajiMatch) {
    reading = romajiMatch[1].trim();
    romaji = romajiMatch[2].trim();
  }

  return { word, reading, romaji, translation };
}

/**
 * Generate flashcards from parsed week data.
 */
export function generateCards(weekData) {
  const cards = [];

  for (const kanjiBlock of weekData.kanjis) {
    cards.push({
      id: `kanji-${kanjiBlock.kanji}-${weekData.weekName}`,
      type: 'kanji',
      question: kanjiBlock.kanji,
      answer: kanjiBlock.explanation,
      hint: kanjiBlock.pronunciations,
      week: weekData.weekName,
      distractorPool: 'explanation',
    });

    for (const vocab of kanjiBlock.vocabulary) {
      cards.push({
        id: `vocab-${vocab.word}-${weekData.weekName}`,
        type: 'vocab',
        question: vocab.word,
        answer: vocab.reading,
        romaji: vocab.romaji,
        translation: vocab.translation,
        week: weekData.weekName,
        distractorPool: 'reading',
      });
    }
  }

  return cards;
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate MCQ options for a card.
 */
export function generateMCQOptions(card, allCards, numOptions = 4) {
  const correctAnswer = card.type === 'kanji' ? card.answer : card.translation;

  const distractorCandidates = allCards
    .filter(c => c.id !== card.id && c.type === card.type)
    .map(c => (c.type === 'kanji' ? c.answer : c.translation))
    .filter(a => a !== correctAnswer);

  const uniqueDistractors = [...new Set(distractorCandidates)];
  const shuffledDistractors = shuffle(uniqueDistractors).slice(0, numOptions - 1);

  const options = [
    { text: correctAnswer, correct: true },
    ...shuffledDistractors.map(d => ({ text: d, correct: false })),
  ];

  while (options.length < numOptions) {
    options.push({ text: '—', correct: false });
  }

  return shuffle(options);
}
