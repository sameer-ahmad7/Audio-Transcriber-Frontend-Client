import { Component, OnInit, Inject, EventEmitter, Output } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { Card } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { CardInfo, ChargeEvent } from 'src/app/models';
import { AddPaymentComponent } from "../add-payment/add-payment.component";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.scss"],
})
export class PaymentMethodComponent implements OnInit {
  @Output() paymentChanged: EventEmitter<any> = new EventEmitter();
  @Output() chargeCard: EventEmitter<ChargeEvent> = new EventEmitter<ChargeEvent>();

  Loading$: Observable<boolean> = this.data.Loading$;
  Card$: Observable<CardInfo> = this.data.Card$;
  Cost: number = this.data.Cost;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { Loading$: Observable<boolean>, Card$: Observable<CardInfo>, Cost: number },
  ) {

  }

  ngOnInit() {
  }

  ChangePayment() {
    this.paymentChanged.emit();
  }

  PayAmount(cardId: string) {
    this.chargeCard.emit({ CardId: cardId });
  }
}
