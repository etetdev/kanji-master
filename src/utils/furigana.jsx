import React from 'react';

/**
 * Parses a marked up string and returns an array of React fragments with <ruby> tags.
 * Format for input: "漢字[かんじ]を読[よ]む"
 * Characters before brackets are the text/kanji. Characters inside brackets are the furigana.
 */
export function FuriganaText({ text, className = "" }) {
  if (!text) return null;

  // Regex to match "Kanji[furigana]"
  // Example: 飲[の]む
  const regex = /([^\[\]]+)\[([^\[\]]+)\]/g;
  let result = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const kanjiStr = match[1];
    const furigana = match[2];
    
    // Check if there was regular text before this ruby
    if (match.index > lastIndex) {
      result.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    }
    
    result.push(
      <ruby key={`ruby-${match.index}`} className="mx-0.5">
        {kanjiStr}
        <rp>(</rp>
        <rt className="text-[0.6em] text-[var(--color-text-tertiary)] -mt-1 Select-none">{furigana}</rt>
        <rp>)</rp>
      </ruby>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(<span key={`text-end`}>{text.substring(lastIndex)}</span>);
  }

  return <span className={className}>{result.length > 0 ? result : text}</span>;
}
