import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { ReelDetailsComponent } from './reel-details/reel-details.component';

import { ReelsComponent } from './reels.component';

const routes: Routes = [
  {
    path: '', component: ReelsComponent
  },
  {
    path: ':key', component: ReelDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReelsRoutingModule { }
