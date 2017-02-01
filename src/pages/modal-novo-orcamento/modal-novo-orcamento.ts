import { Component } from '@angular/core';
import {ToastController, ModalController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../autenticacao/authservico';
import {Funcoes} from '../util/funcoes';
import {OrcamentoProdutosPage} from '../orcamento-produtos/orcamento-produtos';

@Component({
  selector: 'page-modal-novo-orcamento',
  templateUrl: 'modal-novo-orcamento.html',
  providers: [Funcoes]
})
export class ModalNovoOrcamentoPage {

  orcNovo = {
    endereco: '',
    localEvento: '',
    cidade: '',
    dataEvento: new Date().toISOString(),
    dataDevolucao: new Date().toISOString(),
    dataEntrega: new Date().toISOString(),
    cliente: '',
    situacao: '',
    ativo: true
  }

  id_orcamento;
  id_produto_catalogo;
  quantidade_catalogo;

  constructor(public modal: ModalController, public nav: NavParams, private viewCtrl: ViewController,
    private toast: ToastController, private funcao: Funcoes, private http: Http, private service: AuthService, private loading: LoadingController) {
      this.id_produto_catalogo = nav.get("produto");
      this.quantidade_catalogo = nav.get("quantidade");
    }

  criarOrcamento(){
    let l = this.loading.create({
      content: 'Aguarde...'
    });
    l.present();
    //Cria um novo orçamento para cliente
    //this.funcao.salvaStatusOrcamento(true); //modifica status orcamento, agora temos um em aberto
    //preenche dados restantes do orcamento
    this.orcNovo.cliente = this.service.retornaIdCliente();
    this.orcNovo.situacao = 'PENDENTE';
    if (this.orcNovo.endereco == ''){
      this.orcNovo.endereco = null;
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var stringInsert = this.orcNovo.cliente+"/"+this.orcNovo.dataEvento+"/"+this.orcNovo.dataDevolucao+"/"+this.orcNovo.localEvento+"/"+this.orcNovo.situacao+"/"+this.orcNovo.cidade+"/"+this.orcNovo.ativo+"/"+this.orcNovo.endereco+"/"+this.orcNovo.dataEntrega;
    this.http.get('http://localhost:3000/api/orcamento/add/'+stringInsert).map(res => res.json()).subscribe(data => {
        this.id_orcamento = data.data;
        console.log(this.id_orcamento[0].id_orcamento);
        if(this.id_orcamento[0].id_orcamento > 0){
            this.funcao.salvaIdOrcamento(this.id_orcamento[0].id_orcamento);
            this.mostrarToast("Novo orçamento criado!");
            this.fecharModal();
            //se condição for satisfeita usuário vem do catálogo e quer inserir um produto em um novo orçamento
            if (this.id_produto_catalogo > 0){
              this.insereProdutoOrcamento();
            }
            l.dismiss();// fecha o loading
            let modal = this.modal.create(OrcamentoProdutosPage, {dataEntrega: this.orcNovo.dataEntrega, dataDevolucao: this.orcNovo.dataDevolucao, local: this.orcNovo.localEvento, cidade:this.orcNovo.cidade, orcamento: this.id_orcamento[0].id_orcamento});
            modal.present();
        }else{
          l.dismiss();
          this.mostrarToast("Não foi possível criar um novo orçamento!");
        }
    });
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  mostrarToast(mensagem){
    let toast = this.toast.create({
          message: mensagem,
          duration: 3000
        });
        toast.present();
  }

  insereProdutoOrcamento(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve => {
      var stringAdd = this.id_produto_catalogo+"/"+this.quantidade_catalogo+"/"+this.funcao.retornaIdOrcamento()
      this.http.put('http://localhost:3000/api/itemOrcamento/add/'+stringAdd, {headers: headers}).subscribe(status => {
       console.log("status"+status.status);
         if(status.status == 200){
           this.mostrarToast("Produto "+this.id_produto_catalogo+" adicionado ao orçamento.");
           resolve(true);
         }else
           this.mostrarToast("Não foi possível adicionar o produto ao orçamento!");
           resolve(false);
         });
    });
  }

}
