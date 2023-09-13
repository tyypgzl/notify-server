import bcrypt from 'bcrypt';

export async function hash(data: string | Buffer): Promise<string> {
  const saltRound = 10;

  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = bcrypt.hash(data, salt);
  return hashedPassword;
}

export async function compare(data: string | Buffer, encrypted: string): Promise<boolean> {
  const value = await bcrypt.compare(data, encrypted);

  return value;
}
