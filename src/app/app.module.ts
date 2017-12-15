import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      maxOpened: 4,
      autoDismiss: true,
      positionClass: 'toast-bottom-full-width'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
