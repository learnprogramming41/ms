import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthorizationComponent} from "../../components/authorization.component";
import {PashminaModel} from "../../model/pashmina.model";
import {Observable} from "rxjs/Observable";

@Injectable()

export class PashminaServiceEndpoint {

    private readonly addPashminaUrl: string = "/admin-api/add-pashmina";
    private readonly allPashminaUrl: string = "/admin-api/get-all-pashmina";
    private readonly pashminaCountUrl: string = "/admin-api/get-pashmina-count";

    constructor(private http: HttpClient, private auth: AuthorizationComponent) {

    }

    private get getAddPashminaUrl() {return this.auth.getBaseUrl + this.addPashminaUrl}
    private get getAllPashminaUrl() {return this.auth.getBaseUrl + this.allPashminaUrl}
    private get getPashminaCountUrl() {return this.auth.getBaseUrl + this.pashminaCountUrl }

    public addPashmina<T>(pashmina: PashminaModel) {
        return this.http.post<T>(this.getAddPashminaUrl, pashmina, {
            params: {
                access_token: JSON.parse(localStorage.getItem("token"))["value"]
            }
        })
            .catch(error => {
                throw new Observable(error);
            })
    }

    public getAllPashmin<T>(pageSize: number, pageNumber: number) {
        return this.http.get<T>(this.getAllPashminaUrl+"/"+pageSize+"/"+pageNumber, {
            params: {
                access_token: JSON.parse(localStorage.getItem("token"))["value"]
            }
        })
            .catch(error => {
                throw new Observable(error)
            })
    }
    
    public getAllPashminaCount<T>() {
        return this.http.get<T>(this.getPashminaCountUrl, {
            params: {
                access_token: JSON.parse(localStorage.getItem("token"))["value"]
            }    
        }).catch(error => {
            throw new Observable(error)
        })
    }

}

