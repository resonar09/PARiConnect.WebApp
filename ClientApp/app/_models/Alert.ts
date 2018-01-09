export class Alert {
    type: AlertType;
    message: string;
    timeout: number;
    timeCreated: number;


}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}