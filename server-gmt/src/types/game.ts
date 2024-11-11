import { Document } from 'mongoose';

type SocialMedia = {
    platform: string;
    link: string;
}

type config = {
    os: string,
    processor: string,
    graphics: string,
    memory: string,
    storage: string
}

export type TGame = Document & {
    title: string;
    uuid: string;
    platform: string[];
    recommendedAge: number;
    developer: string;
    publisher: string;
    releaseDate: Date;
    socialMedia: SocialMedia[];
    overView: string;
    banner: string;
    previewImages: string[];
    tags?: string[];
    isDeleted: Boolean;
    category: string;
    recommendedConfiguration: config;
    minimumConfiguration: config
}