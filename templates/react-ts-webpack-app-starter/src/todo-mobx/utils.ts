export function uuid(): string {
  let i;
  let random;
  let uuidV = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuidV += '-';
    }
    uuidV += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuidV;
}

export function pluralize(count: number, word: string): string {
  return count === 1 ? word : word + 's';
}
