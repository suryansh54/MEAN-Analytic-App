import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth.guard.service';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';
import { ChartOneComponent } from './chart-one/chart-one.component';
import { ChartTwoComponent } from './chart-two/chart-two.component';
import { ChartThreeComponent } from './chart-three/chart-three.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IntroPageComponent } from './intro-page/intro-page.component';

const routes: Routes = [
  {
    path:'',
    component:IntroPageComponent
  },
  {
    path:'user-auth',
    component:LoginSignupPageComponent
  },
  {
    path:'chart-one',
    component:ChartOneComponent,
    data: { header: true },
    canActivate:[AuthGuard]
  },
  {
    path:'chart-two',
    component:ChartTwoComponent,
    data: { header: true },
    canActivate:[AuthGuard]
  },
  {
    path:'chart-three',
    component:ChartThreeComponent,
    data: { header: true },
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    data: { header: true },
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
