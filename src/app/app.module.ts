import { NgModule } from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { OrcamentoPage } from '../pages/orcamento/orcamento';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalProdutoPage } from '../pages/modal-produto/modal-produto';
import { ModalNovoOrcamentoPage } from '../pages/modal-novo-orcamento/modal-novo-orcamento';
import {LoginPage} from '../pages/login/login'
import {CadastroPage} from '../pages/cadastro/cadastro';
import {AuthService} from '../pages/autenticacao/authservico';

@NgModule({
  declarations: [
    MyApp,
    OrcamentoPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalProdutoPage,
    LoginPage,
    CadastroPage,
    ModalNovoOrcamentoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrcamentoPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalProdutoPage,
    LoginPage,
    CadastroPage,
    ModalNovoOrcamentoPage
  ],
  providers: [AuthService]
})
export class AppModule {}
