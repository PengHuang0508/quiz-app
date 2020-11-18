export const decodeString = (stringToDecode: string) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${stringToDecode}`,
    'text/html'
  ).body.textContent;

  return decodedString;
};

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
