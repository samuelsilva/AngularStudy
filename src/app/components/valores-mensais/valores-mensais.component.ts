import { Component, ViewChild } from '@angular/core';
import { ValoresMensais, Pagination } from 'src/app/models/valores-mensais';
import { ValoresMensaisService } from 'src/app/services/valores-mensais.service';
import { PageEvent } from '@angular/material/paginator';
//import { /*MatDatepickerInputEvent*/MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicosService } from 'src/app/services/servicos.service';
import {  DateRange, MatDatepicker } from '@angular/material/datepicker';
//import { MatDatepickerRangeValue } from '@angular/material/datepicker';

import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

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
  cdServico: number | null = null;
  dtCompetenciaMin : string | null = null;
  dtCompetenciaMax : string | null = null;
  dtCargaMin : string | null = null;
  dtCargaMax : string | null = null;

  rangeFormCompetencia: FormGroup;
  rangeFormCarga: FormGroup;

  // variáveis de campos pro filtro de Clientes
  selectedValue: string | null = null;
  selectedCliente: string | null = null;
  selected: any;
  
  // variáveis de campos pro filtro de Serviços
  selectedServicosValue: string | null = null;
  selectedServicosName: string | null = null;
  selectedServicos: any;

  // variáveis de campos pro filtro de datas
  //  DtCompetencia: any;
@ViewChild('DtCompetencia') DtCompetencia!: MatDatepicker<any>;
  selectedDtCompetenciaMin: Date | null = null; // 2023-02-28
  selectedDtCompetenciaMax: Date | null = null;
  selectedDateRange: DateRange<Date> | null = null;

  // variáveis de campos pro filtro de datas
  //  DtCompetencia: any;
@ViewChild('DtCarga') DtCarga!: MatDatepicker<any>;
  selectedDtCargaMin: Date | null = null; // 2023-02-28
  selectedDtCargaMax: Date | null = null;
  selectedCargaDateRange: DateRange<Date> | null = null;

  // colunas da tabela que serão mostradas
  displayedColumns: string[] = ['nomeCliente', 'dtCompetencia', 'descServicos', 'qtdServico', 'valorServico', 'qtdDesc', 'valorDesc', 'dtcarga'];

  // Para fazer o range das datas
  filtroDtCompetencia = new FormControl();

  // Construtor pra chamar o Service dos Valores Mensais, montar o dados do filtro usando os outros Services
  constructor(private api: ValoresMensaisService, 
              private apiClientesService:ClienteService, 
              private apiServicosService: ServicosService) {

                this.rangeFormCompetencia = new FormGroup({
                  start: new FormControl<Date | null>(null),
                  end: new FormControl<Date | null>(null)
                });

                this.rangeFormCarga = new FormGroup({
                  start: new FormControl<Date | null>(null), 
                  end: new FormControl<Date | null>(null)
                });
              }

  ngOnInit(): void {
//    console.log("Componente dos Valores Mensais");
    //this.componentClientesValues = this.ClientesService.getClientes(1,0);
    //const selecionados = this.ClientesComponent.gerarValoresClientes();
    
    this.fetchValoresMensaisInfraestrutura();
    this.selected = this.gerarValoresClientes();
    this.selectedServicos = this.gerarValoresServicos();
//    console.log("SELECTED CLIENTES: ",this.selected);
//    console.log("SELECTED SERVICOS: ",this.selectedServicos);
  }


  fetchValoresMensaisInfraestrutura(): void {
    /*
    let filters = {
      dtCompetenciaMin: this.filtroDtCompetencia.value?.toISOString() || undefined,
      dtCompetenciaMax:  this.filtroDtCompetencia.value?.toISOString() || undefined, // Adicione o valor desejado aqui
      dtCarga: undefined, // Adicione o valor desejado aqui
      qtdServico: undefined, // Adicione o valor desejado aqui
      
      nrCliente: undefined, // Adicione o valor desejado aqui
      cdServico: undefined
    };
    */

    let params = Object.assign({}, {
      page: this.pageIndex + 1,
      limit: this.pageSize,
    });
  
    // Teste pra garantir que caso o CLIENTE não seja selecionado volte ao estado inicial da busca
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

    // Teste pra garantir que caso o SERVIÇO não seja selecionado volte ao estado inicial da busca
    if (this.selectedServicosName && this.selectedServicosName !== 'Nenhum') {
      this.cdServico = Number(this.selectedServicosName);
    } else {
      this.selectedServicosName = null; // Atribui null quando "Nenhum" for selecionado
      this.cdServico = null;
    }
    // Adiciona os parametros ao objeto parametro
    if (this.cdServico !== undefined && this.cdServico !== null) {
      Object.assign(params, {
        cdServico: String(this.cdServico)
      });
    }

    // Test for datepicker, if is not null then add to object, if not don't get in
    if(this.rangeFormCompetencia.controls['start'].value && this.rangeFormCompetencia.controls['start'].value !== null) {
      this.dtCompetenciaMin = this.rangeFormCompetencia.controls['start'].value.toLocaleDateString('sv');
//      console.log('Data retornou: ',this.rangeFormCompetencia.controls['start'].value.toLocaleDateString('sv'));
    } else {
//      console.log('Data VAZIA retornou: ',this.rangeFormCompetencia.controls['start'].value); 
      this.dtCompetenciaMin = null;
    }

    if (this.dtCompetenciaMin !== undefined && this.dtCompetenciaMin !== null) {
      Object.assign(params, {
        dtCompetenciaMin: String(this.dtCompetenciaMin)
      });
    }

    if(this.rangeFormCompetencia.controls['end'].value && this.rangeFormCompetencia.controls['end'].value !== null) {
      this.dtCompetenciaMax = this.rangeFormCompetencia.controls['end'].value.toLocaleDateString('sv');
//      console.log('Data retornou: ',this.rangeFormCompetencia.controls['end'].value.toLocaleDateString('sv'));
    } else {
//      console.log('Data VAZIA retornou: ',this.rangeFormCompetencia.controls['end'].value); 
      this.dtCompetenciaMax = null;
    }

    if (this.dtCompetenciaMax !== undefined && this.dtCompetenciaMax !== null) {
      Object.assign(params, {
        dtCompetenciaMax: String(this.dtCompetenciaMax)
      });
    }
    // END tests and assign for competencia's datepicker

    // START tests and assign for carga's datepicker
    if(this.rangeFormCarga.controls['start'].value && this.rangeFormCarga.controls['start'].value !== null) {
      console.log('Data retornou: ',this.rangeFormCarga.controls['start'].value.toLocaleDateString('sv'));
      this.dtCargaMin = this.rangeFormCarga.controls['start'].value.toLocaleDateString('sv');
    } else {
      console.log('Data VAZIA retornou: ',this.rangeFormCarga.controls['start'].value); 
      this.dtCargaMin = null;
    }
    
    if(this.dtCargaMin !== undefined && this.dtCargaMin !== null) {
      Object.assign(params, {
        dtCargaMin: String(this.dtCargaMin)
      })
    }
    
    if(this.rangeFormCarga.controls['end'].value && this.rangeFormCarga.controls['end'].value !== null) {
      console.log('Data retornou: ',this.rangeFormCarga.controls['end'].value.toLocaleDateString('sv'));
      this.dtCargaMax = this.rangeFormCarga.controls['end'].value.toLocaleDateString('sv');
    } else {
      console.log('Data VAZIA retornou: ',this.rangeFormCarga.controls['end'].value); 
      this.dtCargaMax = null;
    }
    
    if(this.dtCargaMax !== undefined && this.dtCargaMax !== null) {
      Object.assign(params, {
        dtCargaMax: String(this.dtCargaMax)
      })
    }
    // END tests and assign for carga's datepicker
    

    this.api.getValoresMensaisInfraestrutura(params)
    .subscribe(
      response => {
        this.valoresMensais = response.valoresmensaisinfraestrutura;  
        this.pagination = response.pagination;
      console.log("Retorno do fetch: ",this.valoresMensais);
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
  /*
  addEventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filtroDtCompetencia.setValue(event.value);
  }
  */
  // function to create a select for the clientes in the filter
  gerarValoresClientes(): any {
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
  
  // function to create a select for the clientes in the filter
  gerarValoresServicos(): any {
    const selected: { chave: number; valor: string; }[] = [];
    this.apiServicosService.getServicosTotal().subscribe(response => {
 
      for(let i = 0; i<response.servicos.length; i++) {
 
        //console.log(JSON.stringify(response.clientes[i].refPassada));
        //if(response.clientes[i].refPassada === null) {

          const chave = response.servicos[i].cdServicos;
          const valor = response.servicos[i].descServicos;
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

  clearFilter() {
    this.selectedServicosName = 'Nenhum';
    this.selectedCliente = 'Nenhum';
    this.rangeFormCompetencia.patchValue({
      start: null,
      end: null
    });
    this.rangeFormCarga.patchValue({
      start: null,
      end: null
    });
    this.fetchValoresMensaisInfraestrutura();
  }

}
