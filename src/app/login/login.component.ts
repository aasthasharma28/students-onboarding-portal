import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../shared/services/students.service';
import { Router } from '@angular/router';
import { Student } from '../shared/models/student.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Public variables
  public loginForm: FormGroup;
  public isIncorrectCredential = false;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router) {
  }

  ngOnInit() {
    this.initLoginForm();
  }

  // PUBLIC METHODS

  /** Function to execute on login button click */
  public login() {
    sessionStorage.setItem('currentUser', this.loginForm.value.userName); // Saving the user in session storage
    this.getStudentsList(); // Getting the students list
  }

  /**
   * Function to handle eye button toggle
   * @param passwordField
   * @param eyeIcon
   */
  public showHidePassword(passwordField, eyeIcon) {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeIcon.className = 'fa fa-eye-slash';
    } else {
      passwordField.type = 'password';
      eyeIcon.className = 'fa fa-eye';
    }
  }

  /**
   * Getter method to get the login form controls
   */
  get formControls() {
    return this.loginForm.controls;
  }

  ///////// PRIVATE METHODS
  ////////////////////////////////////////////////////////////////////

  /**
   * Function to get the student lists and then navigate to onboarding form
   */
  private getStudentsList() {
    const studentsList = this.studentsService.students;
    if (!studentsList) {
      this.studentsService.getStudents().subscribe(
        (students: Student[]) => {
          this.studentsService.students = students;
          this.navigateToOnBoardingForm();
        }
      );
    } else {
      this.navigateToOnBoardingForm();
    }

  }

  /**
   * Navigate to onboarding form
   */
  private navigateToOnBoardingForm() {
    this.router.navigate(['/dashboard/onboardingForm']);
    this.studentsService.showSuccess('Successfully logged in');
  }

  /**
   * Function to initialize login form
   */
  private initLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
