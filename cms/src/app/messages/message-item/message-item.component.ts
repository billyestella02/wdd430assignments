import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender!: string;
  @Input('message-item') message!: Message;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void { 
    const contact: Contact = this.contactService.getContact(this.message.id);
    this.messageSender = contact.name;
  }
}
