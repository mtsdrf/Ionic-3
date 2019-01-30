import { ListaAgendamentosPage } from './../pages/lista-agendamentos/lista-agendamentos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, List } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';

import { IonicStorageModule } from '@ionic/storage';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaAgendamentosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ //Configuração do Storage do Ionic Não devemos deixar de importar p módulo(na mão)
      name: 'aluracar', //nome do banco
      storeName: 'agendamentos', //nome da tabela
      driverOrder: ['indexeddb'] // array com os tipos de bancos
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaAgendamentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider
  ]
})
export class AppModule {}
