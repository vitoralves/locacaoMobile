import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../autenticacao/authservico';
import {CadastroPage} from '../cadastro/cadastro';
import {TabsPage} from '../tabs/tabs';
import {ToastController, LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'login.html',
  providers: [AuthService],
  selector: 'page-login'
})
export class LoginPage {
  usuario: any;
  usercreds = {
    email: '',
    senha: ''
  }

    constructor(public service: AuthService, public nav: NavController, private toast: ToastController, private loading: LoadingController) {}

        login(user) {
          let l = this.loading.create({
            content: 'Autenticando...'
        });
        l.present();

        this.service.autenticar(user).then(data => {
            this.usuario = data.data;
            //salva id do cliente logado
            this.service.storeUserCredentials(data.data.id_cliente);
            if(this.usuario.id_cliente > 0) {
              l.dismiss();
              this.nav.setRoot(TabsPage);
            }
         }).catch(e => {
             console.log("não encontrado "+e);
             l.dismiss();
             this.mostrarToast("Usuário não encontrado!");
           });
    }

    registrar() {
        this.nav.push(CadastroPage);
    }

    mostrarToast(mensagem){
      let toast = this.toast.create({
            message: mensagem,
            duration: 3000
          });
          toast.present();
    }
}
