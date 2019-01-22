import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

public carro: Carro;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.carro = this.navParams.get('carroSelecionado');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }

}
