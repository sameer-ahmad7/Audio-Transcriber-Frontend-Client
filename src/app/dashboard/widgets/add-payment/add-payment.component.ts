import { Component, EventEmitter, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripeCardElementChangeEvent,
} from "@stripe/stripe-js";
import { StripeCardComponent, StripeService } from "ngx-stripe";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateCardEvent } from 'src/app/models';

@Component({
  selector: "app-add-payment",
  templateUrl: "./add-payment.component.html",
  styleUrls: ["./add-payment.component.scss"],
})
export class AddPaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent; s

  Loading$: Observable<boolean> = this.data.Loading$;
  ValidCardDetails: boolean = false;

  cardCreated: EventEmitter<CreateCardEvent> = new EventEmitter<CreateCardEvent>();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { Loading$: Observable<boolean> },
    private stripeSvc: StripeService,
  ) {
  }

  CardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      }, invalid: {
        iconColor: "red",
        color: "red",
      }
    }
  };


  ChargeForm: FormGroup;

  ngOnInit(): void {
    this.ChargeForm = new FormGroup({
    })
  }

  OnChange(ev: StripeCardElementChangeEvent) {
    const displayError = document.getElementById("card-errors");
    if (ev.complete) {
      this.ValidCardDetails = true;
    }
    if (ev.error) {
      this.ValidCardDetails = false;
      displayError.textContent = ev.error.message;
    } else {
      displayError.textContent = "";
    }
  }

  CreateToken(): void {
    this.stripeSvc.createToken(this.card.element).subscribe((result) => {
      if (result.token) {
        // Use the token
        this.cardCreated.emit({ Token: result.token.id });
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
        this.cardCreated.emit({ Token: null, Error: result.error.message });
      }
    });
  }
}
