import { Agendamento } from './../../modelos/agendamento';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos().subscribe(
      (agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
      } 
    )
  }

}
