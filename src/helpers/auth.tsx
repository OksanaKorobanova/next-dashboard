// import bcryptjs from 'bcryptjs';

// export async function hashPassword(password: string) {
//   const hashedPass = await bcryptjs.hash(password, 12);
//   return hashedPass;
// }

export async function verifyPassword(password: string, hashedPassword: string) {
  // const isValid = await bcryptjs.compare(password, hashedPassword);
  const isValid = password === hashedPassword;
  return isValid;
}
