import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IdentityStoreSelectors, RootStoreState } from 'src/app/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  Is""Admin$: Observable<boolean> = this.store$.select(
  IdentityStoreSelectors.select""Admin
);
  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit(): void { }

}
