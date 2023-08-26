export function concatStringFromTo(
  string,
  maxLentgth,
  from0To_NUMBER_,
  isDotDotDot,
  isEnd
) {
  if (string.length > maxLentgth) {
    const stringBegin = string.slice(0, from0To_NUMBER_);
    const dotDotDot = "...";
    const stringEnd = string.slice(string.length - 3, string.length);
    if (!isDotDotDot && !isEnd) {
      return stringBegin;
    } else if (isDotDotDot && !isEnd) {
      return stringBegin + dotDotDot;
    } else if (isDotDotDot && isEnd) {
      return stringBegin + dotDotDot + stringEnd;
    } else {
      return string;
    }
  } else {
    return string;
  }
}
