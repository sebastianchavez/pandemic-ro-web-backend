export interface IRequestS3 {
    nameImage: string;
    image: string;
    appId: 'italk';
    category: 'image' | 'video';
    path?: string;
}

export interface IRequestDeleteObjectS3 {
    appId: 'italk';
    nameImage: string;
    path: string;
}

export interface IRequestFileS3 {
    appId: 'pandemic-ro';
    name: string;
    file: string;
    path: string;
}