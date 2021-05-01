/**
 * Generate an unique 6 character number/letter id
 */
export function GenerateID(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * return now date
 */
export function Now(): Date {
  return new Date();
}
