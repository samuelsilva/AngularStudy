import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { ClienteService } from './services/cliente.service';
import { ServicosService } from './services/servicos.service';

// Changes for apply lazyload
//import { ClientesComponent } from './components/clientes/clientes.component';
//import { ServicosComponent } from './components/servicos/servicos.component';


import { ClientesModule } from './modules/clientes/clientes.module';
import { ServicosModule } from './modules/servicos/servicos.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


import { HomeComponent } from './home/home.component';
import { ValoresMensaisComponent } from './components/valores-mensais/valores-mensais.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
//    ClientesComponent,
//    ServicosComponent,
    MainNavComponent,
    HomeComponent,
    ValoresMensaisComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    ClientesModule,
    ServicosModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [ClienteService,ServicosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
