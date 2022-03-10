import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];

  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>('https://wdd430-cms-estella-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        // success
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          let documentsClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsClone);
        },
        // error
        (error: any) => {
          console.log(error);
        }
      );
    return this.documents.slice();
  }

  storeDocuments(documents: Document[]): any {
    let documentsJSON = JSON.stringify(documents);
    const httpHeader = new HttpHeaders().set('content-type', 'application/json');

    this.http
      .put<Document[]>(
        'https://wdd430-cms-estella-default-rtdb.firebaseio.com/documents.json', 
        documentsJSON,
        { headers: httpHeader})
      .subscribe(() => {
        let documentsClone = documents.slice();
        this.documentListChangedEvent.next(documentsClone);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone);
  }

  updateDocument(originalDocument: Document,newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone);
  }
}
