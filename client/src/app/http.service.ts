import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getPets(){
    return this._http.get('/api/pets');
  }
  addPet(pet){
    return this._http.post('/api/pets', pet);
  }
  getPet(id){
    return this._http.get('/api/pets/'+id);
  }
  deletePet(id){
    return this._http.delete('/api/pets/'+id);
  }
  likePet(id){
    return this._http.put('/api/pets/'+id+'/like', id);
  }
  editPet(pet){
    console.log('*******************', pet)
    return this._http.put('/api/pets/'+pet._id, pet);
  }
}
