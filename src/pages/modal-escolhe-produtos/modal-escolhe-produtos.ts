import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController, NavController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Funcoes} from '../util/funcoes';
import { Http } from '@angular/http';

@Component({
  selector: 'escolhe-orcamento-produtos',
  templateUrl: 'modal-escolhe-produtos.html',
  providers: [Funcoes]
})
export class EscolheProdutosPage {

  produtos;
  todosProdutos;
  searchbar: string;

  constructor(private modal: ModalController, private nav: NavParams, private view: ViewController, private util: Funcoes,
    private http: Http, private dom: DomSanitizer, public navCtrl: NavController) {
    this.http.get('http://localhost:3000/api/produtos/detalhado').map(res => res.json()).subscribe(data => {
      this.produtos = data.data;
      this.todosProdutos = data.data;
    });

  }

  fecharModal(){
    this.view.dismiss();
  }

  insereProdutoOrcamento(produto){

  }

  pesquisa(searchbar) {
    //reseta lista de produtos
    this.produtos = this.todosProdutos;

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.produtos = this.produtos.filter((v) => {
      if(v.nome && q) {
        if (v.nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
