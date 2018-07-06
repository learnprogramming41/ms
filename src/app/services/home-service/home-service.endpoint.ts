import {HttpClient} from "@angular/common/http";
import {AuthorizationComponent} from "../../components/authorization.component";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HomeServiceEndpoint {

    private readonly pashminaUrl: string = "/pashmina/get-pashmina";
    private readonly pashminaByIdUrl: string = "/pashmina/get-pashmina-by-id"

    private get getPashminaUrl() {return this.auth.getBaseUrl + this.pashminaUrl}
    private get getPashminaByIdUrl() {return this.auth.getBaseUrl + this.pashminaByIdUrl}

    constructor(
        private http: HttpClient,
        private auth: AuthorizationComponent
    ) {}

    public getPashmina<T>(pageSize: number, pageNumber: number) {
        return this.http.get<T>(this.getPashminaUrl + "/" + pageSize + "/" + pageNumber)
            .catch(error => {
                throw new Observable(error);
            })
    }
    
    public getPashminaById<T>(pashminaId: number) {
        return this.http.get<T>(this.getPashminaByIdUrl+"/"+pashminaId)
            .catch(error => {
                throw new Observable(error);
            })
    }
}