import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotificationService } from "../../_services/notification.service";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../_services/auth.service";
import { Alert, AlertType } from "../../_models/Alert";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit, OnDestroy {
  private display: boolean;
  private alive: boolean;
  private interval: number;
  private counter: number = 1;
  sub: Subscription;
  alerts: Alert[];
  constructor(private notificationService: NotificationService, private auth:AuthService) {
    this.display = false;
    this.alive = true;
    this.interval = 20000;
  }
  ngOnInit() {
    this.alerts = this.notificationService.notifications || [];
    //this.startTimer();
  }
  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }
  private startTimer() {
    let timer = Observable.timer(1, this.interval);
    this.sub = timer.subscribe(t => {
      //this.notificationService.addNotifications('number: ' + this.counter++);
      console.log('timer: '+ this.notificationService.notifications);
      this.alerts = this.notificationService.notifications || [];
    });
  }
 
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
 /*
  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
     switch (alert.type) {
      case AlertType.Success:
        return "alert alert-success";
      case AlertType.Error:
        return "alert alert-danger";
      case AlertType.Info:
        return "alert alert-info";
      case AlertType.Warning:
        return "alert alert-warning";
    }
  } */
}
