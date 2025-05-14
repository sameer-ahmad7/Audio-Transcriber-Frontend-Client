import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { TranscriptsListComponent } from './transcripts-list/transcripts-list.component';
import { TranscriptsRoutingModule } from './transcripts-routing.module';
import { TranscriptsViewComponent } from './transcripts-view/transcripts-view.component';
import { TranscriptsComponent } from './transcripts.component';
import { TranscriptsListItemComponent } from './transcripts-list-item/transcripts-list-item.component';



@NgModule({
  declarations: [TranscriptsComponent, TranscriptsViewComponent, TranscriptsListComponent, TranscriptsListItemComponent],
  imports: [
    CommonModule,
    TranscriptsRoutingModule,
    WidgetsModule
  ]
})
export class TranscriptsModule { }
