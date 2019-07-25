import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {CartArray} from '../../items-cart/cart-array';


@Injectable({
    providedIn: 'root'
})
export class BadgeCounterService {
    favourite = 0;
    cart = 0;
    dbPath: string;
    idArray: string[] = [null];
    dbObject: AngularFireObject<CartArray> = null;
    uId: any;


    constructor(private db: AngularFireDatabase) {
        this.cartUpdate();
        this.favouriteCount();
    }

    favouriteInc() {
        this.favourite++;
    }


    favouriteDec() {
        this.favourite--;
    }


    favouriteCount() {
        const array = JSON.parse(localStorage.getItem('favourite-items'));
        this.favourite = array.length;
    }

    cartUpdate() {
        this.uId = JSON.parse(localStorage.getItem('user'));
        this.dbPath = '/users/' + this.uId.uid;
        this.dbObject = this.db.object(this.dbPath);
        this.dbObject.valueChanges().subscribe(c => {
            if (c != null) {
                this.idArray = JSON.parse(c.cart);
                this.cartCount(this.idArray);
            }
        });
    }

    cartCount(idArray: string[]) {
        this.cart = 0;
        if (idArray[0] != null) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < idArray.length; i++) {
                const arr = idArray[i].split('|');
                this.cart += parseInt(arr[1], 10);
            }
        }
    }


}
