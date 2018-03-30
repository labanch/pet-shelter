import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet } from './pet';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class PetService {
  petObservable = new BehaviorSubject([]);
  pets = [];
  pet = {};

  constructor(private router: Router, private _http: Http) { }

  getPets(){
    return this.pets;
  }

  retrieveAll() {
    this._http.get('/api/pets').subscribe(
      pets => this.petObservable.next(pets.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  addPet(pet) {
    this._http.post('/api/pets', pet).subscribe(
      response => this.retrieveAll(),
      errorResponse => console.log(errorResponse)
    );
  }

  getPet(id){
    this._http.get(`/api/pets/${id}`).subscribe(data => {
      this.pet = data;
    });
  }

  updatePet(id, pet) {
    var newData = {
      name: pet.name,
      type: pet.type,
      description: pet.description,
      skills: pet.skills,
      likes: pet.likes,
      _id: pet._id
    }
    this._http.post(`/api/pets/${pet._id}`, newData).subscribe(
      res => {
        console.log('Done updating')
      }
    );
  }

  deletePet(id) {
    this._http.delete(`/api/pets/${id}`).subscribe(
      res => console.log('Deleted', res)
    );
  }

}
