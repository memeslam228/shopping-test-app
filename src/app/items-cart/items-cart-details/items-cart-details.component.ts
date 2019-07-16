import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../Services/shopping-items/item';
import {ToastrService} from 'ngx-toastr';
import {ItemsCartComponent} from '../items-cart.component';

@Component({
    selector: 'app-items-cart-details',
    templateUrl: './items-cart-details.component.html',
    styleUrls: ['./items-cart-details.component.css']
})
export class ItemsCartDetailsComponent implements OnInit {

    constructor(private toastr: ToastrService, private cart: ItemsCartComponent) {
    }

    @Input()
    item: Item;

    deleteItem() {
        this.cart.deleteItem(this.item.key);
        this.toastr.info('Item was deleted from cart!');
    }

    ngOnInit() {
    }

}
