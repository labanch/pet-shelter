import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PetService } from '../../pet.service';
import { Pet } from '../../pet';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pets: Array<Pet>;
  pet: any = {};

  constructor( private _route: ActivatedRoute, private _pet: PetService, private router: Router ) {
  // Using service to change value
  this._pet.petObservable
    .subscribe( (pets) => {
      this.pets = pets;
      console.log('pet in subscribe', pets)
    });

    // Get route id
    this._route.paramMap.subscribe( params => {
      const pet = this.pets.find(
        (val, i) => {
          return val.id === parseInt(params.get('id'))
        });
      if(pet){
        this.pet = pet
      } else {
        console.log("can't find this pet");
      }
    });
  }

  ngOnInit() {
  }

  savePet() {
    console.log(this.pet);
    this._pet.updatePet(this.pet._id, this.pet);
    this.router.navigate(['']);
  }

}
