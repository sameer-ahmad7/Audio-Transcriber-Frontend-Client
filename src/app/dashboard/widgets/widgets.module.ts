import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxStripeModule } from "ngx-stripe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ThirdPartyModule } from "../third-party/third-party.module";
import { DropZoneComponent } from "./drop-zone/drop-zone.component";
import { LoadingSplashComponent } from "./loading-splash/loading-splash.component";
import { SessionActionsComponent } from "./session-actions/session-actions.component";
import { SessionFlagsComponent } from "./session-flags/session-flags.component";
import { SessionLabelComponent } from "./session-label/session-label.component";
import { SidebarViewComponent } from "./sidebar/sidebar-view/sidebar-view.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UploadSessionsComponent } from "./upload-sessions/upload-sessions.component";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { environment } from "src/environments/environment";
import { AddPaymentComponent } from "./add-payment/add-payment.component";
import { PaymentListComponent } from './payment-list/payment-list.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { ComposeReelComponent } from './compose-reel/compose-reel.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { CancelDialogComponent } from './compose-reel/cancel-dialog/cancel-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StarToggleComponent } from './star-toggle/star-toggle.component';
import { ComposeReelViewComponent } from './compose-reel/compose-reel-view/compose-reel-view.component';
import { SelectReelDialogComponent } from './compose-reel/select-reel-dialog/select-reel-dialog.component';





@NgModule({
  declarations: [
    LoadingSplashComponent,
    SessionFlagsComponent,
    SessionLabelComponent,
    SidebarComponent,
    SidebarViewComponent,
    SessionActionsComponent,
    UploadSessionsComponent,
    DropZoneComponent,
    PaymentMethodComponent,
    AddPaymentComponent,
    PaymentListComponent,
    ComposeReelComponent,
    CancelDialogComponent,
    SearchBarComponent,
    StarToggleComponent,
    ComposeReelViewComponent,
    SelectReelDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    DragDropModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripePublishableKey),
    ThirdPartyModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    SharedModule,
  ],
  exports: [
    ThirdPartyModule,
    SearchBarComponent,
    LoadingSplashComponent,
    SessionFlagsComponent,
    SessionLabelComponent,
    SidebarComponent,
    PaymentMethodComponent,
    SessionActionsComponent,
    DropZoneComponent,
    StarToggleComponent
  ],
  entryComponents: [CancelDialogComponent]
})
export class WidgetsModule { }
