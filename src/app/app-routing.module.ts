import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PhonesComponent } from './phones/phones.component';
import { PonudeComponent } from './ponude/ponude.component';
import { PreporukeComponent } from './preporuke/preporuke.component';
import { OnamaComponent } from './onama/onama.component';
import { PhonesComponent } from './phones/phones.component';
import { ReactiveFormsModule } from '@angular/forms'; //za validaciju

const routes: Routes = [
  { path: 'ponuda', component: PonudeComponent },
  { path: 'preporuka', component: PreporukeComponent },
  { path: 'onama', component: OnamaComponent },
  { path: 'phones', component: PhonesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
