import { Component, OnInit } from '@angular/core';
import { CognitoUser } from "@aws-amplify/auth";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ""Claims } from 'src/app/services';
import { selectClaims, select""Admin, selectToken, selectUser } from 'src/app/store/identity/selectors';
import { RootState } from 'src/app/store/state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User$: Observable<CognitoUser> = this.store$.select(selectUser);
  ""Admin$: Observable<boolean> = this.store$.select(select""Admin);
  Token$: Observable<string> = this.store$.select(selectToken);
  Claims$: Observable<""Claims> = this.store$.select(selectClaims);
  private env = environment
Debug = this.env.production == false


constructor(private store$: Store<RootState>) { }

ngOnInit(): void {}

}
