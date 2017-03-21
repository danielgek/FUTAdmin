import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from './professors.service';

@Component({
    selector: 'professors-component',
    template: `<router-outlet></router-outlet>`
})
export class ProfessorsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}