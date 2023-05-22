import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes, Pagination } from '../models/clientes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.BACKEND_HOST; //URL da API
  constructor(private http: HttpClient) {
    //console.log("construtor do service");
   }

  getClientes(page: number, limit: number): Observable<{clientes: Clientes[], pagination: Pagination}> {
    const params = new HttpParams().set('page',String(page)).set('limit',String(limit));
    console.log("Dentro do getClientes");
    console.log("Params: ", {params});
    return this.http.get<{clientes: Clientes[], pagination: Pagination}>(`${this.apiUrl}/clientes`, {params});    
  }

  getClientesTotal(): Observable<{clientes: Clientes[], pagination: Pagination}> {
    //const params = new HttpParams().set('page',String(page)).set('limit',String(limit));
    //console.log("Dentro do getClientes");
    //console.log("Params: ", {params});
    return this.http.get<{clientes: Clientes[], pagination: Pagination}>(`${this.apiUrl}/clientes`);    
  }
}
