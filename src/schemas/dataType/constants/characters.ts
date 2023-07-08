const allCharacters = "abcdefghijklmnopqrstuvwxyz";

export const LOWER_CHARACTERS = allCharacters.split("");
export const UPPER_CHARACTERS = allCharacters
  .split("")
  .map((el) => el.toUpperCase());
export const MIXED_CHARACTERS = [...LOWER_CHARACTERS, ...UPPER_CHARACTERS];
