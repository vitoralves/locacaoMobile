import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';
import {ModalNovoOrcamentoPage} from '../modal-novo-orcamento/modal-novo-orcamento';
import {Funcoes} from '../util/funcoes';

@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
  providers: [Funcoes]
})
export class OrcamentoPage {

  orcamento: any;

  constructor(public navCtrl: NavController, private http: Http, private service: AuthService, private modal: ModalController,
  public view: ViewController, private funcao: Funcoes, private loading: LoadingController) {
    this.funcao.salvaStatusOrcamento(false);
  }

  ngOnInit(){
    let l = this.loading.create({
      content: 'Aguarde...'
    });
    l.present();

    this.service.loadUserCredentials();
    var idCliente = this.service.AuthToken;
    console.log("id_cliente "+idCliente);
    if (this.funcao.retornaStatusOrcamento() == false){
      this.http.get('http://localhost:3000/api/orcamento/cliente/'+idCliente).map(res => res.json()).subscribe(data => {
        this.orcamento = data.data;
      });
    }

    l.dismiss();
  }

  adicionarProduto(produto){

  }

  criaOrcamento(){
    let modal = this.modal.create(ModalNovoOrcamentoPage);
    modal.onDidDismiss(data =>{
      this.atualizaOrcamentos();
    });
    modal.present();
  }


  atualizaOrcamentos(){
    this.service.loadUserCredentials();
    var idCliente = this.service.AuthToken;
    if (this.funcao.retornaStatusOrcamento() == false){
      this.http.get('http://localhost:3000/api/orcamento/cliente/'+idCliente).map(res => res.json()).subscribe(data => {
        this.orcamento = data.data;
      });
    }
  }

  ocultar(item){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
        this.http.put('http://localhost:3000/api/orcamento/ocultar/'+item.id_orcamento, {headers: headers}).subscribe(status => {
            console.log("status"+status.status);
            if(status.status == 200){
                this.funcao.mostrarToast("Orcamento nº"+item.id_orcamento+" ocultado.");
                this.atualizaOrcamentos();
                resolve(true);
            }else
                this.funcao.mostrarToast("Não foi possível ocultar orçamento!");
                resolve(false);
        });
    });
  }

}
