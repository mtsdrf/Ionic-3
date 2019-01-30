import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Agendamento } from './../../modelos/agendamento';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];

  private alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alerta: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos().subscribe(
      (agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
      } 
    )
  }

  reenvia(agendamento: Agendamento){

    this.alerta = this._alerta.create({ // Atribui o _alerta criado ao atributo alerta
      title: "Aviso!", //Titulo do botão
      buttons: [
        {
          text: "OK", //Texto do botão
        }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
      .mergeMap( //É executado depois do metodo agenda(OBS: importar o mergemap no app module)
        (valor) => {
          let observable = this._agendamentoDao.salva(agendamento);
          if (valor instanceof Error) {
            throw valor;
          }

          return observable;
        }
      )
      .finally(
        () => this.alerta.setSubTitle(mensagem).present() //Define o subtitulo do alerta e mostra o alerta
      )
      .subscribe(
        () => mensagem = 'O agendamento foi reenviado!', //Define o subtitulo do alerta e mostra o alerta
        (err: Error) => mensagem = err.message //Define o subtitulo do alerta e mostra o alerta
      );
  }

}
