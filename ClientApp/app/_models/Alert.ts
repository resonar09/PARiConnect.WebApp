export class Alert {
    type: AlertType;
    message: string;
    timeout: number;
    timeCreated: number;
    sticky: boolean;


}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}