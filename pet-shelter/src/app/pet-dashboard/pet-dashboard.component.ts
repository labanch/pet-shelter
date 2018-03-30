import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pet-dashboard',
  templateUrl: './pet-dashboard.component.html',
  styleUrls: ['./pet-dashboard.component.css']
})
export class PetDashboardComponent implements OnInit {
  pets = [];

  constructor(private _pet: PetService, private router: Router) { }

  ngOnInit() {
    this.pets = this._pet.getPets();
    this._pet.petObservable.subscribe(
      pets => {
        this.pets = pets;
        console.log('pet observable', this.pets)
      });
    this._pet.retrieveAll();
  }

  getDetails(id){
    this._pet.getPet(id);
    this.router.navigate(['details', id]);
  }

  edit(id) {
    console.log('id', id);
    this._pet.getPet(id);
    this.router.navigate(['edit', id]);
  }

}
