import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  efetuaLogin() {
    console.log(this.email);
    console.log(this.senha);

    this.navCtrl.setRoot(HomePage);
  }

}
