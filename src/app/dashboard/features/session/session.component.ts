import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { DownloadExportEvent, GetSessionDisplayName, Session, SnippetEvent, TranscribeEvent, Transcript } from 'src/app/models';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  View$: Observable<string> = this.route.queryParamMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('view')),
    tap(v => console.log("View: ", v))
  );

  SessionId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('sessionId'))
  );


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    // load transcript when necesarry...
  }


  OnTranscribe(ev: TranscribeEvent) {
    console.log("Transcribe Event: ", ev);
  }

  OnSnippet(ev: SnippetEvent) {
    console.log('Snippet', ev);
    this.snippetSvc.AddSnippet(ev.Snippet);
    this.router.navigate(['/dashboard', { outlets: { reel: 'compose' } }], { queryParamsHandling: 'preserve' });
  }

  OnExportTranscript(ev: DownloadExportEvent) {
  }


}
