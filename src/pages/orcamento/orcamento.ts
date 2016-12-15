import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';

@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html'
})
export class OrcamentoPage {

  novoOrcamento: boolean = false;
  orcamento: any;

  constructor(public navCtrl: NavController, private http: Http, private service: AuthService) {
    if (this.novoOrcamento == false){
      this.http.get('http://localhost:3000/api/orcamento/'+this.service.cliente.id_cliente).map(res => res.json()).subscribe(data => {
        this.orcamento = data.data;
      });
    }
  }



}
