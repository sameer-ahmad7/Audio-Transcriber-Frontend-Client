import { Transcript } from './transcript';

export enum SessionStatus {
  NoMedia = "NoMedia",
  $MediaUploaded = "$MediaUploaded",
  ReadyToTranscribe = "ReadyToTranscribe",
  TranscriptionStarting = "StartingTranscription",
  TranscriptionRunning = "TranscriptionRunning",
  TranscriptionFailed = "TranscriptionFailed",
  TranscriptionFinished = "TranscriptionFinished",
};

export enum SessionUiStatus {
  StartingUpload = "StartingUpload",
  Uploading = "Uploading",
  FinalizingUpload = "FinalizingUpload",
  UploadFailed = "UploadFailed",
  InitializingTranscription = "InitTranscription",
  DownloadStarted = "Downloading",
  DownloadFailed = "DownloadFailed"
}

export enum TranscriptStatus {
  Transcribing = "Transcribing",
  ReadyToDownload = "ReadyToDownload",
  Downloading = "Downloading",
  Available = "Available",
  TranscriptionFailed = "TranscriptionFailed",
}

export type AudioDetails = Readonly<{
  DurationMS: number,
  Encoding: string,
  SampleRate: number,
  Samples: number,
}>;

export const AudioDetailsFromObject = (data: Object): AudioDetails => {
  if (data == undefined) {
    return undefined;
  }
  let ret: AudioDetails = {
    DurationMS: data['DurationMS'],
    Encoding: data['Encoding'],
    SampleRate: data['SampleRate'],
    Samples: data['Samples'],
  };
  return ret;
};

export type Session = Readonly<{
  SessionId: string,
  TennantId: string,
  Key?: string,
  Starred?: boolean,
  Status?: SessionStatus,
  AudioDetails?: AudioDetails,
  UiStatus?: SessionUiStatus,
  Error?: string,
  UploadProgress?: number,
  UploadUrl?: string,
  Transcript?: Transcript,
  TranscriptLoadProgress?: number,
  Tags?: string[],
  TranscriptLoadError?: string,
}>;

export const SessionFromObject = (data: Object): Session => {
  let ret: Session = {
    SessionId: data['SessionId'],
    TennantId: data['TennantId'],
    Key: data['Key'],
    Status: data['Status'],
    AudioDetails: AudioDetailsFromObject(data['AudioDetails']),
  };
  return ret;
};

export type Project = Readonly<{
  Name: string,
  IsDefault: boolean,
  SessionIds: string[],
}>;

export const GetSessionProjectName = (session: Session): string => {
  let parts = session.Key.split('/');
  if (parts.length == 1) {
    return undefined;
  } else {
    let first = parts[0].trim();
    return (first.length == 0 ? undefined : first);
  }
};

export const IsDefaultProject = (session: Session): boolean => {
  return GetSessionProjectName(session) == undefined;
};

export const GetSessionDisplayName = (session: Session): string => {
  let parts = session.Key.split('/');
  if (parts.length == 1) {
    return parts.slice(0).join('/');
  } else {
    return parts.slice(1).join('/');
  }
};

export const GetSessionRecordingDuration = (session: Session): string => {
  if (session.AudioDetails == undefined) {
    return "";
  }

  const totalSecs = session.AudioDetails.DurationMS / 1000;
  const secs = Math.round(totalSecs % 60);
  const totalMins = Math.floor(totalSecs / 60);
  const mins = totalMins % 60;
  const hrs = Math.floor(totalMins / 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  } else {
    return `${mins}m ${secs}s`;
  }
};

