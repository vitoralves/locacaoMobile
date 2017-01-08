import {DomSanitizer} from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AlertController, ToastController, ModalController, NavParams, ViewController } from 'ionic-angular';
import {ModalNovoOrcamentoPage} from '../modal-novo-orcamento/modal-novo-orcamento';
import {Funcoes} from '../util/funcoes';

@Component({
  selector: 'page-modal-produto',
  templateUrl: 'modal-produto.html',
  providers: [Funcoes]
})
export class ModalProdutoPage {
  produto: any;
  imagem: any;
  quantidade: number;

  constructor(public modal: ModalController, public nav: NavParams, public dom: DomSanitizer, private viewCtrl: ViewController,
    private alert: AlertController, private toast: ToastController, private funcao: Funcoes) {
    this.produto = nav.get("parametro");
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  adicionarOrcamento(produto){
    console.log(this.quantidade);
    if (this.quantidade > 0){
      let modal = this.modal.create(ModalNovoOrcamentoPage, {produto: produto.id_produto, quantidade: this.quantidade});
      modal.onDidDismiss(data =>{
        this.viewCtrl.dismiss();
      });
      modal.present();
    }else{
      let alert = this.alert.create({
          title: 'Atenção',
          message: 'Escolha a quantidade desejada!',
          buttons: ['OK']
      });
      alert.present();
    }
  }

  mostrarToast(mensagem){
    let toast = this.toast.create({
          message: mensagem,
          duration: 3000
        });
        toast.present();
  }

}
