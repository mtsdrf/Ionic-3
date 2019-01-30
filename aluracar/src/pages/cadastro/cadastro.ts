import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Agendamento } from '../../modelos/agendamento';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  // Definição de atributos do Carro
  public carro: Carro;
  public precoTotal: number;

  // Definição dos atributos do agendamento
  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  
  // Definição do alerta
  private alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider,
    private _alerta: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider) {
  
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  // Criação do metodo agenda
  agenda(){

    if (!this.nome || !this.endereco || !this.email) {
      this._alerta.create({
        title: 'Preenchimento Obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          {text: 'ok'}
        ]
      }).present();

      return;
    }

    // Criando variavel agendamento e atribuindo o json com os dados para enviar pra api a ela
    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    }

    this.alerta = this._alerta.create({ // Atribui o _alerta criado ao atributo alerta
      title: "Aviso!", //Titulo do botão
      buttons: [ 
        { 
          text: "OK", //Texto do botão
          handler: () => { //Define o que fazer quando o botão for clicado
            this.navCtrl.setRoot(HomePage); // Navega pra HomePage e tira todas paginas de cima
          } 
        } 
      ]
    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(ehDuplicado => {
        if (ehDuplicado) {
          throw new Error('Agendamento existente!');
        }

        return this._agendamentosService.agenda(agendamento);
    })    
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
      () => mensagem = 'O agendamento foi realizado com sucesso!', //Define o subtitulo do alerta e mostra o alerta
      (err: Error) => mensagem = err.message //Define o subtitulo do alerta e mostra o alerta
    );
  }
}
