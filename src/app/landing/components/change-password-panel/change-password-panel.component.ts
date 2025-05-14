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
import { IdentityConfirmation } from "src/app/store/identity/state";
import {
  ChangeLandingModeEvent,
  LandingViewMode,
} from "../../containers/landing/landing.component";

@Component({
  selector: "app-change-password-panel",
  templateUrl: "./change-password-panel.component.html",
  styleUrls: ["./change-password-panel.component.scss"],
})
export class ChangePasswordPanelComponent implements OnInit, OnChanges {
  @Input() identityConfirmation: IdentityConfirmation;
  @Input() loading: boolean = false;
  @Output() resetPassword = new EventEmitter<IdentityConfirmation>();
  @Output() changeLandingMode = new EventEmitter<ChangeLandingModeEvent>();

  public LandingViewMode = LandingViewMode;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const label = "identityConfirmation";
    if (label in changes) {
      const curVal: IdentityConfirmation = changes[label].currentValue;
      if (curVal != null) {
        this.form.patchValue({ username: curVal.username });
      }
    }
  }

  form: FormGroup = this.fb.group({
    username: ["", [Validators.email, Validators.required]],
  });

  onSubmit() {
    this.resetPassword.emit({
      username: this.form.get("username").value,
      password: null,
    });
  }

  changeToLoginMode() {
    this.changeLandingMode.emit({
      Mode: LandingViewMode.Login,
      Identity: {
        username: this.form.get("username").value,
        password: null,
      },
    });
  }

  changeToChangeWithCodeMode() {
    this.changeLandingMode.emit({
      Mode: LandingViewMode.ChangePasswordWithCode,
      Identity: {
        username: this.form.get("username").value,
        password: null,
      },
    });
  }
}
