import { CardInfo } from './stripe';
import { SizzleReel, Snippet } from './sizzlereel'

export type ChangeSnippetNameEvent = Readonly<{
  SnippetName: string;
  Index: number;
}>

export type SnippetDropEvent = Readonly<{
  PreviousIndex: number;
  CurrentIndex: number;
}>

export type CreateReelEvent = Readonly<{
  Reel: SizzleReel;
  CurrentTennantId: string;
  Name: string;
  Notes: string;
  Snippets: Snippet[];
}>

export type EditReelEvent = Readonly<{
  ReelId: string;
}>

export type DeleteReelEvent = Readonly<{
  ReelId: string;
}>

export type ToggleStarEvent = Readonly<{
  Starred: boolean;
  TennantId: string;
}>

export type SearchTagsEvent = Readonly<{
  SearchTags: string[];
  TennantId: string;
}>

export type UploadEvent = Readonly<{
  SessionId: string;
  File: File;
}>;

export type SaveSnippetEvent = Readonly<{
  Snippet: Snippet;
}>

export type DeleteSnippetEvent = Readonly<{
  SnippetId: string;
  Reel: SizzleReel;
}>


export type DownloadExportEvent = Readonly<{
  SessionId: string;
  Format: string;
}>;

export type TranscribeEvent = Readonly<{
  SessionId: string;
  AudioDuration: number
}>;
export type LoginEvent = Readonly<{
  Username: string;
  Password: string;
}>;
export type SnippetEvent = Readonly<{
  Snippet: Snippet
}>;


export type ChargeEvent = Readonly<{
  CardId: string;
}>;

export type CardChangeEvent = Readonly<{
  SelectedCard: CardInfo
}>

export type CreateCardEvent = Readonly<{
  Token: string;
  Error?: string;
}>
