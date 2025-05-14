import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/session';
import { RootStoreState } from 'src/app/store';
import { CreateRequestAction } from 'src/app/store/session/actions';
import { selectProjects, selectSessionsLoading } from 'src/app/store/session/selectors';
import { ClearNewSessionsAction } from 'src/app/store/ui/actions';

@Component({
  selector: 'app-upload-sessions',
  templateUrl: './upload-sessions.component.html',
  styleUrls: ['./upload-sessions.component.scss']
})
export class UploadSessionsComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() files: File[] = [];

  newProjectForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

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
    private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.IsLoading$ = this.store.select(selectSessionsLoading);
    this.Projects$ = this.store.select(selectProjects).pipe(
      map(ary => ary.sort((a: Project, b: Project) => a.Name.localeCompare(b.Name)))
    );
  }

  Drop(files: File[]) {
    this.files.push(...files);
  }

  Cancel() {
    this.activeModal.close('Close click');
  }

  Submit() {
    this.store.dispatch(new ClearNewSessionsAction());
    this.router.navigate(['/dashboard/sessions'] );

    this.files.forEach(file => this.store.dispatch(new CreateRequestAction({
      project: this.ActiveProject().Project,
      key: file.name,
      file: file,
    })));
    this.activeModal.close('Close click');
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

  ActiveProject(): Readonly<{ New: boolean, Project: Project }> {
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
        }
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
