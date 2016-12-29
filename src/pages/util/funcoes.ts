import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class Funcoes {

  constructor(private toast:ToastController){}

  salvaStatusOrcamento(status){
    window.localStorage.setItem('novoOrcamento', status);
  }

  retornaStatusOrcamento(){
    var statusOrc = window.localStorage.getItem('novoOrcamento');
    if(statusOrc == 'true'){
      return true;
    }else{
      return false;
    }
  }

  salvaListaProdutos(lista){
    console.log("salva lista "+lista);
    window.localStorage.setItem('produtos', lista);
  }

  retornaListaProdutos(){
    console.log("retorna lista produtos "+window.localStorage.getItem('produtos'));
    return window.localStorage.getItem('produtos');
  }

  mostrarToast(mensagem){
    let toast = this.toast.create({
          message: mensagem,
          duration: 3000
        });
        toast.present();
  }

  salvaIdOrcamento(orc){
    window.localStorage.setItem('id_orcamento', orc);
  }

  retornaIdOrcamento(){
    return window.localStorage.getItem('id_orcamento');
  }
}
