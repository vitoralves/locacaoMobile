import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  mensagem;
  assunto;

  constructor(public navCtrl: NavController, private alert: AlertController, private service: AuthService, private http: Http) {

  }

  enviar(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var stringInsert = this.assunto+"/"+this.mensagem+"/"+this.service.retornaIdCliente();
    return new Promise(resolve => {
        this.http.put('http://52.40.117.136:3000/api/mensagem/add/'+stringInsert, {headers: headers}).subscribe(status => {
            if(status.status == 200){
              resolve(true);
              this.assunto = '';
              this.mensagem = '';
              this.service.mostrarToast("Mensagem enviada, agradeçemos pelo contato!");
            }else
              this.service.mostrarToast("Não foi possível enviar a menssagem!");
              resolve(false);
        });
    });
  }
}
