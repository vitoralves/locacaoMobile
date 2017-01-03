import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController, NavController, AlertController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Funcoes} from '../util/funcoes';
import { Http, Headers } from '@angular/http';
import {AuthService} from '../autenticacao/authservico';
import {ZoomImagemPage} from '../modal-zoom-imagem/modal-zoom-imagem';

@Component({
  selector: 'escolhe-orcamento-produtos',
  templateUrl: 'modal-escolhe-produtos.html',
  providers: [Funcoes]
})
export class EscolheProdutosPage {

  produtos;
  todosProdutos;
  searchbar: string;
  categoriaSelecionada = 'Tudo';
  categorias: any;
  quantidade;

  constructor(private modal: ModalController, private nav: NavParams, private view: ViewController, private util: Funcoes,
    private http: Http, private dom: DomSanitizer, public navCtrl: NavController, private alert: AlertController, private service: AuthService) {
    this.http.get('http://localhost:3000/api/produtos/detalhado').map(res => res.json()).subscribe(data => {
      this.produtos = data.data;
      this.todosProdutos = data.data;
    });

    this.http.get('http://localhost:3000/api/categorias/').map(res => res.json()).subscribe(data => {
      this.categorias = data.data;
    });

  }

  fecharModal(){
    this.view.dismiss();
  }

  insereProdutoOrcamento(produto){
     let alert = this.alert.create();
     alert.setTitle('Selecione a quantidade.');

     alert.addInput({
       type: 'number'
     });

     alert.addButton('Cancelar');
     alert.addButton({
       text: 'OK',
       handler: data => {
         this.quantidade = data;
         var headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         return new Promise(resolve => {
           var stringAdd = produto.id_produto+"/"+this.quantidade[0]+"/"+this.util.retornaIdOrcamento()
           this.http.put('http://localhost:3000/api/itemOrcamento/add/'+stringAdd, {headers: headers}).subscribe(status => {
            console.log("status"+status.status);
              if(status.status == 200){
                this.util.mostrarToast("Produto "+produto.id_produto+" adicionado ao orçamento.");
                //remover esse produto da lista
                let index = this.todosProdutos.indexOf(produto);
                if(index > -1){
                    this.todosProdutos.splice(index, 1);
                }
                resolve(true);
              }else
                this.util.mostrarToast("Não foi possível adicionar o produto ao orçamento!");
                resolve(false);
              });
         });
       }
     });
     alert.present();
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

  alteraCategoria(event){
    //reseta lista de produtos
    this.produtos = this.todosProdutos;

    // if the value is an empty string don't filter the items
    if (event == 'Tudo') {
      return;
    }

    this.produtos = this.produtos.filter((v) => {
      if(v.categoria && event) {
        if (v.categoria.toString().indexOf(event.toString()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  ampliaImagem(item){
    let modal = this.modal.create(ZoomImagemPage, {imagem: item.encode});
    modal.present();
  }

}
