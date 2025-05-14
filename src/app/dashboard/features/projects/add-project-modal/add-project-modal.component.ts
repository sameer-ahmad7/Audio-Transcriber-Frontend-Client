import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export interface AddProjectModalOutput {
  ProjectName: string;

}

@Component({
  selector: "app-add-project-modal",
  templateUrl: "./add-project-modal.component.html",
  styleUrls: ["./add-project-modal.component.scss"],
})
export class AddProjectModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder) {}

  projectForm: FormGroup = this.fb.group({
    projectName: ["", Validators.required],
  });

  get projectName() {
    return this.projectForm.get("projectName");
  }
  ngOnInit(): void {
 }

  Dismiss() {
    this.activeModal.dismiss(undefined);
  }

  CreateProject() {

    let out: AddProjectModalOutput = {
      ProjectName: this.projectName.value,
    };

    this.activeModal.close(out);
  }
}
