import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { IdentityStoreSelectors, RootStoreState, SessionStoreSelectors } from "src/app/store";
import { DownloadExportAction, LoadRequestAction, StartTranscriptionRequestAction } from "src/app/store/session/actions";
import {
  selectAllSessions,
  selectSessionById,
  selectSessionsLoading,
  selectSessionTags,
} from "src/app/store/session/selectors";

import { ToastService } from "../../../shared/components/toast.service";

import { StripePaymentService } from "../../../services/stripe.service";
import {
  AddNewCardReq,
  CardChangeEvent,
  CardInfo,
  ChargeEvent,
  ChargeSuccessMessages,
  CreateCardEvent,
  DownloadExportEvent,
  GetSessionDisplayName,
  PaymentChargeReq,
  SearchTagsEvent,
  Session,
  SessionStatus,
  ToggleStarEvent,
  TranscribeEvent,
  UploadEvent,
} from "../../../models";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { PaymentMethodComponent } from "../../widgets/payment-method/payment-method.component";
import { take, tap } from "rxjs/operators";
import { AddPaymentComponent } from "../../widgets/add-payment/add-payment.component";
import { PaymentListComponent } from "../../widgets/payment-list/payment-list.component";
import { AlgoliaService } from 'src/app/services/algolia.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: "app-recordings",
  templateUrl: "./recordings.component.html",
  styleUrls: ["./recordings.component.scss"],
})
export class RecordingsComponent implements OnInit, OnDestroy {


  //Data variables and bottom sheet


  private ChargePaymentPopup: MatBottomSheetRef;

  private AddPaymentPopup: MatBottomSheetRef;

  //Observables and subscriptions

  IsStarred$: Observable<boolean> = this.algoliaSvc.IsStarred$;
  PaymentMethods$: Observable<CardInfo[]> = this.stripeSvc.PaymentMethods$;;
  DefaultPaymentMethod$: Observable<CardInfo> = this.stripeSvc.DefaultPaymentMethod$;
  StripeLoading$: Observable<boolean> = this.stripeSvc.StripeLoading$;

  //Subscribe is used here because we are using bottom sheet which are similiar to modal
  //When they are closed smart component calls create charge function
  //When charge create returns success we display toast
  ChargeCreated$: Subscription = this.stripeSvc.ChargeCreated$.subscribe(chargeCreated => {
    if (chargeCreated) {
      this.toastSvc.show(ChargeSuccessMessages.Created, { classname: 'bg-success text-light', delay: 5000 })
      this.ChargePaymentPopup.dismiss();
      this.store$.dispatch(new StartTranscriptionRequestAction({ sessionId: chargeCreated.sessionId }));
    }
  });

  //Subscribe is used here because we are using bottom sheet which are similiar to modal
  //When they are closed smart component calls add card function
  //When card added returns success we display toast

  CardAdded$: Subscription = this.stripeSvc.CardAdded$.subscribe(cardAdded => {
    if (cardAdded) {
      this.stripeSvc.LoadPaymentMethods();
      this.toastSvc.show(ChargeSuccessMessages.CardAdded, { classname: 'bg-success text-light', delay: 5000 });
      this.OpenChangePaymentPopup(cardAdded.sessionId, cardAdded.audioDuration);
      this.AddPaymentPopup.dismiss();
    }
  });
  StripeError$: Subscription = this.stripeSvc.Error$.subscribe(error => {
    if (error) {
      this.toastSvc.show(error, { classname: 'bg-danger text-light', delay: 5000 });
    }
  });

  TennantId$: Observable<string> = this.store$.select(IdentityStoreSelectors.selectCurrentTennant);

  AllSessions$: Observable<Session[]> = this.store$.select(SessionStoreSelectors.selectAllSessions);
  SessionsLoading$: Observable<boolean> = this.store$.select(SessionStoreSelectors.selectSessionsLoading);
  IsTagged$: Observable<boolean> = this.algoliaSvc.IsTagged$;
  AlgoliaIsLoadingSessions$: Observable<boolean> = this.algoliaSvc.IsLoading$;
  TaggedSessions$: Observable<Session[]> = this.algoliaSvc.TaggedSessions$;

  DisplaySessions$: Observable<Session[]> = combineLatest([this.AllSessions$, this.IsTagged$, this.TaggedSessions$]).pipe(
    map(([allSessions, isTagged, taggedSessions]) => {
      if (isTagged) {
        return taggedSessions;
      } else {
        return allSessions;
      }
    })
  );

  DisplayLoadingSessions$: Observable<boolean> = combineLatest([this.IsTagged$, this.AlgoliaIsLoadingSessions$, this.SessionsLoading$]).pipe(
    map(([isTagged, algoliaIsLoadingSessions, sessionsLoading]) => {
      if (isTagged) {
        return algoliaIsLoadingSessions;
      }
      else {
        return sessionsLoading;
      }
    })
  )


  TranscribedSessions$: Observable<Session[]> = this.DisplaySessions$.pipe(
    map((all: Session[]) =>
      all?.filter((s) => s?.Status == SessionStatus.TranscriptionFinished)
    )
  );

  ReadyToTranscribeSessions$ = this.DisplaySessions$.pipe(
    map((all: Session[]) =>
      all?.filter((s) => s?.Status == SessionStatus.ReadyToTranscribe)
    )
  );

  TranscribingSessions$ = this.DisplaySessions$.pipe(
    map((all: Session[]) =>
      all?.filter((s) => {
        switch (s?.Status) {
          case SessionStatus.TranscriptionRunning:
          case SessionStatus.TranscriptionStarting:
            return true;
          default:
            return false;
        }
      })
    )
  );


  ErrorSessions$ = this.DisplaySessions$.pipe(
    map((all: Session[]) =>
      all?.filter((s) => s?.Status == SessionStatus.TranscriptionFailed)
    )
  );



  constructor(
    private bottomSheet: MatBottomSheet,
    private store$: Store<RootStoreState.RootState>,
    private stripeSvc: StripePaymentService,
    private algoliaSvc: AlgoliaService,
    private toastSvc: ToastService

  ) { }

  //#region  Lifecycle methods

  ngOnInit(): void {
    this.stripeSvc.LoadPaymentMethods();
  }

  ngOnDestroy(): void {
    this.StripeError$?.unsubscribe();
    this.ChargeCreated$?.unsubscribe();
    this.CardAdded$?.unsubscribe();
  }

  //#endregion


  //#region  Action Methods and Triggers


  OnToggleStar(ev: ToggleStarEvent) {
    console.log(ev);
    this.algoliaSvc.GetSessionsFromAlgolia(this.algoliaSvc.SearchTags, ev.TennantId, ev.Starred);
  }


  OnDropFiles(drops: UploadEvent[]) {
    console.log("Dropped: ", drops);
    console.error("NOTIMPL: OnDropFiles");
  }

  OnExportTranscript(ev: DownloadExportEvent) {
    console.log('Export', ev.SessionId)
    this.store$.select(selectSessionById(ev.SessionId)).pipe(
      take(1),
      tap(sess => {
        console.log('in session')
        const filename = `${GetSessionDisplayName(sess)}.${ev.Format}`;
        this.store$.dispatch(new DownloadExportAction({
          sessionId: ev.SessionId,
          format: ev.Format,

          filename: filename,
        }));
      })
    ).subscribe();
  }

  OnTranscribe(ev: TranscribeEvent) {
    console.log("Transcribe Event: ", ev);
    //Select session id
    this.OpenPaymentPopup(ev.SessionId, ev.AudioDuration);
  }

  //#endregion

  //#region Popover methods

  OpenPaymentPopup(sessionId: string, audioDuration: number) {
    let cost = (audioDuration / 60000) * 0.68;
    if (cost <= 0.5) {
      cost = 0.5;
    }

    //Calculate cost and show charge popup
    this.ChargePaymentPopup = this.bottomSheet.open(PaymentMethodComponent, {
      data: {
        Loading$: this.StripeLoading$,
        Card$: this.DefaultPaymentMethod$,
        Cost: cost
      },
    });

    //Send charge request if charge event emitted
    this.ChargePaymentPopup.instance.chargeCard.subscribe((result: ChargeEvent) => {
      const req: PaymentChargeReq = {
        Card: result.CardId,
        Amount: Math.ceil(cost * 100)
      };
      this.stripeSvc.CreateCharge(req, sessionId);
    });

    //Open change payment popup if change payment event emitted
    this.ChargePaymentPopup.instance.paymentChanged.subscribe((result) => {
      this.ChargePaymentPopup.dismiss();
      this.OpenChangePaymentPopup(sessionId, audioDuration);
    });
  }

  //List of payments to change payment
  OpenChangePaymentPopup(sessionId: string, audioDuration: number) {
    let changePaymentBottomSheetRef = this.bottomSheet.open(
      PaymentListComponent,
      {
        data: {
          PaymentMethods$: this.PaymentMethods$,
          DefaultPaymentMethod$: this.DefaultPaymentMethod$
        }
      }
    );

    //Open add payment popup if addNewCard event emitted
    changePaymentBottomSheetRef.instance.addNewCard.subscribe((result) => {
      this.OpenPaymentAddPopup(sessionId, audioDuration);
    });

    //Update default payment when CardChangeEvent emitted
    changePaymentBottomSheetRef.instance.cardChanged.subscribe((result: CardChangeEvent) => {
      this.stripeSvc.ChangeDefaultPaymentMethod(result.SelectedCard);
      this.OpenPaymentPopup(sessionId, audioDuration);
    });
  }

  OpenPaymentAddPopup(sessionId: string, audioDuration: number) {
    this.AddPaymentPopup = this.bottomSheet.open(AddPaymentComponent, {
      data: {
        Loading$: this.StripeLoading$
      }
    });

    //Send token to backend when stripe token generated
    this.AddPaymentPopup.instance.cardCreated.pipe(take(1)).subscribe((result: CreateCardEvent) => {
      if (result.Token) {
        const req: AddNewCardReq = {
          Token: result.Token
        }
        this.stripeSvc.AddCard(req, audioDuration, sessionId);
      }
      else {
        this.toastSvc.show(result.Error, { classname: 'bg-danger text-light', delay: 5000 })
      }
    });
  }

  OnSearchTags(ev: SearchTagsEvent) {
    this.algoliaSvc.GetSessionsFromAlgolia(ev.SearchTags, ev.TennantId);
  }


  //#endregion

}

