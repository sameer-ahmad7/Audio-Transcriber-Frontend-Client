import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThirdPartyModule } from '../../third-party/third-party.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileComponent, ProfileViewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ThirdPartyModule,
    SharedModule,
  ],
})
export class ProfileModule { }
