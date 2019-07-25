import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {CartArray} from '../../items-cart/cart-array';
import {Item} from './item';
import {map} from 'rxjs/operators';
import {BadgeCounterService} from '../badge/badge-counter.service';

@Injectable({
    providedIn: 'root'
})
export class CartDatabaseService {

    constructor(private db: AngularFireDatabase, private badge: BadgeCounterService) {
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
                    const dbArray = this.idArray[k].split('|');
                    if (items[i].key === dbArray[0]) {
                        if (itemms[0] === null) {
                            itemms[0] = items[i];
                            itemms[0].number = dbArray[1];
                        } else {
                            items[i].number = dbArray[1];
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
            this.badge.cartCount(this.idArray);
            return 'done';
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.idArray.length; i++) {
                const key = id.split('|');
                const arrKey = this.idArray[i].split('|');
                if (arrKey[0] === key[0]) {
                    const newNumber: number = parseInt(arrKey[1], 10) + parseInt(key[1], 10);
                    this.idArray[i] = key[0] + '|' + newNumber;
                    this.cartarray.cart = JSON.stringify(this.idArray);
                    this.dbObject.update({cart: this.cartarray.cart});
                    this.bool = true;
                }
            }
            if (this.bool === true) {
                this.badge.cartCount(this.idArray);
                return 'nbrUpdate';
            } else {
                this.idArray.push(id);
                this.cartarray.cart = JSON.stringify(this.idArray);
                this.dbObject.update({cart: this.cartarray.cart});
                this.badge.cartCount(this.idArray);
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
            const key = this.idArray[i].split('|');
            if (key[0] === id) {
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
        this.badge.cartCount(this.idArray);
        return itemms;
    }
}
