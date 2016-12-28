import { Component } from '@angular/core';
import {AuthService} from '../autenticacao/authservico';
import { ViewController, NavController, App, ModalController } from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';

@Component({
  templateUrl: 'popover-component.html',
  selector: 'popover-component',
})
export class PopoverPage {

  constructor(
    private viewCtrl: ViewController,
    private nav: NavController,
    private app: App,
    private modal: ModalController,
    public servico: AuthService
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
    this.viewCtrl.dismiss();
    this.servico.logout(this.nav);
  }
}
