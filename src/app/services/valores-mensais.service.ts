import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination, ValoresMensais } from '../models/valores-mensais';


@Injectable({
  providedIn: 'root'
})

export class ValoresMensaisService {

  private apiUrl = environment.BACKEND_HOST; //URL da API
  constructor(private http:HttpClient) {
    //console.log("construtor do Service dos Valores Mensais");
  }


  getValoresMensaisInfraestrutura( params: any ): Observable<{valoresmensaisinfraestrutura:ValoresMensais[], pagination: Pagination}> {
  /*  
    let params = new HttpParams().set('page',String(page)).set('limit',String(limit));
  
  // Filtros da busca
  if (filters) {
    if (filters.dtCompetenciaMin) {
      params = params.set('dtCompetenciaMin', filters.dtCompetenciaMin);
    }
    if (filters.dtCompetenciaMax) {
      params = params.set('dtCompetenciaMax', filters.dtCompetenciaMax);
    }
    if (filters.dtcarga) {
      params = params.set('dtcarga', filters.dtcarga);
    }
    if (filters.qtdServico) {
      params = params.set('qtdServico', String(filters.qtdServico));
    }
    if (filters.nrCliente) {
      params = params.set('nrCliente', String(filters.nrCliente));
    }
  }*/
    //console.log("Dentro do getValoresMensaisInfraestrutura",`${this.apiUrl}/valoresmensaisinfraestrutura`);
    //console.log(this.http.get<{valoresmensaisinfraestrutura:ValoresMensais[], pagination: Pagination}>(`${this.apiUrl}/valoresmensaisinfraestrutura`));
    let httpParams = new HttpParams();
//    console.log("Params: ",params);
    if (params) {
      if (params.page) {
        httpParams = httpParams.set('page', params.page);
      }
      if (params.limit) {
        httpParams = httpParams.set('limit', params.limit);
      }
      /*
      if (params.dtCompetenciaMin && params.dtCompetenciaMin !== undefined ) {
        httpParams = httpParams.set('dtCompetenciaMin', params.dtCompetenciaMin);
      }
      if (params.dtCompetenciaMax && params.dtCompetenciaMax  !== undefined ) {
        httpParams = httpParams.set('dtCompetenciaMax', params.dtCompetenciaMax);
      }
      if (params.dtcarga && params.dtcarga!== undefined) {
        httpParams = httpParams.set('dtcarga', params.dtcarga);
      }
      if (params.qtdServico && params.qtdServico !== undefined ) {
        httpParams = httpParams.set('qtdServico', params.qtdServico);
      } */
      if (params.nrCliente && params.nrCliente !== undefined ) {
//        console.log("PARAMS->if nrCliente:", params);
        httpParams = httpParams.set('nrCliente', params.nrCliente);
//        console.log("httpParams: ",httpParams);
      }
      
    }
//    console.log("PARAMS pós if:", params);
//    console.log("httpParams: ",httpParams);
        
//    console.log(this.http.get<{valoresmensaisinfraestrutura:ValoresMensais[], pagination: Pagination}>(`${this.apiUrl}/valoresmensaisinfraestrutura`, { params }));
    return this.http.get<{valoresmensaisinfraestrutura:ValoresMensais[], pagination: Pagination}>(`${this.apiUrl}/valoresmensaisinfraestrutura`, { params });
  }
}
