import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SessionRoutingModule } from './session-routing.module';
import { SessionViewComponent } from './session-view/session-view.component';
import { SessionComponent } from './session.component';
import { InfoViewComponent } from './info-view/info-view.component';
import { TranscriptViewComponent } from './transcript-view/transcript-view.component';
import { InfoViewDataComponent } from './info-view-data/info-view-data.component';
import { InfoViewToolsComponent } from './info-view-tools/info-view-tools.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SessionComponent,
    SessionViewComponent,
    InfoViewComponent,
    TranscriptViewComponent,
    InfoViewDataComponent,
    InfoViewToolsComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    SessionRoutingModule,
    WidgetsModule
  ]
})
export class SessionModule { }
