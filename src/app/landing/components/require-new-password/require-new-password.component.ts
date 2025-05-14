import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityConfirmation } from 'src/app/store/identity/state';
import { AnswerPasswordChallenge, ChangeLandingModeEvent, LandingViewMode } from '../../containers/landing/landing.component';

@Component({
  selector: 'app-require-new-password',
  templateUrl: './require-new-password.component.html',
  styleUrls: ['./require-new-password.component.scss']
})
export class RequireNewPasswordComponent implements OnInit {
  @Input() identityConfirmation: IdentityConfirmation;
  @Input() loading: boolean = false;
  @Output() answerChallenge = new EventEmitter<AnswerPasswordChallenge>();
  @Output() changeLandingMode = new EventEmitter<ChangeLandingModeEvent>();

  public LandingViewMode = LandingViewMode;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  form: FormGroup = this.fb.group({
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
    this.answerChallenge.emit({
      Password: this.form.get("password").value,
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
}
