import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PhonesComponent } from './phones/phones.component';
import { PonudeComponent } from './ponude/ponude.component';
import { PreporukeComponent } from './preporuke/preporuke.component';
import { OnamaComponent } from './onama/onama.component';
import { PhonesComponent } from './phones/phones.component';
import { ReactiveFormsModule } from '@angular/forms'; //za validaciju
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'ponuda', component: PonudeComponent },
  { path: 'preporuka', component: PreporukeComponent },
  // { path: 'navbar', component: NavbarComponent },
  { path: 'onama', component: OnamaComponent },
  { path: 'phones', component: PhonesComponent },
  { path: '', redirectTo: '/phones', pathMatch:'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
