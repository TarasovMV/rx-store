import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RX_STORE_SCOPE} from './library/rx-store.injector';
import {RxStoreService} from './library/rx-store.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RxStoreService, {provide: RX_STORE_SCOPE, useValue: 'app module'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
