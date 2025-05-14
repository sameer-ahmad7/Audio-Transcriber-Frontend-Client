import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IdentityConfirmation } from "src/app/store/identity/state";
import {
  ChangeLandingModeEvent,
  ChangePasswordWithCodeEvent,
  LandingViewMode,
} from "../../containers/landing/landing.component";

@Component({
  selector: "app-reset-panel",
  templateUrl: "./reset-panel.component.html",
  styleUrls: ["./reset-panel.component.scss"],
})
export class ResetPanelComponent implements OnInit {
  @Input() identityConfirmation: IdentityConfirmation;
  @Input() loading: boolean = false;
  @Output() changePasswordWithCode = new EventEmitter<
    ChangePasswordWithCodeEvent
  >();
  @Output() changeLandingMode = new EventEmitter<ChangeLandingModeEvent>();

  public LandingViewMode = LandingViewMode;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  form: FormGroup = this.fb.group({
    username: ["", [Validators.email, Validators.required]],
    code: ["", Validators.required],
    password: ["", Validators.required],
  });

  ngOnChanges(changes: SimpleChanges) {
    const label = "identityConfirmation";
    if (label in changes) {
      const curVal: IdentityConfirmation = changes[label].currentValue;
      if (curVal != null) {
        this.form.patchValue({ username: curVal.username });
      }
    }
  }

  onSubmit() {
    this.changePasswordWithCode.emit({
      Username: this.form.get("username").value,
      Password: this.form.get("password").value,
      Code: this.form.get("code").value,
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
  changeToResetPassword() {
    this.changeLandingMode.emit({
      Mode: LandingViewMode.ForgotPassword,
      Identity: {
        username: this.form.get("username").value,
        password: this.form.get("password").value,
      },
    });
  }
}
