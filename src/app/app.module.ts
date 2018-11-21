import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu/menu.component';
import { MenuButtonComponent } from './menu/menu-button/menu-button.component';
import { AboutComponent } from './about/about.component';
import { MoprepsComponent } from './mopreps/mopreps.component';
import { MofitComponent } from './mofit/mofit.component';
import { MospiritComponent } from './mospirit/mospirit.component';
import { MosweetsComponent } from './mosweets/mosweets.component';
import {ModalContentComponent, SignupComponent} from './signup/signup.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    MenuButtonComponent,
    AboutComponent,
    ModalContentComponent,
    MoprepsComponent,
    MofitComponent,
    MospiritComponent,
    MosweetsComponent,
    SignupComponent,
    PurchaseFormComponent,
    PaymentRequestComponent,
  ],
  entryComponents: [ModalContentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
