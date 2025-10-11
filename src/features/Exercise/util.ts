export const splitPromptGaps = (prompt: string, blankField: string) => {
  return prompt.split(blankField);
};

export const getLongestOptionLength = (options: string[]) => {
  return Math.max(0, ...options.map((option) => (option ? option.length : 0)));
};

export const calculateBlankFieldWidth = (widthCh: number) => {
  return `calc(${widthCh}ch + 2.5rem)`;
};
