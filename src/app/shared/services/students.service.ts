import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { SortService } from './sort.service';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    // PRIVATE VARIABLES
    private SERVER_URL = 'http://localhost:8080/api/';
    private studentsList: Array<Student>;

    constructor(private httpClient: HttpClient, private msgService: MessageService, private sortService: SortService) { }

    public getRequiredDocuments() {
        return this.httpClient.get(this.SERVER_URL + 'documents');
    }

    public getStudents() {
        const studentsObservable = new Observable(observer => {
            this.httpClient.get(this.SERVER_URL + 'students').subscribe(
                students => {
                    observer.next(this.sortService.sort(students, 'id'));
                    observer.complete();
                }
            );
        });
        return studentsObservable;
    }

    public getStudent(studentId: number) {
        return this.httpClient.get(`${this.SERVER_URL + 'students'}/${studentId}`);
    }

    public createStudent(student: Student) {
        return this.httpClient.post(`${this.SERVER_URL}` + 'students', student);
    }

    public deleteStudent(studentId: number) {
        return this.httpClient.delete(`${this.SERVER_URL + 'students'}/${studentId}`);
    }

    public updateStudent(student: Student) {
        return this.httpClient.put(`${this.SERVER_URL + 'students'}/${student.id}`, student);
    }

    public searchStudentByCategory(term: string) {
        return this.httpClient.get(`${this.SERVER_URL + 'students'}?category=${term}`);
    }

    /**
     * Show success message
     * @param message : string
     */
    public showSuccess(message: string): void {
        this.msgService.clear();
        this.msgService.add({ severity: 'success', detail: message });
    }

    /**
     * Show error message that is passed as parameter
     * @param message : string
     */
    public showError(message: string): void {
        this.msgService.clear();
        this.msgService.add({ severity: 'error', detail: message });
    }

    set students(studentsList: Student[]) {
        this.studentsList = studentsList;
    }

    get students() {
        return this.studentsList;
    }

}
