import { Component } from '@angular/core';
import { ValoresMensais, Pagination } from 'src/app/models/valores-mensais';
import { ValoresMensaisService } from 'src/app/services/valores-mensais.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-valores-mensais',
  templateUrl: './valores-mensais.component.html',
  styleUrls: ['./valores-mensais.component.css']
})
export class ValoresMensaisComponent {

  valoresMensais: ValoresMensais[] = [];
  pagination: Pagination | null = null;
  pageSizeOptions: number[] = [5, 10, 20]; // Opções de quantidade de itens por página
  pageSize: number = 5; // Quantidade de itens por página selecionada
  pageIndex: number = 0; 
  pageSizeOptionsModel: number = this.pageSize;

  // variaveis pro filtro
  nrCliente: number | null = null; // número pra teste


  // variáveis de campos pro filtro
  selectedValue: string | null = null;
  selectedCliente: string | null = null;
  selected: any;
  

  // colunas da tabela que serão mostradas
  displayedColumns: string[] = ['nomeCliente', 'dtCompetencia', 'descServicos', 'qtdServico', 'valorServico', 'qtdDesc', 'valorDesc', 'dtcarga'];

  // Para fazer o range das datas
  filtroDtCompetencia = new FormControl();

  // Construtor pra chamar o Service dos Valores Mensais
  constructor(private api: ValoresMensaisService, private apiClientesService:ClienteService) {}

  ngOnInit(): void {
//    console.log("Componente dos Valores Mensais");
    //this.componentClientesValues = this.ClientesService.getClientes(1,0);
    //const selecionados = this.ClientesComponent.gerarValores();
    
    this.fetchValoresMensaisInfraestrutura();
    this.selected = this.gerarValores();
    console.log("SELECTED: ",this.selected);
  }


  fetchValoresMensaisInfraestrutura(): void {
    // FILTROS DA BUSCA
    let filters = {
      /*dtCompetenciaMin: this.filtroDtCompetencia.value?.toISOString() || undefined,
      dtCompetenciaMax:  this.filtroDtCompetencia.value?.toISOString() || undefined, // Adicione o valor desejado aqui
      dtCarga: undefined, // Adicione o valor desejado aqui
      qtdServico: undefined, // Adicione o valor desejado aqui
      */
      nrCliente: undefined // Adicione o valor desejado aqui
      
    };

    let params = Object.assign({}, {
      page: this.pageIndex + 1,
      limit: this.pageSize,
    });
  
    // Teste pra garantir que caso nada seja selecionado volte ao estado inicial da busca
    if (this.selectedCliente && this.selectedCliente !== 'Nenhum') {
      this.nrCliente = Number(this.selectedCliente);
    } else {
      this.selectedCliente = null; // Atribui null quando "Nenhum" for selecionado
      this.nrCliente = null;
    }

    // Adiciona os parametros ao objeto parametro
    if (this.nrCliente !== undefined && this.nrCliente !== null) {
      Object.assign(params, {
        nrCliente: String(this.nrCliente)
      });
    }
    this.api.getValoresMensaisInfraestrutura(params)
    .subscribe(
      response => {
        this.valoresMensais = response.valoresmensaisinfraestrutura;  
        this.pagination = response.pagination;
//      console.log(response);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    if (event.pageIndex === 0) {
      this.onPageSizeChange(event.pageSize);
    } else {
      this.pageIndex = event.pageIndex;
      this.fetchValoresMensaisInfraestrutura();
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
    this.fetchValoresMensaisInfraestrutura();
  }

  // Capturar os eventos de seleção de data no Material DatePicker
  addEventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filtroDtCompetencia.setValue(event.value);
  }

  gerarValores(): any {
    const selected: { chave: number; valor: string; }[] = [];
    this.apiClientesService.getClientesTotal().subscribe(response => {
 
      for(let i = 0; i<response.clientes.length; i++) {
 
        //console.log(JSON.stringify(response.clientes[i].refPassada));
        //if(response.clientes[i].refPassada === null) {

          const chave = response.clientes[i].nrCliente;
          const valor = response.clientes[i].nomeCliente;
          // Criar um objeto com a chave e valor
          const objeto = {
            chave: chave,
            valor: valor
          };
          selected.push(objeto);
        //}
      }
    });
    return selected;
  }
  

}
