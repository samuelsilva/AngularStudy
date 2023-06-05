import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { ServicosComponent } from 'src/app/components/servicos/servicos.component';
import { ServicosRoutingModule } from './servicos-routing.module';


@NgModule({
  declarations: [ ServicosComponent ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    ServicosRoutingModule
  ],
  exports: [ ServicosComponent ]
})
export class ServicosModule { }
