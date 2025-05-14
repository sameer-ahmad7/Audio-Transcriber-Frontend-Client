
export enum ActionMsgCategory {
  Command = "Command",
  Update = "Update",
  Notification = "Notification",
};

export enum ActionMsgSubject {
  Session = "Session",
  Echo = "Echo",
  Xcr = "Xcr",
  XcrTask = "XcrTask",
  XcrGcp = "XcrGcp",
  Tennant = "Tennant",
};

export enum ActionMsgType {
  Echo = "Echo",

  SessionCreated = "SessionCreated",
  SessionUpdated = "SessionUpdated",
  SessionDeleted = "SessionDeleted",

  XcrStartTranscription = "XcrStartTranscription",
  XcrTranscriptionStarted = "XcrTranscriptionStarted",
  XcrTranscriptionFinished = "XcrTranscriptionFinished",
  XcrFinalizeTranscription = "XcrFinalizeTranscription",

  XcrStartTask = "XcrStartTask",
  XcrTaskStarted = "XcrTaskStarted",
  XcrTaskFinished = "XcrTaskFinished",
  XcrTaskFailed = "XcrTaskFailed",

  XcrGcpTaskFinished = "XcrGcpTaskFinished",
  XcrGcpTaskFailed = "XcrGcpTaskFailed",

  TennantUpdated = "TennantUpdated",
  TennantDeleted = "TennantDeleted",
};

export type ActionMsg = Readonly<Partial<{
  Category: ActionMsgCategory,
  Subject: ActionMsgSubject,
  Action: ActionMsgType,
  UserId: string,
  CorrelationId: string,
  Body: Object,
}>>;

