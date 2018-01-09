import { Injectable } from "@angular/core";
import { Alert } from "../_models/Alert";

@Injectable()
export class NotificationService {
  alerts: Alert[] = [
    {
      type: 1,
      message:
        "Your inventory is low!",
        timeout: 10000,
        timeCreated: 0
    }
  ];
  constructor() {}

  get notifications() {
    if (this.alerts)
      return this.alerts;
  }
  addNotification(message:string){
      this.alerts.push({
        type: 2,
        message: message
        ,timeout: 20000,
        timeCreated: 0
      });
      //console.log(this.alerts);
  }
  removeNotification(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
}
