import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteSnippetEvent, SaveSnippetEvent } from 'src/app/models';
import { SizzleReel } from 'src/app/models/sizzlereel';
import { RootStoreState } from 'src/app/store';
import { ReelStoreActions } from 'src/app/store/reel';

@Component({
  selector: 'app-edit-reel',
  templateUrl: './edit-reel.component.html',
  styleUrls: ['./edit-reel.component.scss']
})
export class EditReelComponent implements OnInit {


  @Input() Reel$: Observable<SizzleReel>;
  @Input() SnippetDeleting$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.RootState>) { }


  ngOnInit(): void {
  }


  OnSaveSnippet(ev: SaveSnippetEvent) {
    this.store$.dispatch(new ReelStoreActions.UpdateSnippetAction({ snippet: ev.Snippet }));
  }

  OnDeleteSnippet(ev: DeleteSnippetEvent) {
    this.store$.dispatch(new ReelStoreActions.DeleteSnippetAction({ snippetId: ev.SnippetId, reel: ev.Reel }))
  }
}
