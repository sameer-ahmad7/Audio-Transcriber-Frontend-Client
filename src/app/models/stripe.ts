//To be provided by Atif

import { Card } from '@stripe/stripe-js';

export enum ChargeSuccessMessages {
  Created = "Payment collected. Starting transcription process",
  CardAdded = "Payment method added successfully"
}

export interface CardInfo {
  card: Card,
  id: string
  customer: any
}
