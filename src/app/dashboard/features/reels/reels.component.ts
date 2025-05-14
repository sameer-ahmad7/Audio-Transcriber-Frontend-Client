import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteReelEvent, EditReelEvent } from 'src/app/models';
import { SizzleReel, UpdateReel } from 'src/app/models/sizzlereel';
import { RootStoreState } from 'src/app/store';
import { ReelStoreActions, ReelStoreSelectors } from 'src/app/store/reel';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { EditReelComponent } from './edit-reel/edit-reel.component';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.scss']
})
export class ReelsComponent implements OnInit {

  Reels$: Observable<SizzleReel[]> = this.store$.select(ReelStoreSelectors.selectAllReels);

  ReelDeleting$: Observable<boolean> = this.store$.select(ReelStoreSelectors.selectReelDeleting);

  ReelUpdating$: Observable<boolean> = this.store$.select(ReelStoreSelectors.selectReelUpdating);

  constructor(private store$: Store<RootStoreState.RootState>,
    private modalSvc: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  DeleteReel(ev: DeleteReelEvent) {
    let cancelModal = this.modalSvc.open(CancelDialogComponent, { centered: true });
    cancelModal.componentInstance.Title = "Delete Reel";
    cancelModal.componentInstance.Message = "Are you sure you want to delete this reel?";
    cancelModal.result.then(result => {
      this.store$.dispatch(new ReelStoreActions.DeleteReelAction({ reelId: ev.ReelId }));
    }).catch(err => console.log(err));

  }

  EditReel(ev: EditReelEvent) {
    let editModal = this.modalSvc.open(EditReelComponent, { centered: true });
    editModal.componentInstance.Reel$ = this.store$.select(ReelStoreSelectors.selectReelById(ev.ReelId));
    editModal.result.then((result: UpdateReel) => {
      if (result) {
        console.log(result);
        this.store$.dispatch(new ReelStoreActions.UpdateReelRequestAction({ reel: result, reelId: ev.ReelId }));
      }
    }).catch(err => console.log(err));
  }

}
