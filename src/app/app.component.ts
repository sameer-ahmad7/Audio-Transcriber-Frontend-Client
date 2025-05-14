import { Component } from "@angular/core";
import { RouteConfigLoadStart, Router, RouterEvent } from "@angular/router";
import { Store } from "@ngrx/store";
import Amplify from "aws-amplify";
import { tap } from "rxjs/operators";
import { AmplifyConfig } from "./services/amplify-config";
import { RootState } from "./store/state";

Amplify.configure(AmplifyConfig);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = """-webclient";
  loadIndicator = false;
  private asyncLoadCount = 0;

  constructor(private router: Router, private store$: Store<RootState>) { }

  ngOnInit() {
    console.log(""" is starting...");

    this.router.events
      .pipe(
        tap((event: RouterEvent) => {
          if (event instanceof RouteConfigLoadStart) {
            this.asyncLoadCount++;
          } else {
            this.asyncLoadCount--;
          }
        }),
        tap((_) => (this.loadIndicator = this.asyncLoadCount > 0))
      )
      .subscribe();
  }
}
