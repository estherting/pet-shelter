import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet = {_id: "", name: "", type: "", description: "", skill1: "", skill2: "", skill3: ""}
  clicked = false;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getPet(params['id'])
    });
  }
  getPet(id){
    let observable = this._httpService.getPet(id);
    observable.subscribe(data => {
      this.pet = data['pet']
    })
  }
  deletePet(){
    let observable = this._httpService.deletePet(this.pet._id);
    observable.subscribe(data => {
      console.log('deleted pet')
      this._router.navigate(['/pets']);
    })
  }
  likePet(){
    let observable = this._httpService.likePet(this.pet._id);
    observable.subscribe(data => {
      console.log('deleted pet')
      this.getPet(this.pet._id)
    })
  }
  clickedButton(){
    this.clicked=true;
  }
}
