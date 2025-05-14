import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
 } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { take, tap } from "rxjs/operators";
import { DropZoneComponent
 } from "src/app/dashboard/widgets/drop-zone/drop-zone.component";
import {
  OnCreateProjectEvent,
  OnGetProjectEvent,
  OnScrollEvent,
  Project,
  GetSessionRecordingDuration,
  TranscribeEvent,
  ParentProject,
  Session,
  DownloadExport,
  OnEditProjectEvent,
  OnDeleteProjectEvent
 } from "src/app/models";
import {
  AddProjectModalComponent,
  AddProjectModalOutput,
} from "../add-project-modal/add-project-modal.component";
import { ActivatedRoute, Event } from "@angular/router";


import { CancelDialogComponent } from "src/app/dashboard/features/projects/cancel-dialog/cancel-dialog.component";
import { EditProjectComponent } from "src/app/dashboard/features/projects/edit-project/edit-project.component";
import { ThrowStmt } from "@angular/compiler";


@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})

export class ProjectListComponent implements OnInit {

  @Input() parentProjects: ParentProject[];
  @Input() projectUpdating: boolean;
  @Input() projects: Project[];
  @Input() cursorValue: string;
  @Input() tenantID: string;
  @Input() sessions: Session[];
  @Input() projectLoading: boolean;
  @Output()
  onDownloadTranscript: EventEmitter<DownloadExport> = new EventEmitter();
  @Output()
  onTranscribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output()
  onCreateProject: EventEmitter<OnCreateProjectEvent> = new EventEmitter();
  @Output()
  onScroll: EventEmitter<OnScrollEvent> = new EventEmitter();
  @Output()
  onGetProjectByID: EventEmitter<OnGetProjectEvent> = new EventEmitter();
  @Output()
  onEditProject: EventEmitter<OnEditProjectEvent> = new EventEmitter();
  @Output()
  onDeleteProject: EventEmitter<OnDeleteProjectEvent> = new EventEmitter();


  //declared properties

  checkedSessions: Session[] = []; //CLicked rows

  isCheckedArr: boolean[] = [false, false]

  readySessions: Session[] = [];  //Sessions ready to transcribe
  downloadSessions: Session[] = []; // Sessions ready to download

  // isChecked: boolean = false;
  isReadyToTranscribe: boolean;
  isReadyToDownload: boolean;
  isSorted :boolean= false;
  session:Session;

  rootProject: ParentProject;

  constructor(
    private modalSvc: NgbModal,
    private activatedRoute: ActivatedRoute,
    private uploadFileDialog: MatDialog,

  ) { }

  ngOnInit(): void {

  }

  GetRowDetails(rowdata, i) {

    if (this.isCheckedArr[i]) {
      this.isCheckedArr[i] = !this.isCheckedArr[i]
      this.checkedSessions.splice(i, 1);
    }

    else {
      this.isCheckedArr[i] = true;
      this.checkedSessions.push(rowdata)

    }

    this.checkedSessions.forEach(
      session => {

        if (session.Status == "ReadyToTranscribe")
        {  this.readySessions.push(session)
          this.isReadyToTranscribe= true
          this.isReadyToDownload =false

        }
        else if (session.Status =="TranscriptionFinished")
         { this.downloadSessions.push(session)
           this.isReadyToDownload =true
           this.isReadyToTranscribe= false
         }
      }
    )

  }


  Transcribe() {
    if(this.readySessions){
       this.onTranscribe.emit({
        Sessions: this.readySessions
      });
    }
      this.checkedSessions= [];
      this.isCheckedArr = [];
      this.readySessions =[];
      this.isReadyToTranscribe=false;

  }


  Download() {

    if(this.downloadSessions){
       this.onDownloadTranscript.emit({
            Sessions: this.downloadSessions
     });
    }
    this.checkedSessions=[];
    this.isCheckedArr = [];
    this.downloadSessions =[];
    this.isReadyToDownload=false;

  }

  SortRow(){
     if(this.isSorted ){
       this.isSorted = !this.isSorted
    }
    else
      this.isSorted= true;
    //sort projects and session
    this.projects.sort((proj1,proj2) => 0 - (proj1 > proj2 ? -1 : 1));
    this.sessions.sort((session1,session2) => 0 - (session1 > session2 ? -1 : 1));
  }

  recordingTime = (session): string => {
    return GetSessionRecordingDuration(session);
  };


  GetProject(ProjectID) {
    this.onGetProjectByID.emit({
      ProjectID: ProjectID,
      Cursor: this.cursorValue
    });
  };

  Scroll() {
    setTimeout(() => {
      if (this.cursorValue) {
        this.onScroll.emit({
          NextCursor: this.cursorValue,
          TenantID: this.tenantID,
          Limit: 100,
        });
      }
    }, 50);
  };

  GetRootProject( ){

  }


  UploadFiles() {
    const projectId = this.activatedRoute.snapshot.paramMap.get('projectID')
    if ( this.parentProjects ){
      this.rootProject = this.parentProjects.find( project =>
            project.ProjectID == projectId
        )
    }
    const dialogRef = this.uploadFileDialog.open(DropZoneComponent, {
      width: '450px',
      height: '350px',
      data: {
        RootProject: this.rootProject,
      }
    });
  };


  OnAddProject() {
    const projectId = this.activatedRoute.snapshot.paramMap.get('projectID')
    const modalRef: NgbModalRef = this.modalSvc.open(AddProjectModalComponent, {
      backdrop: "static",
    });
    modalRef.closed
      .pipe(
        take(1),
        tap((output: AddProjectModalOutput) =>

          this.onCreateProject.emit({
            TenantID: this.tenantID,
            ProjectName: output.ProjectName,
            ProjectID: projectId,
          })

        )
      )
      .subscribe();

  }

  EditProject(projectID: string, Name: string) {
    let editModal = this.modalSvc.open(EditProjectComponent, {
      centered: true,
    });
    editModal.componentInstance.Name = Name;
    editModal.result
      .then((result: string) => {
        if (result) {
          this.onEditProject.emit({
            Name: result,
            ProjectID: projectID,
          })

        }
      })
      .catch((err) => console.error(err));
  }
// To-DO: Implement Later
  // DeleteProject(projectID: string) {
  //   let cancelModal = this.modalSvc.open(CancelDialogComponent, {
  //     centered: true,
  //   });
  //   cancelModal.componentInstance.Title = "Delete Project";
  //   cancelModal.componentInstance.Message =
  //     "Are you sure you want to delete this project?";
  //   cancelModal.result
  //     .then((result) => {
  //      this.onDeleteProject.emit({
  //        ProjectID: projectID,
  //      })
  //     })
  //     .catch((err) => console.error(err));


  // };



}
