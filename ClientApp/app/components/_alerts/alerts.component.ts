import { Component, OnInit } from "@angular/core";
import { Alert, AlertType } from "../../_models/alert";
import { AlertService } from "../../_services/alert.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.css"]
})
export class AlertsComponent implements OnInit {
  alerts: Alert[];
  interval: number = 1000;
  sub: Subscription;
  constructor(private alertService: AlertService) {
    console.log('AlertsComponent-constructor');
    this.alerts = this.alertService.getAlerts();
  }
  ngOnInit() {
    console.log('AlertsComponent-ngOnInit');
    this.alertService.getAlert().subscribe((alert: Alert) => {
      this.alerts = this.alertService.getAlerts();
    });
    this.startTimer();
  }
  private startTimer() {
    let timer = Observable.timer(1, this.interval);
    this.sub = timer.subscribe(t => {
      for (var alert of this.alerts) {
        let now = new Date();
        let timeNow = now.getTime();
        let delta = timeNow - alert.timeCreated;
        //console.log("Now: {0}", timeNow);
        //console.log("Created: {0}", alert.timeCreated);
        //console.log("delta: {0}  timeout: {1}", delta, alert.timeout);
        if (alert.timeout > 0) {
          if (delta > alert.timeout) {
            this.removeAlert(alert);
          }
        }
      }
    });
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
    this.alertService.removeAlert(alert);
  }

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
  }
}
