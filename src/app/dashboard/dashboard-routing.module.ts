import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ""AdminGuard } from '../guards';
import { AuthInterceptorService } from '../interceptors/auth-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComposeReelComponent } from './widgets/compose-reel/compose-reel.component';



const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class DashboardRoutingModule { }
