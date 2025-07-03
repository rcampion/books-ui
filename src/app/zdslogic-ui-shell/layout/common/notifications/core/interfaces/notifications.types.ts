export interface Notification
{
    id: string;
    userId: number;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    dateSent: string;
    link?: string;
    useRouter?: boolean;
    readFlag: boolean;
}
