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
    window.localStorage.setItem('produtos', lista);
  }

  retornaListaProdutos(){
    return window.localStorage.getItem('produtos');
  }

}
