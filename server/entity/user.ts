import { node } from "./node";

export class User extends node {
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  role: string; 
  
    constructor(id: string,
                name: string,            
                email: string,
                emailVerified: Date,
                image: string,
                role: string  ) {
      super(id);
      this.name = name;
      this.email = email;
      this.emailVerified = emailVerified;
      this.image = image;
      this.role = role;
    }
  }