import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {MoprepsComponent} from './mopreps/mopreps.component';
import {MofitComponent} from './mofit/mofit.component';
import {MospiritComponent} from './mospirit/mospirit.component';
import {MosweetsComponent} from './mosweets/mosweets.component';

const route: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'mopreps',
    component: MoprepsComponent
  },
  {
    path: 'mofit',
    component: MofitComponent
  },
  {
    path: 'mospirit',
    component: MospiritComponent
  },
  {
    path: 'mosweets',
    component: MosweetsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class AppRoutingModule {}
