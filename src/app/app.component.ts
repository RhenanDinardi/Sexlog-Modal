import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import * as details from '../assets/json/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private toastr: ToastrService) {}

  // variaveis
  public data: any = null;

  // carregamento inicial, busca dados para preenchimento da modal
  ngOnInit() {

    this.getData();
  }

  // leitura do json
  getData() {

    this.data = details;

    if (!this.data.plans) {
      console.log('no data');
      this.toastr.error('Ocorreu um erro ao carregar as formas de pagamento.');
    }
    else {
      console.log(this.data.plans);
      this.toastr.success('Formas de pagamento carregadas com sucesso.');
    }

  }
}
