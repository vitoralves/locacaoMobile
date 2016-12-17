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

  constructor(public http: Http, public loading: LoadingController, public modal: ModalController, public viewCtrl: ViewController,
  private dom: DomSanitizer, public service: AuthService, private nav: NavController, private popover: PopoverController) {
  //  this.mostrarLoading();
    this.http.get('http://localhost:3000/api/produtos/').map(res => res.json()).subscribe(data => {
      this.produtos = data.data;
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

  abrirPopover(e){
    
  }
}
