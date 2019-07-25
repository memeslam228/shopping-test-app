import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {CartArray} from '../../items-cart/cart-array';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
    providedIn: 'root'
})
export class BadgeCounterService {
    favourite = 0;
    cart = 0;
    dbPath: string;
    idArray: string[] = [null];
    dbObject: AngularFireObject<CartArray> = null;


    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
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

    getUid() {
        const uId = JSON.parse(localStorage.getItem('user'));
        if (uId != null) {
            return uId.uid;
        }
    }

    cartUpdate() {
        this.dbPath = '/users/' + this.getUid();
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
