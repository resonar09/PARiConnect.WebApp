import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { AuthService } from "./auth.service";

@Injectable()
export class ClientAssessmentService {
    base:string;
    id:string;
    constructor(private http: Http, private auth: AuthService, @Inject('BASE_URL') baseUrl: string) {
        this.base = baseUrl;
        this.id = auth.orgUserMappingKey || '';
    }
    getClientAssessments() {
        
        return this.http.get(this.base + 'api/assessmentdata/GetAssessmentReviews/' + this.id, this.auth.tokenHeader).map(res => res.json());
    }
}