import { Router, NavigationStart } from '@angular/router';
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Alert, AlertType } from "../_models/alert";
import { timestamp } from 'rxjs/operator/timestamp';

@Injectable()
export class AlertService {

    private subject = new Subject<Alert>();
    alerts: Alert[] = [];
    private keepAfterRouteChange = true;
    constructor(private router: Router) {
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

    getAlerts() {
        return this.alerts;
    }

    success(message: string, timeout: number, sticky: boolean, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, timeout, sticky, keepAfterRouteChange);
    }
    error(message: string, timeout: number, sticky: boolean, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, timeout, sticky, keepAfterRouteChange);
    }

    info(message: string, timeout: number, sticky: boolean, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, timeout, sticky, keepAfterRouteChange);
    }

    warn(message: string, timeout: number, sticky: boolean, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, timeout, sticky, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, timeout: number, sticky: boolean, keepAfterRouteChange = true) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        
        let time = new Date();
                    console.log(this.alerts);
            this.alerts.sort(function (a, b) {
                return a.timeCreated - b.timeCreated;
            });
            console.log(this.alerts);
        if (this.alerts.length > 2) {

            //find and remove oldest alert
            var oldestAlertDate: number = time.getTime();
            var oldestAlert: any = null;
            for (var alert of this.alerts) {
                if (alert.timeCreated < oldestAlertDate && !alert.sticky) {
                    oldestAlert = alert;
                    oldestAlertDate = alert.timeCreated;
                }
            }
            if (oldestAlert && !oldestAlert.sticky) {
                this.removeAlert(oldestAlert);
                //Then push new one
                this.subject.next(<Alert>{ type: type, message: message });
                this.alerts.push({ type: type, message: message, timeout: timeout, timeCreated: time.getTime(), sticky: sticky });

            }

        }
        else {
            this.subject.next(<Alert>{ type: type, message: message });
            this.alerts.push({ type: type, message: message, timeout: timeout, timeCreated: time.getTime(), sticky: sticky });
        }

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
