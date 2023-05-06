export interface IRequestSendEmail {
    sendTo:string;
    subjectEmail: string
    template: string
    code?: string;
    from: 'no-responder@pandemic-ro.com'
}