import { Document } from "mongoose";


export interface SocialMediaCount {
  platform: 'instagram' | 'telegram' | 'youtube';
  followers: number;
}


export type Tprofile = Document & {
   name: string;
  title?: string;
  uuid: string;
  price: string;
  category: string;
  tags: string[];
  socialMedia: SocialMediaCount[];
  description: string;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
}

