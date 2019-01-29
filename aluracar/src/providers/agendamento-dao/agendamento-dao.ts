import { Agendamento } from './../../modelos/agendamento';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {}  

  private _geraChave(agendamento: Agendamento){
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento) {
    let chave = this._geraChave(agendamento);

    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento){
    let chave = this._geraChave(agendamento);
    let promise = this._storage
      .get(chave)
      .then(dado => dado ? true : false );

    return Observable.fromPromise(promise);
  }
}
