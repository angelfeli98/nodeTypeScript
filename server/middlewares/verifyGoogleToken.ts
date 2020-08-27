
import { OAuth2Client } from 'google-auth-library';
import { Request, Response, NextFunction } from 'express';

const verifyGoogleToken = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const idToken = req.get('g-token');
    const google = process.env.CLIENT_ID || '';

    if(!!!idToken)
        return res.status(403).json({ok: false, error:{message: 'Token not provided'}});

    const client = new OAuth2Client(google);
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: google
        })
        const data = ticket.getPayload();
        req.body.name = data?.name;
        req.body.email = data?.email;
        req.body.img = data?.picture;
        req.body.id = data?.sub;
        next();
    }catch(error){
        return res.status(403).json({ok: false, error:{message: 'Corrupt token'}});
    }
}

export{
    verifyGoogleToken
}