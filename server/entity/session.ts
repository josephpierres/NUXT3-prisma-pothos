import { node } from "./node";

export class Session extends node {
  sessionToken: string;
  userId: string;
  expires: Date;
  
    constructor( id: string,
                sessionToken: string,
                userId: string,
                expires: Date
    ) {
      super(id);
      this.sessionToken = sessionToken;
      this.userId = userId;
      this.expires = expires;
    }
  }