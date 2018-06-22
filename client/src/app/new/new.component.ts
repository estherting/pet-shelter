import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet = {name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""};
  error: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }
  addPet(){
    let observable = this._httpService.addPet(this.pet);
    observable.subscribe(data => {
      if(data['error']){
        this.error = data['error'];
      } else {
        console.log('added new pet!', data['pet'])
        this._router.navigate(['/pets']);
      }
    })
  }
}
