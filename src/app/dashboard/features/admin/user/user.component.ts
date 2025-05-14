import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ""User } from 'src/app/models';
import { UserStoreSelectors } from 'src/app/store';
import { RootState } from 'src/app/store/state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User$: Observable<""User> = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('userId')),
    switchMap(userID => this.store$.select(UserStoreSelectors.selectuser(userID))),
  );
Loading$: Observable<boolean> = this.User$.pipe(map(user => !user));

constructor(private route: ActivatedRoute, private store$: Store<RootState>) { }

ngOnInit(): void {}

OnActions(actions: Action[]) {
  for (let action of actions) {
    this.store$.dispatch(action);
  }
}
}
