import {Component, OnInit, Injectable} from '@angular/core';
import {AuthService} from '../Services/auth/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Item} from '../Services/shopping-items/item';
import {CartDatabaseService} from '../Services/shopping-items/cart-database.service';

@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-items-cart',
    templateUrl: './items-cart.component.html',
    styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {
    constructor(private authServ: AuthService, private db: AngularFireDatabase, private cartDb: CartDatabaseService) {
        cartDb.setPath(this.authServ.getUid());
    }

    items: Item[] = [null];

    addToCard(id: string): string {
        return this.cartDb.addToCard(id);
    }

    deleteItem(id: string) {
        this.cartDb.deleteItem(id, this.items);
    }

    ngOnInit() {
        this.cartDb.updateId();
        this.items = this.cartDb.getItemsList(this.items);
    }

}
