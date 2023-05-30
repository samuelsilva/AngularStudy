import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { ClientesComponent } from 'src/app/components/clientes/clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';

@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule, 
    ClientesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  exports: [ClientesComponent]
})
export class ClientesModule { }
