import { Component, ViewContainerRef, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as details from '../assets/json/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public toastr: ToastsManager, vcr: ViewContainerRef) {

    // setando notificaçao
    this.toastr.setRootViewContainerRef(vcr);
  }

  // form
  public form = {
    cardNumber: '',
    name: '',
    month: '',
    year: '',
    cardCode: ''
  };

  // variaveis
  public data: any = null;

  public allowForm = true;
  public buttonText: String = 'Formas de pagamento';

  public selectedPlan: object;
  public selectedView = 'plans';

  // mascara de numero de cartao
  public maskCard =  [ /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskCardCode = [ /[0-9]/, /[0-9]/, /[0-9]/];
  public maskTwoDigits = [ /[0-9]/, /[0-9]/];

  // carregamento inicial, busca dados para preenchimento da modal
  ngOnInit() {

    this.getData();
  }

  // leitura do json
  getData() {

    this.data = details;

    if (!this.data.plans) {
      this.allowForm = false;
      this.buttonText = 'Tente novamente mais tarde';
      this.toastr.error('Erro ao carregar formas de pagamento. Tente novamente mais tarde.', 'Oops!');
    }
    else {
      this.setPlan(this.data.plans[0]);
      this.selectedView = 'plans';
      // this.toastr.success('Dados carregados com sucesso.');
    }

  }

  // seleciona um plano de pagamento
  setPlan(_selected) {

    _selected.price.customTotal = _selected.price.integer  + '.' + _selected.price.decimal;
    _selected.price.customTotal = +_selected.price.customTotal;
    _selected.price.parcel = _selected.name.substr(0, 1);
    _selected.price.parcel = +_selected.price.parcel;

    _selected.price.customTotal =  (Math.ceil((_selected.price.customTotal * _selected.price.parcel) * 100) / 100).toFixed(2);

      this.selectedPlan = _selected;
  }

  // troca de visao dentro da modal : visoes: 'plans','payment', 'final'
  changeView(_viewName) {

    this.selectedView = _viewName;

    // limpa formulario
    if (_viewName === 'plans') {
     this.form = {
        cardNumber: '',
        name: '',
        month: '',
        year: '',
        cardCode: ''
      };
    }

    // finaliza a acao
    if (_viewName === 'final') {
      this.allowForm = false;
      this.buttonText = 'Obrigado pela sua assinatura!';
    }
  }

  // valida o formulario e seus campos
  validateForm () {

    if ( this.form.cardNumber === '' ||  this.form.cardNumber.indexOf('_') !== -1 ) {

      this.toastr.warning('Insira um número de cartão válido.');
      return;
    }

    const thisMonth = new Date().getMonth() + 1;
    const thisYear = Number(String(new Date().getFullYear() ).substr(2, 2 ));

    if ( this.form.month === '') {

      this.toastr.warning('Mês é obrigatório.');
      return;
    }

    if ( Number(this.form.month) < 1 || Number(this.form.month) > 12) {

      this.toastr.warning('Mês inválido.');
      return;
    }

    if ( this.form.year === '') {

      this.toastr.warning('Ano é obrigatório.');
      return;
    }

    if ( Number(this.form.year)  < thisYear) {

      this.toastr.warning('Ano selecionado é menor que o ano atual.');
      return;
    }

    if ( Number(this.form.year) === thisYear && Number(this.form.month) < thisMonth ) {

      this.toastr.warning('Mês selecionado é menor que o mês atual.');
      return;
    }

    if ( this.form.name === '') {

      this.toastr.warning('Titular do cartão é um campo obrigatório.');
      return;
    }

    if ( this.form.cardCode === '' || this.form.cardNumber.length < 3) {

      this.toastr.warning('Insira o código de segurança do cartão.');
      return;
    }

    this.changeView('final');
  }
}
