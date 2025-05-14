import { Session, SessionStatus, SessionUiStatus } from "src/app/models/session";

export enum GeneralState {
  Null = 'Null',
  NoMedia = 'NoMedia',
  StartingMediaUpload = 'StartingMediaUpload',
  UploadingMedia = 'UploadingMedia',
  FinishingMediaUpload = 'FinishingMediaUpload',
  MediaUploaded = 'MediaUploaded',
  MediaUploadFailed = 'MediaUploadFailed',
  ReadyToTranscribe = 'ReadyToTranscribe',
  TranscriptionInit = 'TranscriptionInit',
  TranscriptionStarting = 'TranscriptionStarting',
  TranscriptionRunning = 'TranscriptionRunning',
  TranscriptionFinished = 'TranscriptionFinished',
  TranscriptionFailed = 'TranscriptionFailed',
  DownloadStarted = "Downloading",
  DownloadFailed = "DownloadFailed"
}

export function GetGeneralState(session: Session): GeneralState {
  switch (session.Status) {
    case undefined: return GeneralState.Null;
    case SessionStatus.NoMedia: {
      switch (this.session.UiStatus) {
        case undefined: return GeneralState.NoMedia;
        case SessionUiStatus.StartingUpload: return GeneralState.StartingMediaUpload;
        case SessionUiStatus.Uploading: return GeneralState.UploadingMedia;
        case SessionUiStatus.FinalizingUpload: return GeneralState.FinishingMediaUpload;
        case SessionUiStatus.UploadFailed: return GeneralState.MediaUploadFailed;
        default: {
          console.error(`Unhandled SessionUiStatus! Session: ${this.session.Id}, Status: ${this.session.Status}, UiState: ${this.session.UiStatus}`);
          return GeneralState.Null;
        }
      }
    }
    case SessionStatus.$MediaUploaded: return GeneralState.MediaUploaded;
    case SessionStatus.ReadyToTranscribe: {
      switch (this.session.UiStatus) {
        case SessionUiStatus.InitializingTranscription: return GeneralState.TranscriptionInit;
        default: return GeneralState.ReadyToTranscribe;
      }
    }
    case SessionStatus.TranscriptionStarting: return GeneralState.TranscriptionStarting;
    case SessionStatus.TranscriptionRunning: return GeneralState.TranscriptionRunning;
    case SessionStatus.TranscriptionFinished: {
      switch (this.session.UiStatus) {
        case SessionUiStatus.DownloadStarted: return GeneralState.DownloadStarted;
        case SessionUiStatus.DownloadFailed: return GeneralState.DownloadFailed;
        default: return GeneralState.TranscriptionFinished;
      }
    }
    case SessionStatus.TranscriptionFailed: return GeneralState.TranscriptionFailed;
    default: {
      console.error(`Unhandled SessionStatus! Session: ${this.session.Id}, Status: ${this.session.Status}, UiState: ${this.session.UiStatus}`);
      return GeneralState.Null;
    }
  }

}

