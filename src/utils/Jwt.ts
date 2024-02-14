import jwt, { SignOptions } from 'jsonwebtoken'

export class Jwt {
  private secretKey:string
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  generateToken(data: Record<string, any>, options?: SignOptions): string {
    return jwt.sign(data, this.secretKey, options);
  }
  validateToken(token: string): Record<string, any> | undefined {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Record<string, any>;
      return decoded;
    } catch (error) {
      return undefined
    }
  }
}