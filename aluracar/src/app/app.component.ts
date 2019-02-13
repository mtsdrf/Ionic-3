import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../modelos/agendamento';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar' },
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' }
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider,
    private _onesignal: OneSignal,
    private _agendamentoDao: AgendamentoDaoProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        
        this._onesignal
            .startInit('f00433e6-c160-4440-8b82-c76568c04795', '302476061616');

        this._onesignal.inFocusDisplaying(
          this._onesignal.OSInFocusDisplayOption.Notification
        );

        this._onesignal.handleNotificationReceived()
            .subscribe(
              (notificacao: OSNotification) => {
                let dadosAdicionais = notificacao.payload
                                                .additionalData;
                let agendamentoId = dadosAdicionais['agendamento-id'];

                this._agendamentoDao.recupera(agendamentoId)
                    .subscribe(
                      (agendamento: Agendamento) => {
                        agendamento.confirmado = true;

                        this._agendamentoDao.salva(agendamento);
                      }
                    )
              }
            );

        this._onesignal.endInit();
      });
  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

