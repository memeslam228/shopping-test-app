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

    constructor(private itemCRUD: ItemCRUDService) { }


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
                    map(state => state ? this._filterItems(state) : this.items.slice())
                );
        });
    }


    private _filterItems(value: string): Item[] {
        const filterValue = value.toLowerCase();

        return this.items.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    }


    ngOnInit() {
        this.getItemsList();
    }
}
