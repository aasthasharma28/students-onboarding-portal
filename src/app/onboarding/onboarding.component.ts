import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  constructor() { }

  // PUBLIC VARIABLES
  public items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Onboarding Form', routerLink: ['onboardingForm/'] },
      { label: 'List Students', routerLink: ['listStudents/'] },
    ];
  }

}
