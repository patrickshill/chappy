import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-message-field',
  templateUrl: './message-field.component.html',
  styleUrls: ['./message-field.component.css']
})
export class MessageFieldComponent implements OnInit {

  message: FormGroup;
  id = this._httpService.user_id;
  channel_id: any;
  errors: any;


  constructor(private _httpService: HttpService,
    private fb: FormBuilder, 
    private _route: ActivatedRoute, 
    private _router: Router)
    {
      this._route.paramMap.subscribe(data => {
        this.channel_id = data.get('id');
      });

      this.message = fb.group({
        U_id: this.id,
        content: ''
      });

    }

  ngOnInit() {
  }

  sendMessage(post){
    console.log(post);
  }

}
