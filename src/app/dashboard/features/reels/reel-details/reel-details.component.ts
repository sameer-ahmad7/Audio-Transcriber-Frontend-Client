import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skip, take, tap } from 'rxjs/operators';
import { SizzleReel, UpdateReel } from 'src/app/models/sizzlereel';
import { ToastService } from 'src/app/shared/components/toast.service';
import { RootStoreState } from 'src/app/store';
import { ReelStoreActions, ReelStoreSelectors } from 'src/app/store/reel';
import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';
import { EditReelComponent } from '../edit-reel/edit-reel.component';

@Component({
  selector: 'app-reel-details',
  templateUrl: './reel-details.component.html',
  styleUrls: ['./reel-details.component.scss']
})
export class ReelDetailsComponent implements OnInit {

  private reelId: string;

  Reel$: Observable<SizzleReel>;

  ReelDeleting$: Observable<boolean> = this.store$.select(ReelStoreSelectors.selectReelDeleting);

  ReelUpdating$: Observable<boolean> = this.store$.select(ReelStoreSelectors.selectReelUpdating);

  SnippetDeleting$: Observable<boolean> = this.store$.select(ReelStoreSelectors.selectSnippetDeleting);

  constructor(private store$: Store<RootStoreState.RootState>,
    private activatedRoute: ActivatedRoute,
    private modalSvc: NgbModal,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let reelId = params['key'];
      this.reelId = reelId;
      this.Reel$ = this.store$.select(ReelStoreSelectors.selectReelById(this.reelId));
      this.store$.dispatch(new ReelStoreActions.LoadRequestByIdAction({ reelId }))
    })
  }

  DeleteReel() {
    let cancelModal = this.modalSvc.open(CancelDialogComponent, { centered: true });
    cancelModal.componentInstance.Title = "Delete Reel";
    cancelModal.componentInstance.Message = "Are you sure you want to delete this reel?";
    cancelModal.result.then(result => {
      console.log(result);
      this.store$.dispatch(new ReelStoreActions.DeleteReelAction({ reelId: this.reelId }));
    }).catch(err => console.log(err));

  }


  EditReel() {
    let editModal = this.modalSvc.open(EditReelComponent, { centered: true });
    editModal.componentInstance.Reel$ = this.Reel$;
    editModal.componentInstance.SnippetDeleting$ = this.SnippetDeleting$;
    editModal.result.then((result: UpdateReel) => {
      if (result) {
        console.log(result);
        this.store$.dispatch(new ReelStoreActions.UpdateReelRequestAction({ reel: result, reelId: this.reelId }));
      }
    }).catch(err => console.log(err));

  }

}
