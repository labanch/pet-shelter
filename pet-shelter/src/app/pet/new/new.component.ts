import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Pet } from '../../pet';
import { PetService } from '../../pet.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet: Pet = new Pet();

  constructor(private router: Router, private _pet: PetService) { }

  ngOnInit() {
  }

  addPet(pet) {
    // console.log('added pet', this.pet);
    this._pet.addPet(this.pet)
    this.router.navigate(['']);
  }

}
