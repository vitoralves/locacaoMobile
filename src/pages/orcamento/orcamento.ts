import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';
import {ModalNovoOrcamentoPage} from '../modal-novo-orcamento/modal-novo-orcamento';

@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html'
})
export class OrcamentoPage {

  novoOrcamento: boolean = false;
  orcamento: any;


  constructor(public navCtrl: NavController, private http: Http, private service: AuthService, private modal: ModalController,
  public view: ViewController) {
    this.service.loadUserCredentials();
    var idCliente = this.service.AuthToken;
    console.log("id_cliente "+idCliente);
    if (this.novoOrcamento == false){
      this.http.get('http://localhost:3000/api/orcamento/cliente/'+idCliente).map(res => res.json()).subscribe(data => {
        this.orcamento = data.data;
      });
    }
  }

  adicionarProduto(produto){

  }

  criaOrcamento(){
    let modal = this.modal.create(ModalNovoOrcamentoPage);
    modal.present();
  }

}
