import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PetService } from '../../pet.service';
import { Pet } from '../../pet';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  liked: boolean = true;
  pets: Array<Pet>;
  pet: any = {};

  constructor( private _route: ActivatedRoute, private _pet: PetService, private router: Router ) {
      this._pet.petObservable
        .subscribe( (pets) => {
          this.pets = pets;
        });

      // Get route id
      this._route.paramMap.subscribe( params => {
        const pet = this.pets
          .find((val, i) => {
            return val.id === parseInt(params.get('id'))
          });
          console.log('pet', pet)
        if(pet){
          this.pet = pet
        } else {
          console.log("can't find this pet", pet);
        }
      });
  }

  ngOnInit() {
    this.liked = false;
    console.log('details', this.pet.skills);
  }

  addLike(option: any) {
    this.liked = true;
    let like = this.pet.likes++;
    this._pet.updatePet(this.pet._id, this.pet);
    console.log(this.pet);
  }

  removePet() {
    console.log('deleted');
    this._pet.deletePet(this.pet._id);
    this.router.navigate(['']);
  }

}
