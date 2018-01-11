import { Component, OnInit, Input } from "@angular/core";
import { Http } from "@angular/http/http";

import { ClientAssessmentService } from "../../_services/client.assessment.service";
import { formArrayNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-assessment-table",
  templateUrl: "./assessment-table.component.html",
  styleUrls: ["./assessment-table.component.css"]
})
export class AssessmentTableComponent implements OnInit {
  @Input() isCompleted: string;

  clientAssessments: any[];
  filteredStatus = "";
  isDesc: boolean = false;
  column: string = "CategoryName";
  direction: number;
  isLoading: boolean = true;
  constructor(
    private clientAssessmentService: ClientAssessmentService
    ,private alertService: AlertService
  ) {}

  ngOnInit() {
    this.clientAssessmentService
      .getClientAssessments()
      .subscribe(clientAssessments => {
        this.clientAssessments = clientAssessments;
        this.isLoading = false;
      });
  }
  getAssessmentReviewsByStatus() {
    const isCompleted = (this.isCompleted == "true") ? true : false;
    var filtered = [];
    if (this.clientAssessments) {
      var filtered = this.clientAssessments.filter(function(assessment) {
          return assessment.completed == isCompleted;  
      });
    }
    return filtered;
  }
  getAssessmentReview(clientAssessment:any){
    console.log(clientAssessment);
    this.alertService.info(clientAssessment.assessment, 5000, false);
  }

  sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
