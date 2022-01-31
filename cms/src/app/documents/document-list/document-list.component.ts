import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  @Input() documents: Document[] = [
    new Document(1, "document 1", "description 1", "url 1"),
    new Document(2, "document 2", "description 2", "url 2"),
    new Document(3, "document 3", "description 3", "url 3"),
    new Document(4, "document 4", "description 4", "url 4")
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
