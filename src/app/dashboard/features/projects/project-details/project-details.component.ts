import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Project } from "src/app/models";
import {Location} from "@angular/common";
import { RootStoreState } from "src/app/store";
import {
  ProjectStoreActions,
  ProjectStoreSelectors,
} from "src/app/store/project";
import { CancelDialogComponent } from "../cancel-dialog/cancel-dialog.component";
import { EditProjectComponent } from "../edit-project/edit-project.component";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
 Project$: Observable<Project>;
 ProjectId: string;

 //selectors

  ProjectUpdating$: Observable<boolean> = this.store$.select(
    ProjectStoreSelectors.getProjectUpdating
  );


  constructor(
    private location:Location,
    private store$: Store<RootStoreState.RootState>,
    private activatedRoute: ActivatedRoute,
    private modalSvc: NgbModal,

  ) {}

  ngOnInit(): void {

   const projectID=this.activatedRoute.snapshot.paramMap.get('key');
    this.Project$ = this.store$.select(
        ProjectStoreSelectors.selectProjectById(projectID)
      );
  }

  Back(): void{
    this.location.back();
   }

  EditProject(projectID: string, Name: string) {
    let editModal = this.modalSvc.open(EditProjectComponent, {
      centered: true,
    });
    editModal.componentInstance.Name = Name;
    editModal.result
      .then((result: string) => {
        if (result) {
          this.store$.dispatch(
            ProjectStoreActions.UpdateTenantProject({
              Set: { Name: result },
              ProjectID: projectID,
            })
          );
        }
      })
      .catch((err) => console.error(err));
  }

  DeleteProject(projectID: string) {
    let cancelModal = this.modalSvc.open(CancelDialogComponent, {
      centered: true,
    });
    cancelModal.componentInstance.Title = "Delete Project";
    cancelModal.componentInstance.Message =
      "Are you sure you want to delete this project?";
    cancelModal.result
      .then((result) => {
        this.store$.dispatch(
          ProjectStoreActions.DeleteTenantProject({ ProjectID: projectID })
        );
      })
      .catch((err) => console.error(err));
  }
}
