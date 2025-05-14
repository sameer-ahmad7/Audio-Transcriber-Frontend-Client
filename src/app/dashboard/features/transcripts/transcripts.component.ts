import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { DownloadExportEvent, GetSessionDisplayName, SearchTagsEvent, Session, SessionStatus, ToggleStarEvent } from 'src/app/models';
import { AlgoliaService } from 'src/app/services/algolia.service';
import { IdentityStoreSelectors, RootStoreState, SessionStoreSelectors } from 'src/app/store';
import { DownloadExportAction } from 'src/app/store/session/actions';
import { selectSessionById } from 'src/app/store/session/selectors';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.scss']
})
export class TranscriptsComponent implements OnInit {
  IsStarred$: Observable<boolean> = this.algoliaSvc.IsStarred$;
  AllSessions$: Observable<Session[]> = this.store$.select(SessionStoreSelectors.selectAllSessions).pipe(
    map((ary: Session[]) => ary.filter(s => s.Status == SessionStatus.TranscriptionFinished)),
    distinctUntilChanged()
  );

  TennantId$: Observable<string> = this.store$.select(IdentityStoreSelectors.selectCurrentTennant);
  SessionsLoading$: Observable<boolean> = this.store$.select(SessionStoreSelectors.selectSessionsLoading);
  IsTagged$: Observable<boolean> = this.algoliaSvc.IsTagged$;
  AlgoliaIsLoadingSessions$: Observable<boolean> = this.algoliaSvc.IsLoading$;
  TaggedSessions$: Observable<Session[]> = this.algoliaSvc.TaggedSessions$;


  DisplaySessions$: Observable<Session[]> = combineLatest([this.AllSessions$, this.IsTagged$, this.TaggedSessions$]).pipe(
    map(([allSessions, isTagged, taggedSessions]) => {
      if (isTagged == true) {
        return taggedSessions;
      } else {
        return allSessions;
      }
    })
  );

  DisplayLoadingSessions$: Observable<boolean> = combineLatest([this.IsTagged$, this.AlgoliaIsLoadingSessions$, this.SessionsLoading$]).pipe(
    map(([isTagged, algoliaIsLoadingSessions, sessionsLoading]) => {
      if (isTagged) {
        return algoliaIsLoadingSessions;
      }
      else {
        return sessionsLoading;
      }
    })
  )


  constructor(private store$: Store<RootStoreState.RootState>, private algoliaSvc: AlgoliaService) { }

  ngOnInit(): void {

  }

  OnToggleStar(ev: ToggleStarEvent) {
    this.algoliaSvc.GetSessionsFromAlgolia(this.algoliaSvc.SearchTags, ev.TennantId, ev.Starred);
  }

  OnSearchTags(ev: SearchTagsEvent) {
    this.algoliaSvc.GetSessionsFromAlgolia(ev.SearchTags, ev.TennantId);
  }



  OnExportTranscript(ev: DownloadExportEvent) {
    console.log('Export', ev.SessionId)
    this.store$.select(selectSessionById(ev.SessionId)).pipe(
      take(1),
      tap(sess => {
        console.log('in session')
        const filename = `${GetSessionDisplayName(sess)}.${ev.Format}`;
        this.store$.dispatch(new DownloadExportAction({
          sessionId: ev.SessionId,
          format: ev.Format,

          filename: filename,
        }));
      })
    ).subscribe();
  }

}
