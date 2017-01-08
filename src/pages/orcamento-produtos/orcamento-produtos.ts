import { Component } from '@angular/core';
import {ModalController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import {EscolheProdutosPage} from '../modal-escolhe-produtos/modal-escolhe-produtos';
import { Http, Headers } from '@angular/http';
import {Funcoes} from '../util/funcoes';


@Component({
  selector: 'page-orcamento-produtos',
  templateUrl: 'orcamento-produtos.html',
  providers: [Funcoes]
})
export class OrcamentoProdutosPage {
  dataInicio;
  dataFim;
  local;
  cidade;
  orcamento;
  produtosList;
  load;

  constructor(private modal: ModalController, private nav: NavParams, private loading: LoadingController, private view: ViewController, private http: Http, private util: Funcoes, private alert: AlertController) {
    this.dataInicio = nav.get("dataInicio");
    this.dataFim = nav.get("dataFim");
    this.local = nav.get("local");
    this.cidade = nav.get("cidade");
    this.orcamento = nav.get("orcamento");
    this.procuraProdutos();
  }

  salvarItensOrcamento(lista){

  }

  insereProduto(){
    let modal = this.modal.create(EscolheProdutosPage);
    modal.onDidDismiss(data =>{
      console.log("dismiss modal");
      this.load = this.loading.create({
        content: 'Aguarde...'
      });
      this.load.present();
      this.procuraProdutos();
    });
    modal.present();
  }

  procuraProdutos(){
    this.http.get('http://52.40.117.136:3000/api/itensOrcamento/'+this.util.retornaIdOrcamento()).map(res => res.json()).subscribe(data => {
      this.produtosList = data.data;
      this.load.dismiss();
    });
  }

  removeritem(item){
    let alert = this.alert.create({
        title: 'Confirmar Exclusão',
        message: 'Você quer realmente excluir o item '+item.nome+'?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Excluir',
            handler: () => {
              var headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');

              return new Promise(resolve => {
                  this.http.put('http://52.40.117.136:3000/api/itensOrcamento/delete/'+item.id_item, {headers: headers}).subscribe(status => {
                      console.log("status"+status.status);
                      if(status.status == 200){
                          this.util.mostrarToast(item.nome+" removido do orçamento.");
                          let index = this.produtosList.indexOf(item);
                          if(index > -1){
                              this.produtosList.splice(index, 1);
                          }
                          resolve(true);
                      }else
                          this.util.mostrarToast("Não foi possível remover este item do orçamento!");
                          resolve(false);
                  });
              });
            }
          }
        ]
      });
      alert.present();
  }

  enviaOrcamento(){
    let alert = this.alert.create({
        title: 'Finalizar Orçamento',
        message: 'Ao finalizar o orçamento ele não poderá mais ser modificado. Tem certeza que deseja enviá-lo?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Enviar',
            handler: () => {
              var headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');

              return new Promise(resolve => {
                  this.http.put('http://52.40.117.136:3000/api/orcamento/confirmar/'+this.util.retornaIdOrcamento(), {headers: headers}).subscribe(status => {
                      console.log("status"+status.status);
                      if(status.status == 200){
                          this.util.mostrarToast("Orçamento enviado! Entraremos em contado, obrigado!");
                          this.view.dismiss();
                          resolve(true);
                      }else
                          this.util.mostrarToast("Não foi possível remover este item do orçamento!");
                          resolve(false);
                  });
              });
            }
          }
        ]
      });
      alert.present();
  }

  cancelarOrcamento(){
    let alert = this.alert.create({
        title: 'Cancelar Orçamento',
        message: 'Têm certeza que deseja cancelar este orçamento? O progesso será perdido.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              var headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');

              return new Promise(resolve => {
                  this.http.put('http://52.40.117.136:3000/api/orcamento/cancelar/'+this.util.retornaIdOrcamento(), {headers: headers}).subscribe(status => {
                      console.log("status"+status.status);
                      if(status.status == 200){
                          this.util.mostrarToast("Orçamento cancelado!");
                          this.view.dismiss();
                          resolve(true);
                      }else
                          this.util.mostrarToast("Não foi possível cancelar esse orçamento!");
                          resolve(false);
                  });
              });
            }
          }
        ]
      });
      alert.present();
  }
}
