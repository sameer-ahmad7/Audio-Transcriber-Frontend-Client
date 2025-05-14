import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SharedModule } from "src/app/shared/shared.module";
import { ThirdPartyModule } from "../../third-party/third-party.module";
import { WidgetsModule } from "../../widgets/widgets.module";
import { RecordingsListItemComponent } from "./recordings-list-item/recordings-list-item.component";
import { RecordingsListComponent } from "./recordings-list/recordings-list.component";
import { RecordingsRoutingModule } from "./recordings-routing.module";
import { RecordingsViewComponent } from "./recordings-view/recordings-view.component";
import { RecordingsComponent } from "./recordings.component";
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    RecordingsComponent,
    RecordingsViewComponent,
    RecordingsListComponent,
    RecordingsListItemComponent,
  ],
  imports: [
    CommonModule,
    RecordingsRoutingModule,
    MatSnackBarModule,
    ThirdPartyModule,
    MatBottomSheetModule,
    MatChipsModule,
    WidgetsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecordingsModule { }
