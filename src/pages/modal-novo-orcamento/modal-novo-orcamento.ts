import { Component } from '@angular/core';
import {ToastController, ModalController, NavParams, ViewController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';

@Component({
  selector: 'page-modal-novo-orcamento',
  templateUrl: 'modal-novo-orcamento.html'
})
export class ModalNovoOrcamentoPage {

  orcNovo: string[];


  constructor(public modal: ModalController, public nav: NavParams, private viewCtrl: ViewController,
    private toast: ToastController, private service: AuthService) {}

  criarOrcamento(){
    console.log(this.orcNovo);
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  mostrarToast(mensagem){
    let toast = this.toast.create({
          message: mensagem,
          duration: 3000
        });
        toast.present();
  }

}
