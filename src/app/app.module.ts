import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// componente de notificaçao
import {ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './custom-options';

// mascara de campos
import { TextMaskModule } from 'angular2-text-mask';

// animaçoes
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TextMaskModule,
    ToastModule.forRoot()
  ],
  providers: [{provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule { }
