import {Component, OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {ItemCRUDService} from '../../Services/shopping-items/item-crud.service';
import {Item} from '../../Services/shopping-items/item';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-product-items-list',
    templateUrl: './product-items-list.component.html',
    styleUrls: ['./product-items-list.component.css']
})
export class ProductItemsListComponent implements OnInit {

    constructor(private itemCRUD: ItemCRUDService) {
    }

    selected = 'smth';
    items: Item[];
    itemCtrl = new FormControl();
    filteredItems: Observable<Item[]>;

    getItemsList() {
        // Use snapshotChanges().map() to store the key
        this.itemCRUD.getItemsList().snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(items => {
            this.items = items;
            this.filteredItems = this.itemCtrl.valueChanges
                .pipe(
                    startWith(''),
                    map(item => item ? this._filterItems(item) : this.items.slice())
                );
        });
    }

    private _filterItems(value: string): Item[] {
        const filterValue = value.toLowerCase();

        return this.items.filter(item => item.name.toLowerCase().includes(filterValue));
    }

    sortBtoS(a, b) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    sortStoB(a, b) {
        if (a.price > b.price) {
            return -1;
        }
        if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    sortAZ(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    sortZA(a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    }

    subSelected() {
        if (this.selected === 'fromEtoC') {
            this.items.sort(this.sortStoB);
        }
        if (this.selected === 'fromCtoE') {
            this.items.sort(this.sortBtoS);
        }
        if (this.selected === 'A-Z') {
            this.items.sort(this.sortAZ);
        }
        if (this.selected === 'Z-A') {
            this.items.sort(this.sortZA);
        }
    }


    ngOnInit() {
        this.getItemsList();
    }
}
