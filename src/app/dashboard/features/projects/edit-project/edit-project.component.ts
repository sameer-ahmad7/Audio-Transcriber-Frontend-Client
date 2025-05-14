import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { Project } from "src/app/models";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.scss"],
})
export class EditProjectComponent implements OnInit, OnDestroy {
  @Input() Name: string;


  editProjectForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
  });

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      this.editProjectForm.patchValue({
        name: this.Name,
      });
  }

  ngOnDestroy(): void {}

  EditProject() {
    this.modal.close(this.editProjectForm.value.name);
  }
}
