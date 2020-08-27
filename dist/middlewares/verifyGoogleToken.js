"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const verifyGoogleToken = async (req, res, next) => {
    const idToken = req.get('g-token');
    const google = process.env.CLIENT_ID || '';
    if (!!!idToken)
        return res.status(403).json({ ok: false, error: { message: 'Token not provided' } });
    const client = new google_auth_library_1.OAuth2Client(google);
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: google
        });
        const data = ticket.getPayload();
        req.body.name = data?.name;
        req.body.email = data?.email;
        req.body.img = data?.picture;
        req.body.id = data?.sub;
        next();
    }
    catch (error) {
        return res.status(403).json({ ok: false, error: { message: 'Corrupt token' } });
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
