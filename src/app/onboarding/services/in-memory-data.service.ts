import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    constructor() { }

    /**
     * Function to create the database for student listing, documents,
     */
    public createDb() {

        const students = [
            { id: 1, name: 'Ashish', category: 'domestic', dob: '1994/02/03',
                fatherName: 'Alok', motherName: 'Ruchi', lastClassScore: '78' , selectedDocuments:
                    ['Domicile Certificate', 'Birth Certificate', 'Previous Marksheets', 'Signed Declaration']},
            { id: 2, name: 'Suraj', category: 'international', dob: '1992/05/06',
                fatherName: 'Abc', motherName: 'Sushma', lastClassScore: '80', selectedDocuments:
                    ['Domicile Certificate', 'Birth Certificate', 'Previous Marksheets',
                    'Signed Declaration', 'Police Clearance', 'Passport'] }
        ];

        const documents = {
            domestic: [
                {
                    value: 'domicileCertificate',
                    label: 'Domicile Certificate',
                    isMandatory: true
                },
                {
                    value: 'birthCertificate',
                    label: 'Birth Certificate',
                    isMandatory: true
                },
                {
                    value: 'previousMarksheets',
                    label: 'Previous Marksheets',
                    isMandatory: true
                },
                {
                    value: 'policeClearance',
                    label: 'Police Clearance',
                    isMandatory: false
                },
                {
                    value: 'passport',
                    label: 'Passport',
                    isMandatory: false
                },
                {
                    value: 'signedDeclaration',
                    label: 'Signed Declaration',
                    isMandatory: true
                }
            ],
            international: [
                {
                    value: 'domicileCertificate',
                    label: 'Domicile Certificate',
                    isMandatory: true
                },
                {
                    value: 'birthCertificate',
                    label: 'Birth Certificate',
                    isMandatory: true
                },
                {
                    value: 'previousMarksheets',
                    label: 'Previous Marksheets',
                    isMandatory: true
                },
                {
                    value: 'policeClearance',
                    label: 'Police Clearance',
                    isMandatory: true
                },
                {
                    value: 'passport',
                    label: 'Passport',
                    isMandatory: true
                },
                {
                    value: 'signedDeclaration',
                    label: 'Signed Declaration',
                    isMandatory: true
                }
            ]
        };
        return { students, documents };
    }
}
