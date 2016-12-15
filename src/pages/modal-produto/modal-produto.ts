import {DomSanitizer} from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal-produto',
  templateUrl: 'modal-produto.html'
})
export class ModalProdutoPage {
  produto: any;
  imagem: any;
  quantidade: number;
  
  constructor(public modal: ModalController, public nav: NavParams, private dom: DomSanitizer, private viewCtrl: ViewController) {
    this.produto = nav.get("parametro");
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  retornaImg(){

  }
}
