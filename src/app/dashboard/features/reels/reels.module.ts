import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReelsRoutingModule } from './reels-routing.module';
import { ReelsComponent } from './reels.component';
import { ReelListComponent } from './reel-list/reel-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ReelDetailsComponent } from './reel-details/reel-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditReelComponent } from './edit-reel/edit-reel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { EditReelViewComponent } from './edit-reel/edit-reel-view/edit-reel-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ReelsComponent, ReelListComponent, ReelDetailsComponent, EditReelComponent, CancelDialogComponent, EditReelViewComponent],
  imports: [
    CommonModule,
    ReelsRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule,
    WidgetsModule
  ],
  entryComponents: [EditReelComponent, CancelDialogComponent]
})
export class ReelsModule { }
