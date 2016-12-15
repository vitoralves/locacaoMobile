import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../autenticacao/authservico';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  dados = {
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            repetirSenha: ''
  }

  constructor(public navCtrl: NavController, public service: AuthService, private alert: AlertController) {}

  registrar(usuario) {
    if (usuario.nome == ""){
      this.service.mostrarToast("Insira o nome!");
    }else if (usuario.sobrenome == ""){
      this.service.mostrarToast("Insira o sobrenome!");
    }else if (usuario.email == ""){
      this.service.mostrarToast("Insira o email!");
    }else if (usuario.senha == ""){
      this.service.mostrarToast("Insira uma senha!");
    }else if (usuario.repetirSenha == ""){
      this.service.mostrarToast("Confirme a senha!");
    }else if (usuario.senha !== usuario.repetirSenha){
        this.service.mostrarToast("Senhas diferentes!");
    }else{
      this.service.emailCadastrado(usuario.email).then(data => {
        let alert = this.alert.create({
            title: 'Atenção!',
            message: 'E-mail já cadastrado, redefina sua senha!',
            buttons: ['OK']
        });
        alert.present();
      }).catch(e => {
        this.service.adduser(usuario).then(status => {
          console.log("2"+status);
            if(status) {
                let alert = this.alert.create({
                    title: 'Sucesso',
                    message: 'Usuário criado, agora voce já pode fazer login! :)',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.setRoot(LoginPage);
            }
         });
      });
    }
  }
}
