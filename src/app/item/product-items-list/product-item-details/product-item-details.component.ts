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

    bool: boolean;

    ngOnInit() {
    }


    onFavourite() {
        if (JSON.parse(localStorage.getItem('favourite-items'))) {
            this.favourite.favouriteItems = JSON.parse(localStorage.getItem('favourite-items'));
        }
        this.bool = false;
        if (this.favourite.favouriteItems[0] == null) {
            this.favourite.favouriteItems[0] = this.item;
            localStorage.setItem('favourite-items', JSON.stringify(this.favourite.favouriteItems));
            this.toastr.success('Your item was added to favourite', 'Success!');
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.favourite.favouriteItems.length; i++) {
                if (this.favourite.favouriteItems[i].name === this.item.name) {
                    this.bool = true;
                }
            }
            if (this.bool) {
                this.toastr.warning('This item was added before');
            } else {
                this.favourite.favouriteItems.push(this.item);
                localStorage.setItem('favourite-items', JSON.stringify(this.favourite.favouriteItems));
                this.toastr.success('Your item was added to favourite', 'Success!');
            }
        }
    }

    onCart() {
        this.favourite.favouriteItems = [null];
        localStorage.setItem('favourite-items', null);
    }
}
