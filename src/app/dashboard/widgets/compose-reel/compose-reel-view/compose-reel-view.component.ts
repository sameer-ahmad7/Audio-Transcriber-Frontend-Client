import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeSnippetNameEvent, CreateReelEvent, SnippetDropEvent } from 'src/app/models';
import { SizzleReel, Snippet } from 'src/app/models/sizzlereel';
import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';
import { SelectReelDialogComponent } from '../select-reel-dialog/select-reel-dialog.component';

@Component({
  selector: 'app-compose-reel-view',
  templateUrl: './compose-reel-view.component.html',
  styleUrls: ['./compose-reel-view.component.scss']
})
export class ComposeReelViewComponent implements OnInit {

  @Output() changeSnippetName: EventEmitter<ChangeSnippetNameEvent> = new EventEmitter();
  @Output() createReel: EventEmitter<CreateReelEvent> = new EventEmitter();
  @Output() dropSnippet: EventEmitter<SnippetDropEvent> = new EventEmitter();
  @Output() clearSnippets: EventEmitter<any> = new EventEmitter();
  @Input() currentTennant: string;
  @Input() Snippets: Snippet;
  @Input() OpenReels: SizzleReel[];
  @Input() ReelCreating: boolean;

  Reel: SizzleReel;

  newReelForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    notes: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private modalSvc: NgbModal) { }

  ngOnInit(): void {
    if (this.OpenReels?.length > 0) {
      //Open select modal
      let openReelsModal = this.modalSvc.open(SelectReelDialogComponent, { centered: true, backdrop: 'static' });
      openReelsModal.componentInstance.OpenReels = this.OpenReels;
      openReelsModal.result.then((result: { reelId: string; isNewReel: boolean }) => {
        if (result) {
          if (result.reelId) {
            this.Reel = this.OpenReels.find(reel => reel.ReelId === result.reelId);
          }
        }
      })
    }
  }

  Drop(event: CdkDragDrop<{ id: string, title: string, description: string }[]>) {
    this.dropSnippet.emit({ PreviousIndex: event.previousIndex, CurrentIndex: event.currentIndex });
  }

  CancelReel() {
    let cancelModal = this.modalSvc.open(CancelDialogComponent, { centered: true });
    cancelModal.result.then(result => {
      this.clearSnippets.emit();
    }).catch(err => console.log(err));
  }


  ChangeSnippetName(snippetName: string, index: number) {
    snippetName = snippetName?.trim();
    if (snippetName) {
      this.changeSnippetName.emit({ SnippetName: snippetName, Index: index });
    }
  }

  UpsertReel(snippets: Snippet[]) {
    this.createReel.emit({ Reel: this.Reel, Snippets: snippets, Name: this.newReelForm.value.name, Notes: this.newReelForm.value.notes, CurrentTennantId: this.currentTennant });
  }

}
