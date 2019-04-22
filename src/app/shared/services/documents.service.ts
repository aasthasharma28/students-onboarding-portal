import { Injectable } from '@angular/core';
import { Documents } from './../../onboarding/models/documents.model';

@Injectable({
    providedIn: 'root',
})
export class DocumentsService {

    private documents: Documents;

    set documentsRequired(documents: Documents) {
        this.documents = documents;
    }
    get documentsRequired() {
        return this.documents;
    }
}
