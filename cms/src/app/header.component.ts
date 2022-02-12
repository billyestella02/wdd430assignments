import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  // @Output() selectedFeatureEvent = new EventEmitter<string>();

  // onSelected(selectedEvent: string) {
  //   this.selectedFeatureEvent.emit(selectedEvent);
  // }
}
