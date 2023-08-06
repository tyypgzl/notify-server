import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export namespace JWTUtils {
  export const signAccessToken = (userId: string) => {
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const payload = {
      iss: 'tguzel.dev',
      aud: userId,
    };
    const options: SignOptions = {
      expiresIn: '7d',
    };

    return jwt.sign(payload, accessTokenSecretKey, options);
  };

  export const verifyAccessToken = (token: string): JwtPayload => {
    const signingKey = process.env.ACCESS_TOKEN_SECRET;
    return jwt.verify(token, signingKey) as JwtPayload;
  };
}
