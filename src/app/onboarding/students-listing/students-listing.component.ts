import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../shared/services/students.service';
import { Subject, of } from 'rxjs';
import { ConfirmationService, SelectItem  } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-students-listing',
  templateUrl: './students-listing.component.html',
  styleUrls: ['./students-listing.component.scss']
})
export class StudentsListingComponent implements OnInit {

  // PUBLIC VARIABLES
  public students: Array<Student>;
  public categories: Array<SelectItem>;
  public selectedCategory: string;

  // PRIVATE VARIABLES
  private searchTerms: Subject<string>;

  constructor(public studentsService: StudentsService,
              private confirmationService: ConfirmationService) {
              this.selectedCategory = 'all';
              this.categories = new Array<SelectItem>();
              this.students = new Array<Student>();
              this.searchTerms = new Subject<string>();
     }

  ngOnInit() {
    this.initCategoriesDropdown();
    this.populateStudentsList();
    this.handleStudentSearch();
  }

  // PUBLIC METHODS

  /**
   * Function to show delete confirmation popup on delete button click
   */
  public deleteStudent(studentId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.studentsService.deleteStudent(studentId).subscribe(
          (response: any) => {
            this.fetchStudents();
            this.studentsService.showSuccess('Record deleted successfully');
          }
        );
      }
  });
  }

  /**
   * Function to fetch students list based on category change
   */
  public onCategoryChange(category: string) {
    if (category === 'all') {
      this.fetchStudents();
    } else {
      this.studentsService.searchStudentByCategory(category).subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      );
    }
  }

  /**
   * Function to handle search
   */
  public search(term: string) {
    this.searchTerms.next(term);
  }

  ///// PRIVATE METHODS
  //////////////////////////////////////////////////////

  /**
   * Function to initialize categories dropdown
   */
  private initCategoriesDropdown() {
    this.categories = [
      { label: 'All', value: 'all' },
      { label: 'International', value: 'international' },
      { label: 'Domestic', value: 'domestic' }
    ];
  }

  private handleStudentSearch() {
    this.searchTerms.pipe(
      debounceTime(1000),      // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(term => { // switch to new observable each time the term changes
        if (term) {
          return of (this.searchTerm(term)); // return the http search observable
        } else {
          return of (this.studentsService.students); // or the observable of empty students if there was no search term
        }
      })).subscribe(
        (res: Student[]) => {
          this.students = res;
        }
      );
  }

  /**
   * Function to handle search term
   */
  private  searchTerm(term: string) {
    return this.studentsService.students.filter(student => student.name.toLowerCase() === term.toLowerCase());
  }

  /**
   * Function to populate student list
   */
  private populateStudentsList() {
    const students = this.studentsService.students;
    if (students) {
      this.students = students;
    } else {
      this.fetchStudents();
    }
  }

  /**
   * Function to fetch all students present in Database
   */
  private fetchStudents() {
    this.studentsService.getStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.studentsService.students = students;
      }
    );
  }

}
