import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IdentityStoreActions } from "src/app/store";
import { selectIdentityIsLoading } from "src/app/store/identity/selectors";
import { RootState } from "src/app/store/state";

@Component({
  selector: "app-register-panel",
  templateUrl: "./register-panel.component.html",
  styleUrls: ["./register-panel.component.scss"],
})
export class RegisterPanelComponent implements OnInit {
  constructor(private fb: FormBuilder, private store$: Store<RootState>) {}

  ngOnInit(): void {}

  authLoading$: Observable<boolean> = this.store$.select(
    selectIdentityIsLoading
  );

  loginForm: FormGroup = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required],
  });

  onSubmit() {
    const firstname: string = this.loginForm.get("firstname").value;
    const lastname: string = this.loginForm.get("lastname").value;
    const email: string = this.loginForm.get("email").value;
    const password: string = this.loginForm.get("password").value;
    this.store$.dispatch(
      IdentityStoreActions.Register({
        Email: email,
        Password: password,
        FirstName: firstname,
        LastName: lastname,
      })
    );
  }
}
