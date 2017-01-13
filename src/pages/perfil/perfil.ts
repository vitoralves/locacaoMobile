import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalController, ViewController, ToastController, LoadingController} from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  cliente = {
    id_cliente: '',
    nome: '',
    sobrenome: '',
    email: ''
  };

  constructor(public http: Http, public modal: ModalController, public viewCtrl: ViewController, private servico: AuthService, private toast: ToastController, private loading: LoadingController) {
    this.http.get('http://35.167.130.147:3000/api/cliente/'+this.servico.retornaIdCliente()).map(res => res.json()).subscribe(data => {
      this.cliente = data.data;
    });
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  salvar(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var updateString = this.cliente.id_cliente+"/"+this.cliente.nome+"/"+this.cliente.sobrenome+"/"+this.cliente.email;
    return new Promise(resolve => {
        this.http.put('http://35.167.130.147:3000/api/cliente/update/'+updateString, {headers: headers}).subscribe(status => {
            console.log("status"+status.status);
            if(status.status == 200){
                resolve(true);
                this.mostrarToast("Perfil atualizado!");
                this.fecharModal();
            }else
                resolve(false);
        });
    });
  }

  mostrarToast(mensagem){
    let toast = this.toast.create({
          message: mensagem,
          duration: 3000
        });
        toast.present();
  }

}
