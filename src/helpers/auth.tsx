import { hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPass = await hash(password, 12);
  return hashedPass;
}
