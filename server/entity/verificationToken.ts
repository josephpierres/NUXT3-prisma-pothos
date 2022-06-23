export class VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
  
    constructor( identifier: string,
                token: string,
                expires: Date ) {
      this.identifier = identifier;
      this.token = token;
      this.expires = expires;
    }
  }