import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  @Input('document-item') document!: Document;

}
