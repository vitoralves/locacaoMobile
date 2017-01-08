import { Component } from '@angular/core';
import {AuthService} from '../autenticacao/authservico';
import { ViewController, NavController, App, ModalController, AlertController, Platform } from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';

@Component({
  selector: 'popover-component',
  templateUrl: 'popover-component.html'  
})
export class PopoverPage {

  constructor(
    private viewCtrl: ViewController,
    private nav: NavController,
    private app: App,
    private modal: ModalController,
    public servico: AuthService,
    private alert: AlertController,
    private platform: Platform
  ) { }

  abrePerfil() {
    this.viewCtrl.dismiss();
    let modal = this.modal.create(PerfilPage);
    modal.present();
  }

  abreSobre() {
    this.viewCtrl.dismiss();
  }

  sair() {
    let alert = this.alert.create({
    title: 'Confirmar Logout',
    message: 'Você realmente quer fechar o aplicativo?',
    buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.servico.logout();
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
