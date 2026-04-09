export const LEXICON = {
  godan: [
    { base: '買[か]う', answerBase: 'かう', type: 'godan-u', fr: 'acheter' },
    { base: '会[あ]う', answerBase: 'あう', type: 'godan-u', fr: 'rencontrer' },
    { base: '待[ま]つ', answerBase: 'まつ', type: 'godan-tsu', fr: 'attendre' },
    { base: '立[た]つ', answerBase: 'たつ', type: 'godan-tsu', fr: 'se lever' },
    { base: '帰[かえ]る', answerBase: 'かえる', type: 'godan-ru', fr: 'rentrer' },
    { base: '走[はし]る', answerBase: 'はしる', type: 'godan-ru', fr: 'courir' },
    { base: '遊[あそ]ぶ', answerBase: 'あそぶ', type: 'godan-bu', fr: 'jouer' },
    { base: '呼[よ]ぶ', answerBase: 'よぶ', type: 'godan-bu', fr: 'appeler' },
    { base: '飲[の]む', answerBase: 'のむ', type: 'godan-mu', fr: 'boire' },
    { base: '読[よ]む', answerBase: 'よむ', type: 'godan-mu', fr: 'lire' },
    { base: '死[し]ぬ', answerBase: 'しぬ', type: 'godan-nu', fr: 'mourir' },
    { base: '書[か]く', answerBase: 'かく', type: 'godan-ku', fr: 'écrire' },
    { base: '聞[き]く', answerBase: 'きく', type: 'godan-ku', fr: 'écouter' },
    { base: '行[い]く', answerBase: 'いく', type: 'godan-iku', fr: 'aller' },
    { base: '泳[およ]ぐ', answerBase: 'およぐ', type: 'godan-gu', fr: 'nager' },
    { base: '急[いそ]ぐ', answerBase: 'いそぐ', type: 'godan-gu', fr: 'se dépêcher' },
    { base: '話[はな]す', answerBase: 'はなす', type: 'godan-su', fr: 'parler' },
    { base: '消[け]す', answerBase: 'けす', type: 'godan-su', fr: 'éteindre' }
  ],
  ichidan: [
    { base: '食[た]べる', answerBase: 'たべる', type: 'ichidan', fr: 'manger' },
    { base: '見[み]る', answerBase: 'みる', type: 'ichidan', fr: 'voir' },
    { base: '起[お]きる', answerBase: 'おきる', type: 'ichidan', fr: 'se lever' },
    { base: '寝[ね]る', answerBase: 'ねる', type: 'ichidan', fr: 'dormir' }
  ],
  irregular: [
    { base: '来[く]る', answerBase: 'くる', type: 'irregular-kuru', fr: 'venir' },
    { base: 'する', answerBase: 'する', type: 'irregular-suru', fr: 'faire' },
    { base: '勉強[べんきょう]する', answerBase: 'べんきょうする', type: 'irregular-suru', fr: 'étudier' }
  ],
  adjI: [
    { base: '高[たか]い', answerBase: 'たかい', type: 'adj-i', fr: 'haut / cher' },
    { base: '新[あたら]しい', answerBase: 'あたらしい', type: 'adj-i', fr: 'nouveau' },
    { base: '大[おお]きい', answerBase: 'おおきい', type: 'adj-i', fr: 'grand' },
    { base: '安[やす]い', answerBase: 'やすい', type: 'adj-i', fr: 'pas cher' },
    { base: '面白[おもしろ]い', answerBase: 'おもしろい', type: 'adj-i', fr: 'intéressant' }
  ],
  adjNa: [
    { base: '便利[べんり]', answerBase: 'べんり', type: 'adj-na', fr: 'pratique' },
    { base: '静[しず]か', answerBase: 'しずか', type: 'adj-na', fr: 'calme' },
    { base: '有名[ゆうめい]', answerBase: 'ゆうめい', type: 'adj-na', fr: 'célèbre' },
    { base: '暇[ひま]', answerBase: 'ひま', type: 'adj-na', fr: 'libre (temps)' },
    { base: 'きれい', answerBase: 'きれい', type: 'adj-na', fr: 'beau / propre' }
  ]
};

// Utils
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const replaceLast = (str, len, replacement) => str.slice(0, -len) + replacement;

// Te Form Generator
const getTeForm = (wordObj) => {
  const { base, answerBase, type } = wordObj;
  
  if (type.startsWith('godan')) {
    if (type === 'godan-u' || type === 'godan-tsu' || type === 'godan-ru') {
      return { q: base, a: replaceLast(answerBase, 1, 'って'), f: replaceLast(base, 1, 'って') };
    }
    if (type === 'godan-bu' || type === 'godan-mu' || type === 'godan-nu') {
      return { q: base, a: replaceLast(answerBase, 1, 'んで'), f: replaceLast(base, 1, 'んで') };
    }
    if (type === 'godan-iku') {
      return { q: base, a: replaceLast(answerBase, 1, 'って'), f: replaceLast(base, 1, 'って') };
    }
    if (type === 'godan-ku') {
      return { q: base, a: replaceLast(answerBase, 1, 'いて'), f: replaceLast(base, 1, 'いて') };
    }
    if (type === 'godan-gu') {
      return { q: base, a: replaceLast(answerBase, 1, 'いで'), f: replaceLast(base, 1, 'いで') };
    }
    if (type === 'godan-su') {
      return { q: base, a: replaceLast(answerBase, 1, 'して'), f: replaceLast(base, 1, 'して') };
    }
  } else if (type === 'ichidan') {
    return { q: base, a: replaceLast(answerBase, 1, 'て'), f: replaceLast(base, 1, 'て') };
  } else if (type === 'irregular-kuru') {
    return { q: base, a: 'きて', f: '来[き]て' };
  } else if (type === 'irregular-suru') {
    return { q: base, a: replaceLast(answerBase, 2, 'して'), f: replaceLast(base, 2, 'して') };
  }
  return { q: base, a: base, f: base };
};

// Adjectives Form Generator
const generateAdjectiveForms = (wordList, count) => {
  const questions = [];
  const formsAdjI = [
    { label: "Affirmation (présent)", modA: orig => orig + "です", modF: orig => orig + "です" },
    { label: "Affirmation (passé)", modA: orig => replaceLast(orig, 1, "かったです"), modF: orig => replaceLast(orig, 1, "かったです") },
    { label: "Négation - Écrit (présent)", modA: orig => replaceLast(orig, 1, "くありません"), modF: orig => replaceLast(orig, 1, "くありません") },
    { label: "Négation - Écrit (passé)", modA: orig => replaceLast(orig, 1, "くありませんでした"), modF: orig => replaceLast(orig, 1, "くありませんでした") },
    { label: "Négation - Oral Soutenu (présent)", modA: orig => replaceLast(orig, 1, "くありません"), modF: orig => replaceLast(orig, 1, "くありません") },
    { label: "Négation - Oral Soutenu (passé)", modA: orig => replaceLast(orig, 1, "くありませんでした"), modF: orig => replaceLast(orig, 1, "くありませんでした") },
    { label: "Négation - Oral courant (présent)", modA: orig => replaceLast(orig, 1, "くないです"), modF: orig => replaceLast(orig, 1, "くないです") },
    { label: "Négation - Oral courant (passé)", modA: orig => replaceLast(orig, 1, "くなかったです"), modF: orig => replaceLast(orig, 1, "くなかったです") },
    { label: "Forme adnominale", modA: orig => orig, modF: orig => orig },
    { label: "Forme adverbiale", modA: orig => replaceLast(orig, 1, "く"), modF: orig => replaceLast(orig, 1, "く") },
    { label: "Forme en て", modA: orig => replaceLast(orig, 1, "くて"), modF: orig => replaceLast(orig, 1, "くて") }
  ];

  const formsAdjNa = [
    { label: "Affirmation (présent)", modA: orig => orig + "です", modF: orig => orig + "です" },
    { label: "Affirmation (passé)", modA: orig => orig + "でした", modF: orig => orig + "でした" },
    { label: "Négation - Écrit (présent)", modA: orig => orig + "ではありません", modF: orig => orig + "ではありません" },
    { label: "Négation - Écrit (passé)", modA: orig => orig + "ではありませんでした", modF: orig => orig + "ではありませんでした" },
    { label: "Négation - Oral conseillé (présent)", modA: orig => orig + "じゃありません", modF: orig => orig + "じゃありません" },
    { label: "Négation - Oral conseillé (passé)", modA: orig => orig + "じゃありませんでした", modF: orig => orig + "じゃありませんでした" },
    { label: "Négation - Oral peu conseillé (présent)", modA: orig => orig + "じゃないです", modF: orig => orig + "じゃないです" },
    { label: "Négation - Oral peu conseillé (passé)", modA: orig => orig + "じゃなかったです", modF: orig => orig + "じゃなかったです" },
    { label: "Forme adnominale", modA: orig => orig + "な", modF: orig => orig + "な" },
    { label: "Forme adverbiale", modA: orig => orig + "に", modF: orig => orig + "に" },
    { label: "Forme en て", modA: orig => orig + "で", modF: orig => orig + "で" }
  ];

  for (let i = 0; i < count; i++) {
    const word = randomItem(wordList);
    const forms = word.type === 'adj-i' ? formsAdjI : formsAdjNa;
    const form = randomItem(forms);
    
    questions.push({
      item: word,
      label: form.label,
      qTarget: word.base,
      a: form.modA(word.answerBase),
      aDisplay: form.modF(word.base)
    });
  }
  return questions;
};

// Conversions Poli -> Neutre
const getNeutralForm = (wordObj, poliMode) => {
  // poliMode: 'masu', 'mashita', 'masen', 'desu'
  const { base, answerBase, type } = wordObj;

  // We need to construct the Poli string, and the Neutre string
  let poliA, poliF, neutreA, neutreF;

  if (poliMode === 'desu') {
    poliA = answerBase + "です";
    poliF = base + "です";
    neutreA = answerBase + "だ";
    neutreF = base + "だ";
    return { qBase: wordObj, label: "Présent poli → Neutre", qTextF: poliF, aText: neutreA, aTextF: neutreF };
  }

  // Verbs
  // helper to get base masu stem
  const getMasuStem = (wBase, wBaseAns, wType) => {
    if (wType.startsWith('godan')) {
      const eSoundMapA = {'う':'い', 'つ':'ち', 'る':'り', 'ぶ':'び', 'む':'み', 'ぬ':'に', 'く':'き', 'ぐ':'ぎ', 'す':'し'};
      const lastA = wBaseAns.slice(-1);
      return { 
        stemA: replaceLast(wBaseAns, 1, eSoundMapA[lastA]),
        stemF: replaceLast(wBase, 1, eSoundMapA[lastA])
      };
    } else if (wType === 'ichidan') {
      return { stemA: replaceLast(wBaseAns, 1, ''), stemF: replaceLast(wBase, 1, '') };
    } else if (wType === 'irregular-kuru') {
      return { stemA: 'き', stemF: '来[き]' };
    } else if (wType === 'irregular-suru') {
      return { stemA: replaceLast(wBaseAns, 2, 'し'), stemF: replaceLast(wBase, 2, 'し') };
    }
  };

  const getNaiForm = (wBase, wBaseAns, wType) => {
    if (wType === 'godan-u' || wType === 'godan-iku') {
      return { a: replaceLast(wBaseAns, 1, 'わない'), f: replaceLast(wBase, 1, 'わない') };
    } else if (wType.startsWith('godan')) {
      const aSoundMapA = {'つ':'た', 'る':'ら', 'ぶ':'ば', 'む':'ま', 'ぬ':'な', 'く':'か', 'ぐ':'が', 'す':'さ'};
      const lastA = wBaseAns.slice(-1);
      return { a: replaceLast(wBaseAns, 1, aSoundMapA[lastA] + 'ない'), f: replaceLast(wBase, 1, aSoundMapA[lastA] + 'ない') };
    } else if (wType === 'ichidan') {
      return { a: replaceLast(wBaseAns, 1, 'ない'), f: replaceLast(wBase, 1, 'ない') };
    } else if (wType === 'irregular-kuru') {
      return { a: 'こない', f: '来[こ]ない' };
    } else if (wType === 'irregular-suru') {
      return { a: replaceLast(wBaseAns, 2, 'しない'), f: replaceLast(wBase, 2, 'しない') };
    }
  };

  const { stemA, stemF } = getMasuStem(base, answerBase, type);
  
  if (poliMode === 'masu') {
    return { qBase: wordObj, label: "Forme V-ます → dictionnaire", qTextF: stemF + "ます", aText: answerBase, aTextF: base };
  } else if (poliMode === 'mashita') {
    const te = getTeForm(wordObj);
    // た is te but with a/da instead of e/de
    const taA = te.a.endsWith('で') ? replaceLast(te.a, 1, 'だ') : replaceLast(te.a, 1, 'た');
    const taF = te.f.endsWith('で') ? replaceLast(te.f, 1, 'だ') : replaceLast(te.f, 1, 'た');
    return { qBase: wordObj, label: "Forme V-ました → V-た", qTextF: stemF + "ました", aText: taA, aTextF: taF };
  } else if (poliMode === 'masen') {
    const nai = getNaiForm(base, answerBase, type);
    return { qBase: wordObj, label: "Forme V-ません → V-ない", qTextF: stemF + "ません", aText: nai.a, aTextF: nai.f };
  }
};

const getVerbConjugations = (wordObj, mode) => {
  const { base, answerBase, type } = wordObj;

  // Potentiel, Factitif, Passif, Factitif-Passif
  const conjIchidan = {
    'potentiel': { a: replaceLast(answerBase, 1, 'られる'), f: replaceLast(base, 1, 'られる') },
    'factitif': { a: replaceLast(answerBase, 1, 'させる'), f: replaceLast(base, 1, 'させる') },
    'passif': { a: replaceLast(answerBase, 1, 'られる'), f: replaceLast(base, 1, 'られる') },
    'factitif-passif': { a: replaceLast(answerBase, 1, 'させられる'), f: replaceLast(base, 1, 'させられる') }
  };

  const conjKuru = {
    'potentiel': { a: 'こられる', f: '来[こ]られる' },
    'factitif': { a: 'こさせる', f: '来[こ]させる' },
    'passif': { a: 'こられる', f: '来[こ]られる' },
    'factitif-passif': { a: 'こさせられる', f: '来[こ]させられる' }
  };

  const conjSuru = {
    'potentiel': { a: replaceLast(answerBase, 2, 'できる'), f: replaceLast(base, 2, 'できる') },
    'factitif': { a: replaceLast(answerBase, 2, 'させる'), f: replaceLast(base, 2, 'させる') },
    'passif': { a: replaceLast(answerBase, 2, 'される'), f: replaceLast(base, 2, 'される') },
    'factitif-passif': { a: replaceLast(answerBase, 2, 'させられる'), f: replaceLast(base, 2, 'させられる') }
  };

  const getGodanConj = (wBaseAns, wBase, wType, mode) => {
    // aSound: eSound etc
    const eSoundMapA = {'う':'え', 'つ':'て', 'る':'れ', 'ぶ':'べ', 'む':'め', 'ぬ':'ね', 'く':'け', 'ぐ':'げ', 'す':'せ'};
    const aSoundMapA = {'う':'わ', 'つ':'た', 'る':'ら', 'ぶ':'ば', 'む':'ま', 'ぬ':'な', 'く':'か', 'ぐ':'が', 'す':'さ'};
    const lastA = wBaseAns.slice(-1);

    if (mode === 'potentiel') {
      const eS = eSoundMapA[wType === 'godan-iku' ? 'く' : lastA];
      return { a: replaceLast(wBaseAns, 1, eS + 'る'), f: replaceLast(wBase, 1, eS + 'る') };
    }
    
    const aS = wType === 'godan-iku' ? 'か' : aSoundMapA[lastA];
    
    if (mode === 'factitif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'せる'), f: replaceLast(wBase, 1, aS + 'せる') };
    }
    if (mode === 'passif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'れる'), f: replaceLast(wBase, 1, aS + 'れる') };
    }
    if (mode === 'factitif-passif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'せられる'), f: replaceLast(wBase, 1, aS + 'せられる') };
    }
  };

  if (type === 'ichidan') {
    return conjIchidan[mode];
  } else if (type === 'irregular-kuru') {
    return conjKuru[mode];
  } else if (type === 'irregular-suru') {
    return conjSuru[mode];
  } else {
    return getGodanConj(answerBase, base, type, mode);
  }
};

export const generateGrammarQuiz = (theme, count = 10) => {
  const quizItems = [];
  
  if (theme === 'te-form') {
    const pool = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    for (let i = 0; i < count; i++) {
      const word = randomItem(pool);
      const te = getTeForm(word);
      quizItems.push({
        id: `te-${i}`,
        instruction: "Donnez la forme en て du verbe suivant :",
        questionFull: word.base,
        expected: te.a, // Expected romaji/kana
        answerDisplay: te.f
      });
    }
  } else if (theme === 'adj-i' || theme === 'adj-na') {
    const pool = theme === 'adj-i' ? LEXICON.adjI : LEXICON.adjNa;
    const items = generateAdjectiveForms(pool, count);
    items.forEach((it, i) => {
      quizItems.push({
        id: `adj-${i}`,
        instruction: `Conjuguez l'adjectif à la forme demandée : ${it.label}`,
        questionFull: it.qTarget,
        expected: it.a,
        answerDisplay: it.aDisplay
      });
    });
  } else if (theme === 'neutral') {
    const poolVerb = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    const poolNounAdj = [...LEXICON.adjNa]; // For です -> だ
    
    for (let i = 0; i < count; i++) {
      const isVerb = Math.random() > 0.3; // 70% verbs
      const modes = ['masu', 'mashita', 'masen'];
      
      let conv;
      if (isVerb) {
        conv = getNeutralForm(randomItem(poolVerb), randomItem(modes));
      } else {
        conv = getNeutralForm(randomItem(poolNounAdj), 'desu');
      }
      
      quizItems.push({
        id: `neutral-${i}`,
        instruction: `Convertissez cette forme polie en style neutre :`,
        instructionLabel: conv.label,
        questionFull: conv.qTextF,
        expected: conv.aText,
        answerDisplay: conv.aTextF
      });
    }
  } else if (theme === 'conjugaisons') {
    const pool = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    const modes = ['potentiel', 'factitif', 'passif', 'factitif-passif'];
    
    for (let i = 0; i < count; i++) {
      const mode = randomItem(modes);
      const word = randomItem(pool);
      const conj = getVerbConjugations(word, mode);
      
      // capitalize first letter for display
      const capMode = mode.charAt(0).toUpperCase() + mode.slice(1);
      
      quizItems.push({
        id: `conj-${i}`,
        instruction: `Donnez la forme ${capMode} du verbe :`,
        questionFull: word.base,
        expected: conj.a,
        answerDisplay: conj.f
      });
    }
  }

  return quizItems;
};
