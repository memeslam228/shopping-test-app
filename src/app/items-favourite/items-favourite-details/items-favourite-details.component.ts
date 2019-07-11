import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../Services/shopping-items/item';
import {ItemsFavouriteComponent} from '../items-favourite.component';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-items-favourite-details',
    templateUrl: './items-favourite-details.component.html',
    styleUrls: ['./items-favourite-details.component.css']
})
export class ItemsFavouriteDetailsComponent implements OnInit {

    @Input()
    item: Item;

    constructor(private favourite: ItemsFavouriteComponent, private toastr: ToastrService) {
    }

    ngOnInit() {
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
