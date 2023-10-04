import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const hashedPass = await bcrypt.hash(password, 12);
  return hashedPass;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
