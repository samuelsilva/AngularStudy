import { Component } from '@angular/core';
import { Servicos, Pagination } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {

  servicos: Servicos[] = [];
  pagination: Pagination | null = null;
  pageSizeOptions: number[] = [5, 10, 20]; // Opções de quantidade de itens por página
  pageSize: number = 5; // Quantidade de itens por página selecionada
  pageIndex: number = 0; 
  pageSizeOptionsModel: number = this.pageSize;

  //Colunas da tabela
  displayedColumns: string[] = ['cdServicos', 'descServicos'];

  constructor(private api: ServicosService) {}

  ngOnInit(): void {
//    console.log("INICIO");

    this.fetchServicos();
  }

  fetchServicos(): void {
    this.api.getServicos(this.pageIndex + 1,this.pageSize)
    .subscribe(
      response => {
        this.servicos = response.servicos;
        this.pagination = response.pagination;
//        console.log(this.servicos);
    });
  }

  onPageChange(event: PageEvent): void {
    if (event.pageIndex === 0) {
      this.onPageSizeChange(event.pageSize);
    } else {
      this.pageIndex = event.pageIndex;
      this.fetchServicos();
    }
  }

  onPageSizeChange(pageSize: number) {
    const maxPageIndex = Math.floor((this.pagination?.total || 0) / pageSize);
    this.pageSize = pageSize;
    if (this.pageIndex > maxPageIndex) {
      this.pageIndex = 0;
    }
//    console.log("DENTRO DE onPageSizeChange()");
//    console.log("this.pageIndex",this.pageIndex);
//    console.log("this.pageSize",this.pageSize);
    this.fetchServicos();
  }

}
