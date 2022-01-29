import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}

  @Input() messages: Message[] = [
    new Message(101, 'subject 1', 'message 1', 'sender 1'),
    new Message(102, 'subject 2', 'message 2', 'sender 2'),
    new Message(103, 'subject 3', 'message 3', 'sender 3')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
