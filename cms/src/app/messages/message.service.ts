import { Injectable, EventEmitter} from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

   getMessage(id: string): Message | null {
     for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
     }
     return null;
   }

   getMaxId() {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
   }

   getMessages(): Message[] {
    this.http
      .get<Message[]>('https://wdd430-cms-estella-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        // success
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();

          this.messages.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            } else if (a.id > b.id) {
              return 1;
            } else {
              return 0;
            }
          });
          let messagesClone = this.messages.slice();
          this.messageChangedEvent.next(messagesClone);
        },
        // error
        (error: any) => {
          console.log(error);
        }
      );
    return this.messages.slice();
  }

  storeMessages(messages: Message[]): any {
    let messagesJSON = JSON.stringify(messages);
    const httpHeader = new HttpHeaders().set('content-type', 'application/json');

    this.http
      .put<Message[]>(
        'https://wdd430-cms-estella-default-rtdb.firebaseio.com/messages.json', 
        messagesJSON,
        { headers: httpHeader})
      .subscribe(() => {
        let messagesClone = messages.slice();
        this.messageChangedEvent.next(messagesClone);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  addMessage(message: Message) {
    this.messages.push(message);
    let messagesClone = this.messages.slice();
    this.storeMessages(messagesClone);
  }
}


