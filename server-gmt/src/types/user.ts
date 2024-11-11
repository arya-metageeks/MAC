export type TUser = {
    _id: string;
    firstName: string;
    lastName: string;
    gameId: string;
    email: string;
    isEmailVerified: boolean;
    password: string;
    avatar: string;
    domainName: string;
    twitterUsername: string;
    discordUsername: string;
    metamaskAddress: string;
    createdAt?: Date;
    updatedAt?: Date;
    isModified: ( path: string ) => boolean;
    comparePassword: ( password: string ) => boolean;
    boughtKols?: string[];
    kolsCart?: string[];
    
}

export type TAdmin = {
    _id?: string;
    userName: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    isModified: ( path: string ) => boolean;
    comparePassword: (password:string)=> boolean;
}

