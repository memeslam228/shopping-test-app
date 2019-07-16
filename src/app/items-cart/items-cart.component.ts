import {Component, OnInit, Injectable} from '@angular/core';
import {AuthService} from '../Services/auth/auth.service';
import {CartArray} from './cart-array';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Item} from '../Services/shopping-items/item';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-items-cart',
    templateUrl: './items-cart.component.html',
    styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {
    bool: boolean;

    private dbPath = '/users/' + this.authServ.getUid();
    idArray: string[] = [null];
    dbObject: AngularFireObject<CartArray> = null;
    cartarray: CartArray = new CartArray();
    items: Item[] = [null];
    itemsRef: AngularFireList<Item> = null;

    constructor(private authServ: AuthService, private db: AngularFireDatabase) {
        this.dbObject = this.db.object(this.dbPath);
        this.itemsRef = db.list('/items');
    }

    getItemsList() {
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
                        if (this.items[0] === null) {
                            this.items[0] = items[i];
                        } else {
                            this.items.push(items[i]);
                        }
                    }
                }
            }
        });
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

    deleteItem(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].key === id) {
                this.items.splice(i, 1);
            }

        }
        if (!this.items[0]) {
            this.items[0] = null;
        }
        for (let i = 0; i < this.idArray.length; i++) {
            if (this.idArray[i] === id) {
                this.idArray.splice(i, 1);
                if (this.idArray[0]) {
                    this.cartarray.cart = JSON.stringify(this.idArray);
                    this.dbObject.update({cart: this.cartarray.cart});
                } else {
                    this.dbObject.remove();
                    this.idArray[0] = null;
                }
            }
        }
    }


    ngOnInit() {
        this.dbObject.valueChanges().subscribe(c => {
            if (c != null) {
                this.idArray = JSON.parse(c.cart);
            }
        });
        this.getItemsList();
    }

}
