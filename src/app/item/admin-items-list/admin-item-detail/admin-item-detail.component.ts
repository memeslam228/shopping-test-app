import {Component, OnInit, Input} from '@angular/core';
import {Item} from '../../../Services/shopping-items/item';
import {ItemCRUDService} from '../../../Services/shopping-items/item-crud.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-admin-item-detail',
    templateUrl: './admin-item-detail.component.html',
    styleUrls: ['./admin-item-detail.component.css']
})
export class AdminItemDetailComponent implements OnInit {

    @Input() item: Item;
    descriptionThis: string;
    priceThis: string;
    nameThis: string;

    constructor(private itemCRUD: ItemCRUDService, private storage: AngularFireStorage) {
    }

    ngOnInit() {
    }

    onChgDesc(value: string) {
        this.descriptionThis = value;
    }

    onChgPrice(value: string) {
        this.priceThis = value;
    }

    onChgName(value: string) {
        this.nameThis = value;
    }

    changeItem() {
        if (this.descriptionThis) {
            this.itemCRUD.updateItem(this.item.key, {description: this.descriptionThis});
        }
        if (this.priceThis) {
            this.itemCRUD.updateItem(this.item.key, {price: this.priceThis});
        }
        if (this.nameThis) {
            this.itemCRUD.updateItem(this.item.key, {name: this.nameThis});
        }
    }

    deleteItem() {
        this.storage.storage.refFromURL(this.item.photoUrl).delete();
        this.itemCRUD.deleteItem(this.item.key);
    }

}
