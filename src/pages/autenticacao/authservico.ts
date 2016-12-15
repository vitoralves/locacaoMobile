import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ToastController,Platform, AlertController} from 'ionic-angular';


declare var navigator: any;
declare var Connection: any;

@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;
    cliente: any;

    constructor(public http: Http, private toast: ToastController, private platform: Platform, private alert: AlertController) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(token) {
        window.localStorage.setItem('usuario', token);
        this.useCredentials(token);

    }

    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('usuario');
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }

    autenticar(user) {
      this.checarInternet();
      if (user.email == ""){
        this.mostrarToast("Insira seu email!");
      }else if (user.senha == ""){
        this.mostrarToast("Insira sua senha!");
      }else{
        var creds = user.email+"/"+user.senha;
        return this.http.get('http://localhost:3000/api/auth/'+ creds).map(res => res.json()).toPromise();
      }
    }

    adduser(usuario) {
        this.checarInternet();
        var creds = usuario.nome + "/" + usuario.sobrenome + "/" + usuario.email + "/" + usuario.senha;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post('http://localhost:3000/api/add/'+creds, {headers: headers}).subscribe(status => {
                console.log("status"+status.status);
                if(status.status == 200){
                    resolve(true);
                }else
                    resolve(false);
            });
        });
    }

    mostraAlert(){
      let alert = this.alert.create({
          title: 'Atenção!',
          message: 'Verifique conexão com internet!',
          buttons: ['OK']
      });
      alert.present();
    }

    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log(this.AuthToken);
            headers.append('Authorization', 'Bearer ' +this.AuthToken);
            this.http.get('http://localhost:3333/getinfo', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }


    logout() {
        this.destroyUserCredentials();
    }

    mostrarToast(mensagem){
      let toast = this.toast.create({
            message: mensagem,
            duration: 3000
          });
          toast.present();
    }

    emailCadastrado(email){
      return this.http.get('http://localhost:3000/api/email/'+ email).map(res => res.json()).toPromise();
    }

    checarInternet() {

    }
}
