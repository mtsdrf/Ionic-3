import { EscolhaPage } from './../escolha/escolha';
import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _carrosService: CarrosServiceProvider) {}

  ionViewDidLoad(){
    let loading = this._loadingCtrl.create({
      content: 'Aguarde o carregamento dos carros...'
    });

    loading.present();

    this._carrosService
    .lista()
    .subscribe(
      (carros) => {
        this.carros = carros;
        loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        loading.dismiss();

        this._alertCtrl.create({
          title: 'Falha na Conexão',
          subTitle: 'Não foi possível carregar a lista de carros. Tente novamente mais tarde',
          buttons: [
            { text: 'Ok'}
          ]
        }).present();
      }
    );
  }

  selecionaCarro(carro: Carro){
    console.log(carro);
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });
  }
}
