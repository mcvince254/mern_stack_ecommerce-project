
import bcryptjs from 'bcryptjs'
//import { CountryCodes } from 'validator/lib/isISO31661Alpha2';

export const hashPassword = async function(passwordortoken){    // for hashing password ro token before installing crypto for token
  const hashedPassword = await bcryptjs.hash(passwordortoken, 10);
  
  return hashedPassword
}


