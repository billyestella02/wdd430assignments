import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subject!: ElementRef;
  @ViewChild('msgText', {static: false}) msgText!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Billy Estella';
  
  constructor(private messageService: MessageService) { }
  ngOnInit(): void { }

  onSendMessage() {
    let subj = this.subject.nativeElement.value;
    let msgtxt = this.msgText.nativeElement.value;
    let message = new Message("1", subj, msgtxt, this.currentSender);
    
    // this.addMessageEvent.emit(message);
    this.messageService.addMessage(message);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
