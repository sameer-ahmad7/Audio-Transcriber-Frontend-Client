import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[appCopyText]'
})
export class CopyTextDirective {
  @Output("copied")
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ["$event"]) onClick(event: MouseEvent) {
    event.preventDefault();

    let listener = (e: ClipboardEvent) => {
      let payload = this.el.nativeElement.textContent
      let clipboard = e.clipboardData || window["clipboardData"]
      clipboard.setData("text", payload);
      e.preventDefault();
      this.copied.emit(payload);
    }

    this.el.nativeElement.textContent
    document.addEventListener("copy", listener, false);
    document.execCommand("copy");
    document.removeEventListener("copy", listener, false);

    let oldColor = this.el.nativeElement.style.backgroundColor
    this.el.nativeElement.style.backgroundColor = 'yellow';
    timer(1000).subscribe(_ => this.el.nativeElement.style.backgroundColor = oldColor);
    document.execCommand('copy');
  }
  constructor(private el: ElementRef<HTMLElement>) {
  }

}
