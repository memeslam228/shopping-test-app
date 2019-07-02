import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ItemCRUDService} from '../../../Services/shopping-items/item-crud.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Item} from '../../../Services/shopping-items/item';

@Component({
    selector: 'app-product-item-details',
    templateUrl: './product-item-details.component.html',
    styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent implements OnInit {

    constructor(private toastr: ToastrService, private itemCRUD: ItemCRUDService, private storage: AngularFireStorage) {

    }

    @Input() item: Item;

    ngOnInit() {
    }

}
