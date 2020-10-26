import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { FormsModule, NgForm } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";

import { AngularFireDatabaseModule } from "@angular/fire/database"
import { clientReducer } from './reducers/clients.reducers';
import { ClientEffects } from './effects/clientes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    AngularFireModule.initializeApp(environment.config),
    NgbModule,
    EffectsModule.forRoot([ClientEffects]),
    StoreModule.forRoot({client: clientReducer}),
    FontAwesomeModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
