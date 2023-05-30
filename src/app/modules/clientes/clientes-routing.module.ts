import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from 'src/app/components/clientes/clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  // Outras rotas do módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
