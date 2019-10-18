import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';
import { ChartOneComponent } from './chart-one/chart-one.component';
import { ChartTwoComponent } from './chart-two/chart-two.component';
import { ChartThreeComponent } from './chart-three/chart-three.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IntroPageComponent } from './intro-page/intro-page.component';

const routes: Routes = [
  {
    path:'',
    component:IntroPageComponent,
    data: { header: false }
  },
  {
    path:'user-auth',
    component:LoginSignupPageComponent,
    data: { header: false }
  },
  {
    path:'chart-one',
    component:ChartOneComponent
  },
  {
    path:'chart-two',
    component:ChartTwoComponent
  },
  {
    path:'chart-three',
    component:ChartThreeComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
