import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';  
  private socket;
   constructor() {
        this.socket = io(this.url);
    }
  sendMessage(message){
    this.socket.emit('new-message', message);    
  }
  
  getMessages() {
    console.log("Dang goi toi");
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}