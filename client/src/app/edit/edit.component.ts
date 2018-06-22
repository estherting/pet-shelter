import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet = {_id: "", name: "", type: "", description: "", skill1: "", skill2: "", skill3: "", ogName:""}
  ogName = ""
  error: any;
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
      this.ogName = this.pet.name
      this.pet.ogName = this.ogName;
      console.log(this.pet)
    })
  }
  editPet(){
    let observable = this._httpService.editPet(this.pet);
    observable.subscribe(data => {
      if(data['error']){
        this.error = data['error']
      } else {
        console.log('edited pet', data['pet'])
        this._router.navigate(['/pets/'+this.pet._id]);
      }
    })
  }
}
