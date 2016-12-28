import { Component } from '@angular/core';
import {ToastController, ModalController, NavParams, ViewController } from 'ionic-angular';
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
    localEvento: '',
    cidade: '',
    dataInicio: '',
    dataFim: '',
    cliente: '',
    situacao: ''
  }

  constructor(public modal: ModalController, public nav: NavParams, private viewCtrl: ViewController,
    private toast: ToastController, private funcao: Funcoes, private http: Http, private service: AuthService) {}

  criarOrcamento(){
    //Cria um novo orçamento para cliente
    this.funcao.salvaStatusOrcamento(true); //modifica status orcamento, agora temos um em aberto
    //preenche dados restantes do orcamento
    this.orcNovo.cliente = this.service.retornaIdCliente();
    this.orcNovo.situacao = 'PENDENTE';

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(this.orcNovo);
    var stringInsert = this.orcNovo.cliente+"/"+this.orcNovo.dataInicio+"/"+this.orcNovo.dataFim+"/"+this.orcNovo.localEvento+"/"+this.orcNovo.situacao+"/"+this.orcNovo.cidade;
    return new Promise(resolve => {
        this.http.put('http://localhost:3000/api/orcamento/add/'+stringInsert, {headers: headers}).subscribe(status => {
            console.log("status"+status.status);
            if(status.status == 200){
                resolve(true);
                this.mostrarToast("Novo orçamento criado!");
                this.fecharModal();
                let modal = this.modal.create(OrcamentoProdutosPage, {dataInicio: this.orcNovo.dataInicio, dataFim: this.orcNovo.dataFim, local: this.orcNovo.localEvento, cidade:this.orcNovo.cidade});
                modal.present();
            }else
                resolve(false);
        });
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

}
