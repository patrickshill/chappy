import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chapp',
  templateUrl: './chapp.component.html',
  styleUrls: ['./chapp.component.css']
})
export class ChappComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    this.scrollChatDown();
  }

  scrollChatDown() {
    let chatlog = document.getElementById("chat-content");
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  ngAfterViewInit() {
    console.log("after view ran")
  }
}
