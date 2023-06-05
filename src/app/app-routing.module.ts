import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
//import { ClientesComponent } from './components/clientes/clientes.component';
//import { ServicosComponent } from './components/servicos/servicos.component';
import { ValoresMensaisComponent } from './components/valores-mensais/valores-mensais.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { LoginComponent, RegisterComponent } from './account';

const routes: Routes = [
    { path: '', component: HomeComponent },
 //   { path: 'clientes', component: ClientesComponent },
 //   { path: 'servicos', component: ServicosComponent },
    { path: 'clientes', loadChildren: () => import('./modules/clientes/clientes.module').then(c => c.ClientesModule) },  
    { path: 'servicos', loadChildren: () => import('./modules/servicos/servicos.module').then(s => s.ServicosModule) },  
    { path: 'consolidados', component: ValoresMensaisComponent },
    { path: 'dashboard', component: DashboardComponent},
    /*
    { 
        path: 'clientes',
        loadChildren: () => import('./components/clientes/clientes.component').then(cliente => cliente.ClientesComponent) 
    },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },
    */

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }