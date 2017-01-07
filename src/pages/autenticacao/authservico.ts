import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ToastController,Platform, AlertController} from 'ionic-angular';

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;
    email;

    constructor(public http: Http, private toast: ToastController, private platform: Platform, private alert: AlertController) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(idCliente) {
        window.localStorage.setItem('usuario', idCliente);
        this.useCredentials(idCliente);
    }

    useCredentials(token) {
        //esse token é o id do cliente
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    loadUserCredentials() {
        //resgata o id_cliente que está salvo como token
        var token = window.localStorage.getItem('usuario');
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }

    autenticar(user) {
        var creds = user.email+"/"+user.senha;
        return this.http.get('http://52.40.117.136:3000/api/auth/'+ creds).map(res => res.json()).toPromise();
    }

    adduser(usuario) {
        this.checarInternet();
        var creds = usuario.nome + "/" + usuario.sobrenome + "/" + usuario.email + "/" + usuario.senha;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.put('http://52.40.117.136:3000/api/add/'+creds, {headers: headers}).subscribe(status => {
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
      return this.http.get('http://52.40.117.136:3000/api/email/'+ email).map(res => res.json()).toPromise();
    }

    checarInternet() {

    }

    retornaIdCliente(){
      this.loadUserCredentials();
      return this.AuthToken;
    }

    emailClienteLogado(){
      console.log("email: "+this.email);
      return this.email;
    }
}
