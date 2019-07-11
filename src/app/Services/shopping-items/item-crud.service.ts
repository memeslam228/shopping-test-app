import {Injectable} from '@angular/core';
import {Item} from './item';
import {AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ItemCRUDService {
    private dbPath = '/items';

    itemsRef: AngularFireList<Item> = null;

    constructor(private db: AngularFireDatabase, private toastr: ToastrService) {
        this.itemsRef = db.list(this.dbPath);
    }

    createItem(item: Item): void {
        this.itemsRef.push(item);
    }


    updateItem(key: string, value: any): void {
        this.itemsRef.update(key, value).catch(error => this.handleError(error));
    }

    deleteItem(key: string): void {
        this.itemsRef.remove(key).catch(error => this.handleError(error));
    }

    getItemsList(): AngularFireList<Item> {
        return this.itemsRef;
    }

    deleteAll(): void {
        this.itemsRef.remove().catch(error => this.handleError(error));
    }

    private handleError(error) {
        this.toastr.error(error);
    }


}
