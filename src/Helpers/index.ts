/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number) {
  const minNum = min - 1;
  return Math.ceil(Math.random() * (max - minNum) + minNum);
}
export function generateToken(length: number) {
  const token: string = Array(length)
    .fill(0)
    .map((_) => String.fromCharCode(getRandomArbitrary(97, 122)))
    .join("");
  return token;
}
