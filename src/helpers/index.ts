import { createHash } from 'crypto';

export const shortenURL = (url: string) => {
  // Append a timestamp to the input URL
  const timestamp = new Date().getTime().toString();
  const uniqueInput = url + timestamp;

  // Create a SHA-256 hash of the unique input
  const hash = createHash('sha256').update(uniqueInput).digest('hex');

  // Use the first 8 characters of the hash as the short code
  return hash.substring(0, 8);
};