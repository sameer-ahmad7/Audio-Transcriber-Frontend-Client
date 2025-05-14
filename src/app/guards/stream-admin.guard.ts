import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { select""Admin } from '../store/identity/selectors';
import { RootState } from '../store/state';


@Injectable({
  providedIn: 'root',
})
export class ""AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  private adminSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private checkIsAdmin(): true | UrlTree {
    if (this.adminSubj.value == true) {
      return true;
    }
    return this.router.parseUrl('/dashboard');
  }

  constructor(private router: Router, private store$: Store<RootState>) {
    this.store$.select(select""Admin).pipe(
      tap(isAdmin => this.adminSubj.next(isAdmin == true))
    ).subscribe();
  }

  canActivate(): true | UrlTree {
    return this.checkIsAdmin();
  }

  canActivateChild(): true | UrlTree {
    return this.checkIsAdmin();
  }

  canLoad(route: Route): true | UrlTree {
    return this.checkIsAdmin();
  }
}
