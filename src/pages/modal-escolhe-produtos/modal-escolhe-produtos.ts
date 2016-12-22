import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController } from 'ionic-angular';
import {Funcoes} from '../util/funcoes';

@Component({
  selector: 'escolhe-orcamento-produtos',
  templateUrl: 'modal-escolhe-produtos.html',
  providers: [Funcoes]
})
export class EscolheProdutosPage {

  produtos;

  constructor(private modal: ModalController, private nav: NavParams, private view: ViewController, private util: Funcoes) {
    this.produtos = this.util.retornaListaProdutos();
  }

  fecharModal(){
    this.view.dismiss();
  }

  insereProdutoOrcamento(){

  }
}
