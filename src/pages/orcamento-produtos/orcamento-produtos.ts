import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController } from 'ionic-angular';
import {EscolheProdutosPage} from '../modal-escolhe-produtos/modal-escolhe-produtos';

@Component({
  selector: 'page-orcamento-produtos',
  templateUrl: 'orcamento-produtos.html'
})
export class OrcamentoProdutosPage {
  dataInicio;
  dataFim;
  local;
  cidade;
  orcamento;
  produtosList;

  constructor(private modal: ModalController, private nav: NavParams, private view: ViewController) {
    this.dataInicio = nav.get("dataInicio");
    this.dataFim = nav.get("dataFim");
    this.local = nav.get("local");
    this.cidade = nav.get("cidade");
    this.orcamento = nav.get("orcamento");
  }

  ngOnInit(){

  }

  salvarItensOrcamento(lista){

  }

  fecharModal(){
    this.view.dismiss();
  }

  insereProduto(){
    let modal = this.modal.create(EscolheProdutosPage);
    modal.present();
  }
}
