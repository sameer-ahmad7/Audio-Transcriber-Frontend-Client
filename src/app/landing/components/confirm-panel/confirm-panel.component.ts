import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IdentityStoreActions } from "src/app/store";
import { selectIdentityIsLoading } from "src/app/store/identity/selectors";
import { IdentityConfirmation } from "src/app/store/identity/state";
import { RootState } from "src/app/store/state";

@Component({
  selector: "app-confirm-panel",
  templateUrl: "./confirm-panel.component.html",
  styleUrls: ["./confirm-panel.component.scss"],
})
export class ConfirmPanelComponent implements OnInit, OnChanges {
  @Input() identityConfirmation: IdentityConfirmation;

  constructor(private fb: FormBuilder, private store$: Store<RootState>) {}

  authLoading$: Observable<boolean> = this.store$.select(
    selectIdentityIsLoading
  );

  confirmForm: FormGroup = this.fb.group({
    password: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
    code: ["", Validators.required],
  });

  ngOnChanges(changes: SimpleChanges) {
    const idConf = "identityConfirmation";
    if (idConf in changes) {
      const curVal: IdentityConfirmation = changes[idConf].currentValue;
      this.confirmForm.patchValue({ email: curVal.username });
      this.confirmForm.patchValue({ password: curVal.password });
    }
  }
  ngOnInit(): void {}

  onSubmit() {
    this.store$.dispatch(
      IdentityStoreActions.Confirm({
        Email: this.confirmForm.get("email").value,
        Code: this.confirmForm.get("code").value,
        Password: this.confirmForm.get("password").value,
      })
    );
  }
}
