/**
 * 转义数字前的$符号（避免与公式混淆）
 */
export function escapeDollarNumber(text: string): string {
  let escapedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1] || " ";

    escapedText += (char === "$" && nextChar >= "0" && nextChar <= "9")
      ? "\\$"
      : char;
  }

  return escapedText;
}

/**
 * 处理公式括号转义（转换为$符号包裹）
 */
export function escapeBrackets(text: string): string {
  const pattern = /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;

  return text.replace(
    pattern,
    (match, codeBlock, squareBracket, roundBracket) => {
      if (codeBlock) return codeBlock;
      if (squareBracket) return `$$${squareBracket}$$`;
      if (roundBracket) return `$${roundBracket}$`;
      return match;
    }
  );
}
