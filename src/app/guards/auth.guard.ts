import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { selectIsAuthenticated } from "../store/identity/selectors";
import { RootState } from "../store/state";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private authSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private checkIsAuth(): true | UrlTree {
    if (this.authSubj.value == true) {
      return true;
    }
    return this.router.parseUrl("/landing");
  }

  constructor(private router: Router, private store$: Store<RootState>) {
    this.store$
      .select(selectIsAuthenticated)
      .pipe(tap((isAuth) => this.authSubj.next(isAuth == true)))
      .subscribe();
  }

  canActivate(): true | UrlTree {
    return this.checkIsAuth();
  }

  canActivateChild(): true | UrlTree {
    return this.checkIsAuth();
  }

  canLoad(route: Route): true | UrlTree {
    return this.checkIsAuth();
  }
}
