import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TabMenuModule, InputTextModule, DropdownModule, CheckboxModule, CardModule, CalendarModule, SpinnerModule, ConfirmDialogModule, ConfirmationService, MenuModule, TooltipModule
} from 'primeng/primeng';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { StudentsListingComponent } from './students-listing/students-listing.component';
import { OnboardingRoutingModule  } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, InputTextModule, TabMenuModule, OnboardingRoutingModule, ReactiveFormsModule, DropdownModule, CheckboxModule, ConfirmDialogModule,
    SpinnerModule, CardModule, CalendarModule, MenuModule, TooltipModule
  ],
  declarations: [OnboardingFormComponent, StudentsListingComponent, OnboardingComponent, HeaderComponent, FooterComponent],

  providers: [ConfirmationService, AuthGuard]

})
export class OnboardingModule { }
