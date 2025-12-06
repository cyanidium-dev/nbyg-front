export interface EmailData {
    source: string; //which form was used to submit the form
    name?: string;
    phone?: string;
    email: string;
    address?: string;
    message?: string;
}
