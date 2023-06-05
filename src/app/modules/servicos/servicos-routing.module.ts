import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosComponent } from 'src/app/components/servicos/servicos.component';

const routes: Routes = [
  { path: '', component: ServicosComponent },
  // Outras rotas do módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
