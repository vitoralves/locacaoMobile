import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController, NavController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'modal-zoom-imagem',
  templateUrl: 'modal-zoom-imagem.html'
})
export class ZoomImagemPage {

  imagem;

  constructor(private modal: ModalController, private nav: NavParams, private view: ViewController, private dom: DomSanitizer, public navCtrl: NavController) {
      this.imagem = nav.get("imagem");
  }

  fecharModal(){
    this.view.dismiss();
  }

  retornaImg(){
    return this.imagem;
  }

}
