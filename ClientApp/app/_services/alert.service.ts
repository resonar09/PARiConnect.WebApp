import { Router, NavigationStart } from '@angular/router';
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Alert, AlertType } from "../_models/alert";
import { timestamp } from 'rxjs/operator/timestamp';

@Injectable()
export class AlertService {

  private subject = new Subject<Alert>();
  alerts:Alert[] = [];
  private keepAfterRouteChange = true;
  constructor(private router:Router) {
    console.log("alert-service-constr");
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart');
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = true;
          } else {
              // clear alert messages
              //this.clear();
          }
      }
  });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  getAlerts(){
    return this.alerts;
  }

  success(message: string, timeout: number, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, timeout, keepAfterRouteChange);
  }
  error(message: string, timeout: number, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, timeout, keepAfterRouteChange);
  }

  info(message: string, timeout: number, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, timeout, keepAfterRouteChange);
  }

  warn(message: string, timeout: number, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, timeout, keepAfterRouteChange);
  }

  alert(type: AlertType, message: string, timeout: number, keepAfterRouteChange = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message });
    let time = new Date();
    this.alerts.push({ type: type, message: message, timeout: timeout, timeCreated: time.getTime()})
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
  clear() {
    // clear alerts
    this.subject.next();
    this.alerts = [];
  }
}
