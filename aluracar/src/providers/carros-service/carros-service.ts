import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {

  constructor(private _http: HttpClient) {
  }

  lista() {
    return this._http.get<Carro[]>('http://192.168.43.168:8080/api/carro/listaTodos');
  }

}
