export const addLeadingZero = (value: number): string => {
  return value.toString().padStart(2, "0");
};

export const randomRotation = (index: number) => {
  return `${Math.floor(Math.random() * 7) * (index % 2 === 0 ? -1 : 1)}deg`;
};

export const isFirstLetterVowel = (str: string) => /^[aeiouàâéèê]/i.test(str);
