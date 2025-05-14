import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-upload-sessions',
  templateUrl: './upload-sessions.component.html',
  styleUrls: ['./upload-sessions.component.scss']
})
export class UploadSessionsComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() files: File[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  newProjectForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  FileMetadata: { fileName?: { tags: string[], starred: boolean } } = {};

  ProjectTags = [];

  activeTabProject = 'existing';

  IsLoading$: Observable<boolean>;
  Projects$: Observable<Project[]>;

  TotalFileSize(): number {
    let ttl = 0;
    this.files.forEach((f: File) => ttl += f.size);
    return ttl;
  }

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.files.forEach((file) => {
      this.FileMetadata[file.name] = { tags: [], starred: false }
    })
  }

  ToggleStar(fileName: string) {
    this.FileMetadata[fileName].starred = !this.FileMetadata[fileName].starred
    console.log(this.FileMetadata);
  }

  AddAudioTag(event: MatChipInputEvent, fileName: string): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.FileMetadata[fileName].tags.push(value.trim());
      console.log(this.FileMetadata);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  RemoveAudioTag(audioTag, fileName): void {

    const index = this.FileMetadata[fileName].tags.indexOf(audioTag);

    if (index >= 0) {
      this.FileMetadata[fileName].tags.splice(index, 1);
      console.log(this.FileMetadata);
    }
  }

  RemoveProjectTag(projectTag): void {
    const index = this.ProjectTags.indexOf(projectTag);

    if (index >= 0) {
      this.ProjectTags.splice(index, 1);
    }
  }

  AddProjectTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ProjectTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  Drop(files: File[]) {
    console.log('drop file')
    this.files.push(...files);
    this.files.forEach((file) => {
      if (!this.FileMetadata[file.name])
        this.FileMetadata[file.name] = { tags: [], starred: false }
    })
  }

  Cancel() {
    this.activeModal.close('Close click');
  }

  Submit() {
  }

  Valid(): boolean {
    let prjValid = this.ProjectValid();
    let filesValid = this.files.length > 0;
    return prjValid && filesValid;
  }

  ProjectValid(): boolean {
    switch (this.activeTabProject) {
      case 'existing':
        return this.selectedProject != undefined;
      case 'new':
        return this.newProjectForm.valid;
    }
  }

  ActiveProject(): Readonly<{ New: boolean, Project: Project; }> {
    switch (this.activeTabProject) {
      case 'existing': {
        if (this.selectedProject == undefined) {
          return undefined;
        }
        return {
          New: false,
          Project: this.selectedProject,
        };
      }
      case 'new': {
        if (!this.newProjectForm.valid) {
          return undefined;
        }
        return {
          New: true,
          Project: {
            Name: this.newProjectForm.get('name').value,
            IsDefault: false,
            SessionIds: []
          },
        };
      }
      default:
        return undefined;
    }
  }

  ActiveProjectName(def: string): string {
    let actPrj = this.ActiveProject();
    switch (actPrj == undefined) {
      case true: return def;
      case false: return actPrj.Project.Name;
    }
  }

  IsSelectedProject(project: Project): boolean {
    if (this.selectedProject == undefined) {
      return false;
    }
    return this.selectedProject.Name == project.Name &&
      this.selectedProject.IsDefault == project.IsDefault;
  }


}
