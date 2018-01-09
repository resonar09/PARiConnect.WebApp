import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
//import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [
    `
    .border-red{border: solid 1px red}
    .border-blue{border: solid 1px blue}
    .error { color: red; }
    .form-control.ng-invalid.ng-touched{
      border-color: #ff2118;
      outline: 0;
      outline-color: initial;
      outline-style: initial;
      outline-width: 0px;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69,.25);
    }
    `
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() dataObject:any;
  @Input() submitFunction:Function;

  form: FormGroup;
  objectProps:any;
  objectControls:any;
  objectButtons:any;
  objectKeys = Object.keys;
  title: string = "";
  //branding: any;
  logo:any;
  brandingURL: any;
  background: string = "";
  subtitle: string = "";
  debug: boolean = false;
  layout: string = "";
  row: string = '';
  col: string = '';
  
  constructor(private auth:AuthService, private alertService :AlertService) {
  }
  ngOnInit() {
    // remap the API to be suitable for iterating over it
    this.objectProps =
      Object.keys(this.dataObject)
        .map(prop => {
          return Object.assign({}, { key: prop }, this.dataObject[prop]);
        });
    this.objectControls = Object.keys(this.dataObject.controls)
      .map(prop => {
        return Object.assign({}, { key: prop }, this.dataObject.controls[prop]);
      });
      this.objectButtons = Object.keys(this.dataObject.buttons)
      .map(prop => {
        return Object.assign({}, { key: prop }, this.dataObject.buttons[prop]);
      });
    // setup the form
    const formGroup:any = {};
    // setup of general settings
    this.title = this.dataObject['settings'].title;
    this.debug = this.dataObject['settings'].debug;
    this.subtitle = this.dataObject['settings'].subtitle;
    this.layout = this.dataObject['settings'].layout;
    this.background = this.dataObject['settings'].background;

    this.logo = this.dataObject['settings'].logo;
    //this.brandingURL = require(this.branding);
    //console.log(this.branding);
    //this.submit = this.dataObject['settings'].submit;


    // setup of layouts
    if (this.layout === 'inline') {
      this.row = 'row';
      this.col = 'mx-4';
    } else if (this.layout === 'two-column') {
      this.row = 'row';
      this.col = 'col-6';

    } else if (this.layout === 'stacked') {
      this.row = 'row';
      this.col = 'col-12';

    } else if (this.layout === 'responsive') {
      this.row = 'row';
      this.col = 'col-sm-12 col-md-6 col-lg-3';
    } else {
      this.row = 'row';
      this.col = 'col';
    }
    //create reactive form controls
    for (let prop of Object.keys(this.dataObject.controls)) {
      formGroup[prop] = new FormControl({ value: this.dataObject.controls[prop].value || '', disabled: this.dataObject.controls[prop].readOnly || false }, this.mapValidators(this.dataObject.controls[prop].validation));
    }
    this.form = new FormGroup(formGroup);
  }
  // setup for validation
  private mapValidators(validators:any) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        } else if (validation === 'max') {
          formValidators.push(Validators.max(validators[validation]));
        } else if (validation === 'pattern') {
          formValidators.push(Validators.pattern(validators[validation]));
        } else if (validation === 'customs') {
          for (const custom of Object.keys(validators.customs)) {
            formValidators.push(validators.customs[custom].function);
          }
        }
      }
    }
    return formValidators;
  }
  getErrorMessage(key:string, prop:any) {
    if (key === 'required') {
      return prop.label + " is required.";
    } else if (key === 'min') {
      return prop.label + " must be greater than " + prop.validation.min;
    } else if (key === 'max') {
      return prop.label + " must be less than " + prop.validation.max;
    } else if (key === 'pattern') {
      return "You must enter a proper " + prop.label;
    } else {
      return prop.validation.customs[key].message;
    }
  }
  onSubmit(form:any) {
    //console.log('onSubmit')
    //this.alertService.success("Form Submitted", 0);
    this.submitFunction(form);
  }
  onReset(form:any) {
    //console.log(form);
  }
  onCancel(form:any) {
    //console.log(form);
  }
}



