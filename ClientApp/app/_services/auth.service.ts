import { Inject, Injectable, PLATFORM_ID, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Router } from "@angular/router";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthService {
  base: string;
  isBrowser: boolean;
  isAuth: boolean = false;
  TOKEN_KEY = "token";
  FULLNAME_KEY = "fullname";
  CONTACTID_KEY = "contactid";
  ORGUSERMAPPING_KEY = "orgusermappingkey";
  constructor(
    private http: Http,
    @Inject("BASE_URL") baseUrl: string,
    private router: Router
  ) {
    this.base = baseUrl;
  }

  get username() {
    if (localStorage.getItem(this.FULLNAME_KEY))
      return localStorage.getItem(this.FULLNAME_KEY);
  }

  get fullname() {
    if (localStorage.getItem(this.FULLNAME_KEY))
      return localStorage.getItem(this.FULLNAME_KEY);
  }
  get contactId() {
    if (localStorage.getItem(this.CONTACTID_KEY))
      return localStorage.getItem(this.CONTACTID_KEY);
  }
  get orgUserMappingKey() {
    if (this.isLocalStorageUp())
      if (localStorage.getItem(this.ORGUSERMAPPING_KEY))
        return localStorage.getItem(this.ORGUSERMAPPING_KEY);
  }
  get isAuthenticated() {
    //let browserStorage = (typeof localStorage === 'undefined') ? null : localStorage;
    if (this.isLocalStorageUp()) {
      return localStorage.getItem(this.TOKEN_KEY) ? true : false;
    }
    return false;
  }
  get tokenHeader() {
    var header = new Headers({
      Authorization: "Bearer " + localStorage.getItem(this.TOKEN_KEY)
    });
    return new RequestOptions({ headers: header });
  }

  isLocalStorageUp() {
    return typeof localStorage !== "undefined" && localStorage ? true : false;
  }

  logout() {
    if (window.localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.FULLNAME_KEY);
      this.isAuth = false;
      this.router.navigate(["/login"]);
    }
  }
  login(user: any) {
    return this.http.post(this.base + "auth/login", user, this.requestOptions())
      .map((response: Response) => {
        if (response) {
          this.authenticate(response);
        }
      }).catch(this.handleError);
  }
  /*   login(user: any) {
      this.http
        .post(this.base + "auth/login", user, this.requestOptions())
        .subscribe(
          res => {
            this.authenticate(res);
          },
          error => {
            console.log(error);
            this.handleError(error);
          }
        );
    } */

  register(user: any) {
    this.http
      .post(this.base + "auth/register", user, this.requestOptions())
      .subscribe(res => {
        this.authenticate(res);
      });
  }
  authenticate(res: any) {
    var authResponse = res.json();
    if (!authResponse.token) return;
    if (window.localStorage) {
      this.isAuth = true;
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.FULLNAME_KEY, authResponse.fullName);
      localStorage.setItem(this.CONTACTID_KEY, authResponse.contactId);
      localStorage.setItem(this.ORGUSERMAPPING_KEY, authResponse.orgUserMappingKey);
    }
    this.router.navigate(["/"]);
  }
  private requestOptions() {
    const headers = new Headers({ "Content-type": "application/json" });
    return new RequestOptions({ headers: headers });
  }
  private handleError(error: any) {
    const applicationError = error.headers.get("Application-Error");
    if (applicationError) {

      return Observable.throw(applicationError);
    }
    let modelStateErrors = "";
    let serverError = "Server error";
    console.log(error);
    if(error.status == 401)
      serverError = "Email or Password are invalid."
    if(error.status == 500){
      serverError = "Internal Server Error.";
      return Observable.throw(serverError);
    }
    if (error._body) {
      const serverError = error.json();
      if (serverError) {
        for (const key in serverError) {
          if (serverError[key]) {
            modelStateErrors += serverError[key] + "\n";
          }
        }
      }
    }
    return Observable.throw(modelStateErrors || serverError);
  }
}
