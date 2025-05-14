import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { CognitoUser } from "@aws-amplify/auth";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { debounceTime, map, tap } from 'rxjs/operators';
import { UiService, WebsocketService } from "src/app/services";
import {
  IdentityStoreActions,
  IdentityStoreSelectors,
  RootStoreState,
  SessionStoreActions,
  SessionStoreSelectors,
  TennantsStoreActions,
} from "src/app/store";
import { ReelStoreActions } from 'src/app/store/reel';
import { SearchTagsEvent } from 'src/app/models';
import { AlgoliaService } from 'src/app/services/algolia.service';




@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private store$: Store<RootStoreState.RootState>,
    private _: WebsocketService,
    private router: Router,
    private uiSvc: UiService,
    private algoliaSvc: AlgoliaService
  ) { }

  SpinnerVisible$: Observable<boolean> = this.uiSvc.NavigationPending$.pipe(
    debounceTime(10),
  );

  user$: Observable<CognitoUser> = this.store$.select(
    IdentityStoreSelectors.selectUser
  );
  userIsAdmin$: Observable<boolean> = this.store$.select(
    IdentityStoreSelectors.select""Admin
  );
  Username$: Observable<string> = this.store$.select(IdentityStoreSelectors.selectUsername).pipe(
    tap(un => console.log("UnL: ", un))
  );

  TennantId$: Observable<string> = this.store$.select(IdentityStoreSelectors.selectCurrentTennant);

  SessionLoading$: Observable<boolean> = this.store$.select(SessionStoreSelectors.selectSessionsLoading);

  private navLoadingCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public navLoading$: Observable<boolean> = this.navLoadingCount.asObservable().pipe(
    map(cnt => cnt > 0)
  );

  ngOnInit() {
    this.router.events.pipe(
      tap((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.navLoadingCount.next(this.navLoadingCount.value + 1);
        } else if (event instanceof NavigationEnd) {
          this.navLoadingCount.next(this.navLoadingCount.value - 1);
        }
      })
    ).subscribe();

    this.store$.dispatch(new SessionStoreActions.LoadRequestAction());
    this.store$.dispatch(new TennantsStoreActions.LoadTennantsRequestAction());
    this.store$.dispatch(new ReelStoreActions.LoadRequestAction());
  }

  OnSearchTags(ev: SearchTagsEvent) {
    this.algoliaSvc.GetSessionsFromAlgolia(ev.SearchTags, ev.TennantId);
  }


  Logout() {
    this.store$.dispatch(IdentityStoreActions.Logout());
  }
}
