import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ModalController, ViewController, NavController, PopoverController} from 'ionic-angular';
import { ModalProdutoPage } from '../modal-produto/modal-produto';
import 'rxjs/add/operator/toPromise';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../autenticacao/authservico';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  produtos: any;
  produtoSelecionado: any;
  palavra: string = '';
  todosProdutos;
  searchString: string = '';

  constructor(public http: Http, public loading: LoadingController, public modal: ModalController, public viewCtrl: ViewController,
  private dom: DomSanitizer, public service: AuthService, private nav: NavController, private popover: PopoverController) {
  //  this.mostrarLoading();
    this.http.get('http://localhost:3000/api/produtos/').map(res => res.json()).subscribe(data => {
      this.produtos = data.data; // esse será usado para o filtro do searchbar será modificado
      this.todosProdutos = data.data; // esse é estático não muda mais
    });

  }

  mostrarLoading(){
    let loader = this.loading.create({
     content: "Listando Produtos ...",
     duration: 5000
   });
   loader.present();
  }

  itemSelecionado(produto){
    this.pesquisaProdutoPorId(produto.id_produto).then(data => {
      this.produtoSelecionado = data.data;
      console.log(this.produtoSelecionado.nome);
      this.modalProdutoSelecionado()
    });
  }

  pesquisaProdutoPorId(id){
    this.produtoSelecionado = null;
    return this.http.get('http://localhost:3000/api/produtos/'+ id).map(res => res.json()).toPromise();
  }

  modalProdutoSelecionado(){
    let modal = this.modal.create(ModalProdutoPage, {parametro: this.produtoSelecionado});
    modal.present();
  }

  logout(){
    this.service.logout();
    this.nav.setRoot(LoginPage);
  }

  abrirPopover(ev){
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
      if(v.lower && q) {
        if (v.lower.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
