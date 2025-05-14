import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IdentityStoreActions } from "src/app/store";
import {
  selectIdentityError,
  selectIdentityIsLoading,
} from "src/app/store/identity/selectors";
import {
  IdentityConfirmation,
  IdentityError,
} from "src/app/store/identity/state";
import { RootState } from "src/app/store/state";
import {
  ChangeLandingModeEvent,
  LandingViewMode,
} from "../../containers/landing/landing.component";

@Component({
  selector: "app-login-panel",
  templateUrl: "./login-panel.component.html",
  styleUrls: ["./login-panel.component.scss"],
})
export class LoginPanelComponent implements OnInit, OnChanges {
  public LandingViewMode = LandingViewMode;
  @Output() changeLandingMode = new EventEmitter<ChangeLandingModeEvent>();
  @Input() identityConfirmation: IdentityConfirmation;
  constructor(private fb: FormBuilder, private store$: Store<RootState>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const label = "identityConfirmation";
    if (label in changes) {
      const curVal: IdentityConfirmation = changes[label].currentValue;
      if (curVal != null) {
        this.loginForm.patchValue({ username: curVal.username });
        if (curVal.password != null) {
          this.loginForm.patchValue({ password: curVal.password });
        }
      }
    }
  }

  authLoading$: Observable<boolean> = this.store$.select(
    selectIdentityIsLoading
  );
  authError$: Observable<IdentityError> = this.store$.select(
    selectIdentityError
  );

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required],
  });

  changeToResetPassword() {
    this.changeLandingMode.emit({
      Mode: LandingViewMode.ForgotPassword,
      Identity: {
        username: this.loginForm.get("username").value,
        password: this.loginForm.get("password").value,
      },
    });
  }

  onSubmit() {
    const username: string = this.loginForm.get("username").value;
    const password: string = this.loginForm.get("password").value;
    this.store$.dispatch(
      IdentityStoreActions.Login({
        Username: username,
        Password: password,
      })
    );
  }

  onBeginPasswordReset() {}
}
