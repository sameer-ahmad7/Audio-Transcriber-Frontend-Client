import { Inject, OnDestroy } from '@angular/core';
import { Component, EventEmitter, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { Card } from '@stripe/stripe-js';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CardChangeEvent, CardInfo } from 'src/app/models';

@Component({
  selector: "app-payment-list",
  templateUrl: "./payment-list.component.html",
  styleUrls: ["./payment-list.component.scss"],
})

export class PaymentListComponent implements OnInit, OnDestroy {
  PaymentMethods$: Observable<CardInfo[]> = this.data.PaymentMethods$;

  DefaultPaymentMethod$: Subscription = this.data.DefaultPaymentMethod$.pipe(take(1)).subscribe(card => {
    this.SelectedCard = card;
  });

  cardChanged: EventEmitter<CardChangeEvent> = new EventEmitter<CardChangeEvent>();
  addNewCard: EventEmitter<any> = new EventEmitter<any>();
  SelectedCard: CardInfo;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { PaymentMethods$: Observable<CardInfo[]>, DefaultPaymentMethod$: Observable<CardInfo> }
  ) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.DefaultPaymentMethod$?.unsubscribe();
  }


  ChangeCard() {
    this.cardChanged.emit({ SelectedCard: this.SelectedCard });
  }

  AddCard() {
    this.addNewCard.emit();
  }
}
