export class Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;   
  authorId:  string;
  
    constructor(id: number,
                createdAt: Date,
                updatedAt: Date,
                published: boolean,
                title: string, 
                authorId:  string) {
      this.id = id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.published = published;
      this.title = title;
      this.authorId = authorId;
    }
  }