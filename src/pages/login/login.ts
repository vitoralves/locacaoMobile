import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../autenticacao/authservico';
import {CadastroPage} from '../cadastro/cadastro';
import {TabsPage} from '../tabs/tabs';
import {ToastController, LoadingController, AlertController} from 'ionic-angular';
//import { EmailComposer } from 'ionic-native';
import {Http, Headers, Request, RequestMethod} from '@angular/http';

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

  mailgunUrl: string;
  mailgunApiKey: string;

    constructor(public service: AuthService, public nav: NavController, private toast: ToastController, private loading: LoadingController, private alert:AlertController, private http: Http) {
      this.mailgunUrl = "https://api.mailgun.net/v3/vitor.diogo.live@hotmail.com/messages";
      this.mailgunApiKey = window.btoa("api:key-bdc815acaef659b2cbd2e1d93dae770c"); //windows.btoa=> string codificada na base 64
    }

    login(user) {
      if (user.email == ""){
        this.mostrarToast("Insira seu email!");
      }else if (user.senha == ""){
        this.mostrarToast("Insira sua senha!");
      }else{
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

    redefinirSenha(){
      let a = this.alert.create({
        title: 'Redefinir Senha',
        message: 'Insira seu e-mail cadastrado, enviaremos as orientações para redefinição de senha.',
        inputs: [
          {
            name: 'email',
            placeholder: 'E-mail cadastrado',
          }
        ],
        buttons: [
          {
            text: 'cancelar',
            role: 'cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Redefinir',
            handler: data => {
              var email = data.email;
              this.emailExiste(email).then(data =>{
                var idCliente = data.data.id_cliente;
                console.log(idCliente);
                if(idCliente > 0){
                  let dataAtual = new Date();
                  var novaSenha = (dataAtual.getFullYear()*259)-dataAtual.getMonth()-(dataAtual.getDay()*200);
                  var headers = new Headers();
                  headers.append('Content-Type', 'application/x-www-form-urlencoded');
                  return new Promise(resolve => {
                    this.http.put('http://localhost:3000/api/redefinirSenha/'+idCliente+'/'+novaSenha.toString(), {headers: headers}).subscribe(status => {
                        console.log("status"+status.status);
                        if(status.status == 200){
                          var requestHeaders = new Headers();
                          requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
                          requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                          this.http.request(new Request({
                              method: RequestMethod.Post,
                              url: this.mailgunUrl,
                              body: "from=vitor.diogo.live@hotmail.com&to=" + email + "&subject= Redefinir senha Decoville App" + "&text= A senha foi temporariamente redefinida para "+novaSenha+" entre no aplicativo para escolher uma nova senha.",
                              headers: requestHeaders
                          }))
                          .subscribe(success => {
                            a.dismiss();
                            this.mostrarToast("Enviaremos um e-mail com as informações para redefinir sua senha.");

                          }, error => {
                              console.log("ERROR -> " + JSON.stringify(error));
                              a.dismiss();
                              this.mostrarToast("Erro ao enviar e-mail.");                           
                          });
                            resolve(true);
                        }else{
                          a.dismiss();
                          this.mostrarToast("Não foi possível redefinir senha.");
                          resolve(false);
                        }
                    });
                  });
                }else{
                  a.dismiss();
                  this.mostrarToast("E-mail não cadastrado.");
                }
              });
            }
          }
        ]
      });
      a.present();
    }

    emailExiste(email){
      return this.http.get('http://localhost:3000/api/email/'+email).map(res => res.json()).toPromise();
    }

  }
