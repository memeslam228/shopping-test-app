import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ItemCRUDService} from '../../../Services/shopping-items/item-crud.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Item} from '../../../Services/shopping-items/item';
import {ItemsFavouriteComponent} from '../../../items-favourite/items-favourite.component';

@Component({
    selector: 'app-product-item-details',
    templateUrl: './product-item-details.component.html',
    styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent implements OnInit {

    constructor(private favourite: ItemsFavouriteComponent,
                private toastr: ToastrService,
                private itemCRUD: ItemCRUDService,
                private storage: AngularFireStorage) {
    }

    @Input()
    item: Item;

    ngOnInit() {
    }


    onFavourite() {
        if (this.favourite.favouriteItems[0] == null) {
            this.favourite.favouriteItems[0] = this.item;
        } else {
            this.favourite.favouriteItems.push(this.item);
        }
        localStorage.setItem('favourite-items', JSON.stringify(this.favourite.favouriteItems));
        this.toastr.success('Your item was added to favourite', 'Success!');
    }

    onCart() {
        this.favourite.favouriteItems = [null];
        localStorage.setItem('favourite-items', null);
    }
}
