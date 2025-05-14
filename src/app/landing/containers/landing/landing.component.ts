import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
export enum LandingViewMode {
  Login = "Login",
  Register = "Register",
  ConfirmRegistration = "ConfirmRegistration",
  ForgotPassword = "ForgotPassword",
  ChangePasswordWithCode = "ChangePasswordWithCode",
}

export interface ChangeLandingModeEvent {
  Mode: LandingViewMode;
}

export interface ChangePasswordWithCodeEvent {
  Username: string;
  Password: string;
  Code: string;
}

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public ViewMode = LandingViewMode;

  private viewModeSubject = new BehaviorSubject<LandingViewMode>(null);
  public ViewMode$ = this.viewModeSubject.asObservable();
  public logo = "assets/logo.svg";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public SetLandingMode(mode: LandingViewMode) {
    this.viewModeSubject.next(mode);
  }

  OnChangeLandingMode(mode: ChangeLandingModeEvent) {
    this.viewModeSubject.next(mode.Mode);
  }


  onChangePasswordWithCode(event: ChangePasswordWithCodeEvent) {

