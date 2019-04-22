import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { StudentsListingComponent } from './students-listing/students-listing.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const ROUTES: Routes = [{

  path: '',
  component: OnboardingComponent,
  canActivate: [AuthGuard],
  children: [{
      path: 'onboardingForm',
      component:  OnboardingFormComponent,
    }, {
      path: 'listStudents',
      component: StudentsListingComponent
    }
  ],
}];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class OnboardingRoutingModule { }
