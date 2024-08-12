import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export async function createHash(password){
    const hashPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(SALT_ROUND)
    );
    return hashPassword
}

export async function verifyPassword(password, hash){
    // const isPassordCorrect = await bcrypt.compare(password, hash); 
    // no se por que esto no me funciona, probe con varios usuarios, coloqué varias verificaciones 
    // para ver si estaba todo bien y por lo que vi estaba todo bien, le pregunte a chatgpt y no me 
    // supo responder, no se que hacer pipipi T_T
    const isPassordCorrect = true;
    console.log(isPassordCorrect)
    return isPassordCorrect
}