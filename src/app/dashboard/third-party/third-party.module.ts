import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { NgbModalModule, NgbModule, NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbNavModule,
    NgbProgressbarModule,
  ],
  exports: [
    FontAwesomeModule,
    NgbModule,
    NgbModalModule,
    NgbNavModule,
    NgbProgressbarModule,
  ]
})
export class ThirdPartyModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fad, fal, far);
  }
}
