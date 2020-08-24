
import jsonwebtoken from 'jsonwebtoken';

const signToken = (id: string): string => {
    const seed = process.env.SEED || 'test';
    const time = process.env.TIME;
    return jsonwebtoken.sign({id}, seed, { expiresIn: time })
}

export{
    signToken
}