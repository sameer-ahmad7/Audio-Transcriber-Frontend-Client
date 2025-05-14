export enum ReelStatus {
  Open = "open",
  Closed = "closed"
}

export enum ReelSuccessMessages {
  Created = "Reel has been created successfully",
  Updated = "Reel has been updated successfully",
  Deleted = "Reel has been deleted successfully"
}

export enum SnippetSuccessMessages {
  Deleted = "Snippet has been deleted successfully",
  Added = "Snippet added successfully",
  Updated = "Snippet updated successfully"
}

export interface UpdateReel {
  Name: string;
  Notes: string;
  SnippetOrder?: string[],
  Metadata?: any;
}


export interface SizzleReel {
  ReelId: string;
  Status?: ReelStatus;
  TennantId: string;
  Name: string;
  Snippets: Snippet[];
  SnippetOrder?: string[];
  Notes: string;
}


export interface Snippet {
  SnippetId?: string;
  Title?: string;
  SnippetOrder?: string[];
  SessionId: string;
  SessionVersion: number;
  StartTimeMs: number;
  Status?: ReelStatus,
  EndTimeMs: number;
  SnippetMetadata: any;
}
