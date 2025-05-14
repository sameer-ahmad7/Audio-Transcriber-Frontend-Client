import { Session } from "./session";

export interface Project {
  TenantID?: string;
  ProjectID?: string;
  Name: string;
  RecordingsCount:string;
  ParentProjectID: string;
  AlgoliaID?: string;

}
export interface OnGetRootProjectID {
  RootProject: ParentProject
}


export interface OnCreateProjectEvent {
  TenantID: string;
  ProjectName: string;
  ProjectID: string;
}

export interface OnEditProjectEvent {
  Name : string ;
  ProjectID: string;
}

export interface OnDeleteProjectEvent {
  ProjectID: string;
}

export interface OnScrollEvent {
  NextCursor: string;
  TenantID: string;
  Limit: number;
}
export interface GetTenantProjectsResp {
  Projects: Project[];
  NextCursor?: string;
}

export interface ParentProject {
  Name: string;
  ProjectID: string;
}

export interface ProjectDirectories {
  Projects: Project[];
  Sessions: Session[];
  ParentProjects: ParentProject[];
}


export interface Createproject {
  ProjectID: string;
  Project: Project;
};
export interface RetrieveProjectResponse {

  Project: Project;
}

export interface CreateTenantProjectResp {
  Project: Project
}

export interface OnGetProjectEvent {
  ProjectID: string;
  Cursor: string;
}

export interface OnProjectIdClickEvent {
  ProjectID: string;
  // Cursor?: string;
}

export interface UpdateTenantProject {
  Set?: object
  Delete?: string[]
  ProjectID: string

};

export enum ProjectStatus {
  Loading = " Loading Projects... "

}


export enum ProjectSuccessMessages {

  Created = "Project has been created successfully",
  Updated = "Project has been updated successfully",
  Deleted = "Project has been deleted successfully"
}
