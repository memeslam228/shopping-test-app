import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../Services/shopping-items/item';
import {ItemsFavouriteComponent} from '../items-favourite.component';
import {ToastrService} from 'ngx-toastr';
import {ItemsCartComponent} from '../../items-cart/items-cart.component';

@Component({
    selector: 'app-items-favourite-details',
    templateUrl: './items-favourite-details.component.html',
    styleUrls: ['./items-favourite-details.component.css']
})
export class ItemsFavouriteDetailsComponent implements OnInit {

    @Input()
    item: Item;
    number = '1';

    constructor(private favourite: ItemsFavouriteComponent, private toastr: ToastrService, private cart: ItemsCartComponent) {
    }

    ngOnInit() {
    }

    numberChange(smth: string) {
        this.number = smth;
    }

    addCart() {
        if (this.cart.addToCard(this.item.key += '|' + this.number) === 'done') {
            this.toastr.success('Your item was added to Cart', 'Success!');
        } else {
            this.toastr.info('Item was updated');
        }
        const boolKey = this.item.key.split('|');
        this.item.key = boolKey[0];
    }

    deleteItem() {
        for (let i = 0; i < this.favourite.favouriteItems.length; i++) {
            if (this.favourite.favouriteItems[i].name === this.item.name) {
                this.favourite.favouriteItems.splice(i, 1);
                localStorage.setItem('favourite-items', JSON.stringify(this.favourite.favouriteItems));
                this.toastr.info('Item was deleted from favourite!');
            }
        }
    }
}
