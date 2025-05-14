import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ComposeReelComponent } from './dashboard/widgets/compose-reel/compose-reel.component';
import { AuthGuard, ""AdminGuard } from './guards';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { LoggingInterceptor } from './interceptors/log-interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: "compose",
        component: ComposeReelComponent,
        outlet: 'reel'
      },
      { path: 'admin', loadChildren: () => import('./dashboard/features/admin/admin.module').then(m => m.AdminModule) },
      { path: 'settings', loadChildren: () => import('./dashboard/features/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'reels', loadChildren: () => import('./dashboard/features/reels/reels.module').then(m => m.ReelsModule) },
      { path: 'projects', loadChildren: () => import('./dashboard/features/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'profile', loadChildren: () => import('./dashboard/features/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'recordings', loadChildren: () => import('./dashboard/features/recordings/recordings.module').then(m => m.RecordingsModule) },
      { path: 'transcripts', loadChildren: () => import('./dashboard/features/transcripts/transcripts.module').then(m => m.TranscriptsModule) },
      { path: 'session', loadChildren: () => import('./dashboard/features/session/session.module').then(m => m.SessionModule) },
      { path: 'page-not-found', loadChildren: () => import('./dashboard/features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
      { path: '', redirectTo: 'recordings', pathMatch: 'full' },

    ]
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(mod => mod.LandingModule),
  },
  { path: '', redirectTo: '/dashboard/recordings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
