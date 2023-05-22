import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicos, Pagination } from '../models/servicos';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private apiUrl = environment.BACKEND_HOST; //URL da API
  constructor(private http: HttpClient) {
    //console.log("construtor do service");
   }

  getServicos(page: number, limit: number): Observable<{servicos:Servicos[], pagination: Pagination}> {
    const params = new HttpParams().set('page',String(page)).set('limit',String(limit));
    console.log("params do SERVICE de Servicos: ",params);

    console.log("Dentro do getServicos", `${this.apiUrl}/servicos`);
    console.log(this.http.get<{servicos:Servicos[], pagination: Pagination}>(`${this.apiUrl}/servicos`));
    return this.http.get<{servicos:Servicos[], pagination: Pagination}>(`${this.apiUrl}/servicos`, {params});    
  }

}
