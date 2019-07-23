import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {CartArray} from '../../items-cart/cart-array';
import {Item} from './item';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartDatabaseService {

    constructor(private db: AngularFireDatabase) {
    }

    bool: boolean;
    private dbPath: string;
    idArray: string[] = [null];
    dbObject: AngularFireObject<CartArray> = null;
    cartarray: CartArray = new CartArray();
    itemsRef: AngularFireList<Item> = null;

    setPath(uId: any) {
        this.dbPath = '/users/' + uId;
        this.dbObject = this.db.object(this.dbPath);
        this.itemsRef = this.db.list('/items');
    }

    updateId() {
        this.dbObject.valueChanges().subscribe(c => {
            if (c != null) {
                this.idArray = JSON.parse(c.cart);
            }
        });
    }


    getItemsList(itemms: Item[]): Item[] {
        // Use snapshotChanges().map() to store the key
        this.itemsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(items => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < items.length; i++) {
                // tslint:disable-next-line:prefer-for-of
                for (let k = 0; k < this.idArray.length; k++) {
                    if (items[i].key === this.idArray[k]) {
                        if (itemms[0] === null) {
                            itemms[0] = items[i];
                        } else {
                            itemms.push(items[i]);
                        }
                    }
                }
            }
        });
        return itemms;
    }

    addToCard(id: string): string {
        this.bool = false;
        if (this.idArray[0] == null) {
            this.idArray[0] = id;
            this.cartarray.cart = JSON.stringify(this.idArray);
            this.dbObject.set(this.cartarray);
            return 'done';
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.idArray.length; i++) {
                if (this.idArray[i] === id) {
                    this.bool = true;
                }
            }
            if (this.bool === true) {
                return 'duplicate';
            } else {
                this.idArray.push(id);
                this.cartarray.cart = JSON.stringify(this.idArray);
                this.dbObject.update({cart: this.cartarray.cart});
                return 'done';
            }
        }
    }

    deleteItem(id: string, itemms: Item[]): Item[] {
        for (let i = 0; i < itemms.length; i++) {
            if (itemms[i].key === id) {
                itemms.splice(i, 1);
            }
        }
        if (!itemms[0]) {
            itemms = [null];
        }
        for (let i = 0; i < this.idArray.length; i++) {
            if (this.idArray[i] === id) {
                this.idArray.splice(i, 1);
                if (this.idArray[0]) {
                    this.cartarray.cart = JSON.stringify(this.idArray);
                    this.dbObject.update({cart: this.cartarray.cart});
                } else {
                    this.dbObject.remove();
                    this.idArray = [null];
                }
            }
        }
        return itemms;
    }
}
