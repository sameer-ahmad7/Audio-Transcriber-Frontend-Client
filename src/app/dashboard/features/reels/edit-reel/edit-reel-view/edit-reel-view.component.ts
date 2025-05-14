import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelDialogComponent } from 'src/app/dashboard/widgets/compose-reel/cancel-dialog/cancel-dialog.component';
import { DeleteSnippetEvent, SaveSnippetEvent } from 'src/app/models';
import { SizzleReel, Snippet, UpdateReel } from 'src/app/models/sizzlereel';

@Component({
  selector: 'app-edit-reel-view',
  templateUrl: './edit-reel-view.component.html',
  styleUrls: ['./edit-reel-view.component.scss']
})
export class EditReelViewComponent implements OnInit {

  @Input() Reel: SizzleReel;
  @Input() SnippetDeleting: boolean;
  @Output() saveSnippet: EventEmitter<SaveSnippetEvent> = new EventEmitter();
  @Output() deleteSnippet: EventEmitter<DeleteSnippetEvent> = new EventEmitter();

  Snippets: Snippet[];

  constructor(public modal: NgbActiveModal, private modalSvc: NgbModal, private fb: FormBuilder) { }

  editReelForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    notes: ['', Validators.required]
  });


  ngOnInit(): void {
    if (this.Reel) {
      this.Reel = { ...this.Reel };
      this.editReelForm.patchValue({
        name: this.Reel.Name,
        notes: this.Reel.Notes
      })
    }

    if (this.Reel?.Snippets) {
      this.Snippets = [...this.Reel?.Snippets];
    }

  }

  ChangeOrder(event: CdkDragDrop<{ id: string, title: string, description: string }[]>) {
    moveItemInArray(this.Snippets, event.previousIndex, event.currentIndex);
  }

  SaveSnippet(snippet: Snippet) {
    this.saveSnippet.emit({ Snippet: snippet });
  }

  DeleteSnippet(snippet: Snippet, index: number) {
    let cancelModal = this.modalSvc.open(CancelDialogComponent, { centered: true });
    cancelModal.componentInstance.Title = "Delete Snippet";
    cancelModal.componentInstance.Message = "Are you sure you want to delete this snippet?";
    cancelModal.result.then(result => {
      console.log(result);
      let updatedSnippets = [...this.Reel.Snippets];
      updatedSnippets.splice(index, 1);
      let updatedReel = { ...this.Reel };
      updatedReel.Snippets = updatedSnippets;
      this.deleteSnippet.emit({ SnippetId: snippet.SnippetId, Reel: updatedReel });
    }).catch(err => console.log(err));

  }
  EditReel() {
    let snippetOrder = this.Snippets?.map(snippet => snippet?.SessionId);
    console.log(snippetOrder);
    let updateReel: UpdateReel = {
      SnippetOrder: snippetOrder,
      Name: this.editReelForm.value.name,
      Notes: this.editReelForm.value.notes
    }
    this.modal.close(updateReel);
  }


}
