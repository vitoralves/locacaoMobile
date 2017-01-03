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
import {OrcamentoProdutosPage} from '../pages/orcamento-produtos/orcamento-produtos';
import {EscolheProdutosPage} from '../pages/modal-escolhe-produtos/modal-escolhe-produtos';
import {PopoverPage} from '../pages/popover/popover-component';
import {PerfilPage} from '../pages/perfil/perfil';
import {ZoomImagemPage} from '../pages/modal-zoom-imagem/modal-zoom-imagem';

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
    ModalNovoOrcamentoPage,
    OrcamentoProdutosPage,
    EscolheProdutosPage,
    PopoverPage,
    PerfilPage,
    ZoomImagemPage
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
    ModalNovoOrcamentoPage,
    OrcamentoProdutosPage,
    EscolheProdutosPage,
    PopoverPage,
    PerfilPage,
    ZoomImagemPage
  ],
  providers: [AuthService]
})
export class AppModule {}
