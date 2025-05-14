import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  constructor() { }

  private dragCount = 0;

  @Output()
  readonly FdDragOver: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  readonly FdDragEnter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  readonly FdDragLeave: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  readonly FdFileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();

  @HostListener('dragover', ['$event'])
  public processDragOver(ev: Event): void {
    this._preventAndStop(ev);
    this.FdDragOver.emit(true);
  }

  @HostListener('dragenter', ['$event'])
  public processDragEnter(ev: Event): void {
    ++this.dragCount;
    this._preventAndStop(ev);
    this.FdDragEnter.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public processDragLeave(ev: Event): void {
    --this.dragCount;
    this._preventAndStop(ev);
    if (this.dragCount < 1) {
      this.FdDragLeave.emit(true);
    }
  }

  @HostListener('drop', ['$event'])
  public processDrop(ev): void {
    this.dragCount = 0;
    this._preventAndStop(ev);
    const files: File[] = [];

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (const item of ev.dataTransfer.items) {
        files.push(item.getAsFile());
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      files.push(...ev.dataTransfer.files);
    }

    this.FdFileDrop.emit(files);
    this.FdDragLeave.emit(true);
  }
  //
  // Stops the drag/drop events propagating
  //
  private _preventAndStop(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

}
