import { Component } from "@angular/core";
import { AuthService } from "../../_services/auth.service";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "nav-menu",
  templateUrl: "./navmenu.component.html",
  styleUrls: ["./navmenu.component.css"]
})
export class NavMenuComponent {
  public picLogoUrl = require("../../assets/images/pic_logo_small.png");
  public parLogoUrl = require("../../assets/images/par_logo_small.png");
  filteredStatus = "";
  public auth: AuthService;
  constructor( private _auth: AuthService,private titlecasePipe: TitleCasePipe) {
    this.auth = this._auth;
  }
  transformName(name: string): string {
    return this.titlecasePipe.transform(name);
  }
}
