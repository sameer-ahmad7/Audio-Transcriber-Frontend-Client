import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ""AdminGuard } from 'src/app/guards/""-admin.guard';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard, ""AdminGuard], component: AdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
