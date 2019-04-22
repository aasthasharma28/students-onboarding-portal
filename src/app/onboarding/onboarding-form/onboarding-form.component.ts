import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../shared/services/students.service';
import { Documents } from '../models/documents.model';
import { SelectItem } from 'primeng/api';
import { Student } from 'src/app/shared/models/student.model';
import { DocumentsService } from 'src/app/shared/services/documents.service';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.scss']
})
export class OnboardingFormComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private documentsService: DocumentsService) {
      this.categories = new Array<SelectItem>();
      this.documentsRequired = new Array<Documents>();
      this.isEdit = false;
      this.isView = false;
      this.students = new Array<Student>();
      this.areAllMandatoryDocumentsChecked = false;
  }

  // PUBLIC VARIABLES
  public onBoardingForm: FormGroup;
  public categories: Array<SelectItem>;
  public documentsRequired: Array<Documents>;
  public isEdit: boolean;
  public isView: boolean;
  public students: Array<Student>;
  public areAllMandatoryDocumentsChecked: boolean;

  // PRIVATE VARIABLES
  private queryParamsSubscription: Subscription;
  private studentId: number;

  ngOnInit() {
    this.initializeOnBoardingForm();
    this.initializeCategoriesDropdown();
    this.getRequiredDocumentDetails();
    this.subscribeToQueryParams();
  }


  // PUBLIC METHODS

  /**
   * Function to populate documents based on category
   * @param category: string
   */
  public onCategoryChange(category: string) {
    this.documentsRequired = this.documentsService.documentsRequired[category];
    this.documentsRequired.forEach(doc => {
      if (this.onBoardingForm.value.documents.indexOf(doc.label) > -1) {
        doc.isSelected = true;
      }
    });
  }

  /**
   * Function to onboard student
   * @param onBoardingForm: formGroup
   */
  public onBoardStudent(onBoardingForm: FormGroup) {
    const studentDetails = new Student(onBoardingForm.value);
    if (this.isEdit) { // If the mode is edit
      studentDetails.id = this.studentId;
      this.updateStudentDetails(studentDetails);
    } else { // If mode is create
      studentDetails.id = this.generateId();
      this.createStudent(studentDetails);
    }

  }

  /**
   * Function to toggle document click
   * @param document: Documents
   * @param checked: boolean
   */
  public onDocumentSelectDeSelect(document: Documents, checked: boolean) {
    this.areAllMandatoryDocumentsChecked = true;
    document.isSelected = checked;
    for (const doc of this.documentsRequired) {
      if (doc.isMandatory && !doc.isSelected) {
        this.areAllMandatoryDocumentsChecked = false;
        return;
      }
    }
    this.areAllMandatoryDocumentsChecked = true;
  }


  // PRIVATE METHODS
  //////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Function to initialize categories Dropdown
   */
  private initializeCategoriesDropdown() {
    this.categories = [
      { label: 'International', value: 'international' },
      { label: 'Domestic', value: 'domestic' }
    ];
  }

  /**
   * Function to initialize onboarding form
   */
  private initializeOnBoardingForm() {
    this.onBoardingForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['international'],
      dob: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      lastClassScore: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      documents: ['']
    });
  }

  /**
   * Subscribing to query params to check if the mode is edit or view
   */
  private subscribeToQueryParams() {
    this.queryParamsSubscription = this.route.queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.studentId = +params.id || 0;
        this.isEdit = Boolean(params.isEdit) || false;
        this.isView = Boolean(params.isView) || false;
        if (this.isEdit || this.isView) {
          this.areAllMandatoryDocumentsChecked = true;
          this.getStudentDetails();
        }
        if (this.isView) {
          this.onBoardingForm.disable();
        }
      });
  }

  /**
   * Function to get the edited or viewed student details
   */
  private getStudentDetails() {
    this.students = this.studentsService.students;
    if (!this.students) {
      this.studentsService.getStudents().subscribe(
        (students: Student[]) => {
          this.students = students;
          const searchedStudent = this.students.filter(student => student.id === this.studentId)[0];
          this.populateAllFormFields(searchedStudent);
        }
      );
    } else {
      const searchedStudent = this.students.filter(student => student.id === this.studentId)[0];
      this.populateAllFormFields(searchedStudent);
    }
  }

  /**
   * Function to populate form fields
   */
  private populateAllFormFields(searchedStudent: Student) {
    this.onBoardingForm.setValue({
      name: searchedStudent.name,
      category: searchedStudent.category,
      dob: new Date(searchedStudent.dob),
      fatherName: searchedStudent.fatherName,
      motherName: searchedStudent.motherName,
      lastClassScore: searchedStudent.lastClassScore,
      documents: searchedStudent.selectedDocuments
    });
  }

  /**
   *  Function to update student details in database
   * @param studentDetails: Student
   */
  private updateStudentDetails(studentDetails: Student) {
    this.studentsService.updateStudent(studentDetails).subscribe(
      (response: Student) => {
        this.studentsService.getStudents().subscribe(
          (students: Student[]) => {
            this.students = students;
            this.studentsService.students = students;
            this.navigateToStudentsListingPage();
            this.studentsService.showSuccess('Record updated successfully');
          }
        );
      }
    );
  }

  /**
   * Function to create a new student in database
   * @param studentDetails: Student
   */
  private createStudent(studentDetails: Student) {
    this.studentsService.createStudent(studentDetails).subscribe(
      (response: Student) => {
        this.studentsService.getStudents().subscribe(
          (students: Student[]) => {
            this.students = students;
            this.studentsService.students = students;
            this.navigateToStudentsListingPage();
            this.studentsService.showSuccess('Record added successfully');
          }
        );
      }
    );
  }

  /**
   * Navigate to students listing page
   */
  private navigateToStudentsListingPage() {
    this.router.navigate(['/dashboard/listStudents']);
  }

  /**
   * Generating new student Id
   */
  private generateId(): number {
    return Math.max(...(this.students.map(student => student.id))) + 1;
  }

  /**
   * Get the documents data from database
   */
  private getRequiredDocumentDetails() {
    this.studentsService.getRequiredDocuments().subscribe(
      (response: any) => {
        this.documentsService.documentsRequired = response;

        // Populating the required documents array
        this.documentsRequired = this.documentsService.documentsRequired[this.onBoardingForm.controls.category.value];
      }
    );

  }

  /**
   * Getter method (getting the onboarding form controls)
   */
  get formControls() {
    return this.onBoardingForm.controls;
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }

}
