import * as moment from 'moment';

export class Student {
    id: number;
    name: string;
    category: string;
    dob: string;
    fatherName: string;
    motherName: string;
    lastClassScore: string;
    selectedDocuments: Array<string>;

    constructor(value = null) {
        if (value) {
            this.id = +value.id || 0;
            this.name = value.name;
            this.category = value.category;
            this.dob = value.dob;
            if (typeof value.dob === 'object') {
                this.dob = moment(value.dob).format('YYYY/MM/DD');
            }
            this.fatherName = value.fatherName;
            this.motherName = value.motherName;
            this.lastClassScore = value.lastClassScore;
            this.selectedDocuments = value.documents;
        }
    }
}
