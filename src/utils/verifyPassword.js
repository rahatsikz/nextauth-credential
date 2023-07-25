import bcrypt from "bcrypt";

export async function verifyPassword(password, hashed) {
  // Replace this with your own logic to fetch user's hashed password from the database
  // console.log(password);
  // console.log(hashed);
  return await bcrypt.compare(password, hashed);
}
