import {Component, Injectable, OnInit} from '@angular/core';
import {Item} from '../Services/shopping-items/item';

@Component({
    selector: 'app-items-favourite',
    templateUrl: './items-favourite.component.html',
    styleUrls: ['./items-favourite.component.css']
})
@Injectable({
    providedIn: 'root'
})
export class ItemsFavouriteComponent implements OnInit {
    favouriteItems: Item[] = [null];

    constructor() {
    }

    ngOnInit() {
        this.favouriteItems = JSON.parse(localStorage.getItem('favourite-items'));
    }

}
