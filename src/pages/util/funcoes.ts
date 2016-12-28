import {Injectable} from '@angular/core';

@Injectable()
export class Funcoes {

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

}
