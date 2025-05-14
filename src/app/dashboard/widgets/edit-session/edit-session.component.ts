import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Session, UpdateSessionReq } from "src/app/models";

@Component({
  selector: "app-edit-session",
  templateUrl: "./edit-session.component.html",
  styleUrls: ["./edit-session.component.scss"],
})
export class EditSessionComponent implements OnInit {
  @Input() Session: Session;

  editSessionForm: FormGroup = this.fb.group({
    Name: ["", Validators.required],
  });

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.Session) {
      this.Session = { ...this.Session };
      this.editSessionForm.patchValue({
        Name: this.Session.Name,
      });
    }
  }

  EditSession() {
    let updateSession: UpdateSessionReq = {
      Set: {
        ...this.editSessionForm.value,
      },
    };
    this.modal.close(updateSession);
  }
}
