import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangePasswordPanelComponent } from './components/change-password-panel/change-password-panel.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { RegisterPanelComponent } from './components/register-panel/register-panel.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './containers/landing/landing.component';
import { ConfirmPanelComponent } from './components/confirm-panel/confirm-panel.component';
import { ResetPanelComponent } from './components/reset-panel/reset-panel.component';




@NgModule({
  declarations: [LandingComponent, LoginPanelComponent, RegisterPanelComponent, ChangePasswordPanelComponent, ConfirmPanelComponent, ResetPanelComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class LandingModule { }
