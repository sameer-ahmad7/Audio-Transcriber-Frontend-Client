import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CopyTextDirective } from './directives/copy-text.directive';
import { FileDropDirective } from './directives/file-drop.directive';
import { BytesPipe } from './pipes/bytes.pipe';
import { ToastComponent } from './components/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CopyTextDirective, FileDropDirective, BytesPipe, ToastComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    ToastComponent,
    CopyTextDirective,
    FileDropDirective,
    BytesPipe,
  ]
})
export class SharedModule {
  constructor() {

  }
}
