import { Component } from '@angular/core';
//import { Observable } from 'rxjs';
import { Clientes, Pagination } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  
  clientes: Clientes[] = [];
  pagination: Pagination | null = null;
  pageSizeOptions: number[] = [5, 10, 20]; // Opções de quantidade de itens por página
  pageSize: number = 5; // Quantidade de itens por página selecionada
  pageIndex: number = 0; 
  pageSizeOptionsModel: number = this.pageSize;


  //clientes$: Observable<Clientes[]>;
  
  displayedColumns: string[] = ['nrCliente', 'nomeCliente', 'refPassada'];

  constructor(private api: ClienteService) {}

  ngOnInit(): void {
    //console.log("INICIO");
    this.fetchClientes();
//    this.gerarValores();
  }
  
  fetchClientes(): void {
    this.api.getClientes(this.pageIndex + 1,this.pageSize).subscribe(response => {
      this.clientes = response.clientes;
      this.pagination = response.pagination;
/*
      console.log("DENTRO DE fetchClientes()");
      console.log("this.pageIndex: ",this.pageIndex);
      console.log("this.pageSize: ",this.pageSize);
*/    
    
      //console.log(this.clientes,this.pagination);
    });
  }

  /*
  onPageChange(event: any): void {
    
    this.pageIndex = event.pageIndex;
    this.fetchClientes();
  }
  */
  onPageChange(event: PageEvent): void {
    if (event.pageIndex === 0) {
      this.onPageSizeChange(event.pageSize);
    } else {
      this.pageIndex = event.pageIndex;
      this.fetchClientes();
    }
  }

  onPageSizeChange(pageSize: number) {
    const maxPageIndex = Math.floor((this.pagination?.total || 0) / pageSize);
    this.pageSize = pageSize;
    if (this.pageIndex > maxPageIndex) {
      this.pageIndex = 0;
    }
/*
    console.log("DENTRO DE onPageSizeChange()");
    console.log("this.pageIndex",this.pageIndex);
    console.log("this.pageSize",this.pageSize);
*/
    this.fetchClientes();
  }
  /*
  onPageSizeChange(event: any): void {
    this.pageIndex = 0;
    this.pageSize = event.pageSize;
    console.log("DENTRO DE onPageSizeChange()");
    console.log("this.pageIndex",this.pageIndex);
    console.log("this.pageSize",this.pageSize);
    this.fetchClientes();
  }
   */


}
  /*
  onPageSizeChange(event: PageEvent): void{
    const paginator: MatPaginator = event.paginator;
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;
    console.log("this.pageIndex",this.pageIndex);
    console.log("this.pageSize",this.pageSize);
    this.fetchClientes(); //Recarrega os dados com a nova quantidade de dados e volta pra página inicial
  } 
  onPageSizeChange(event: PageEvent): void {
    this.pageIndex = 0;
    this.pageSize = event.pageSize;
    console.log("this.pageIndex", this.pageIndex);
    console.log("this.pageSize", this.pageSize);
    this.fetchClientes(); // Recarrega os dados com a nova quantidade de dados e volta para a página inicial
  }
  */
 
 