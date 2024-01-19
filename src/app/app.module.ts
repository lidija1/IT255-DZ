import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhonesComponent } from './phones/phones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnamaComponent } from './onama/onama.component';
import { PreporukeComponent } from './preporuke/preporuke.component';
import { PonudeComponent } from './ponude/ponude.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { taskReducer } from './task/task.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './task/task.effects';


@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    OnamaComponent,
    PreporukeComponent,
    PonudeComponent,
    NavbarComponent,
    PhoneListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
