import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemCRUDService} from '../Services/shopping-items/item-crud.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-item-page',
    templateUrl: './item-page.component.html',
    styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

    key: string;
    item: any;

    constructor(private route: ActivatedRoute, private itemCRUD: ItemCRUDService) {
    }

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('id');
        this.itemCRUD.getItemsList().snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(items => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < items.length; i++) {
                if (items[i].key === this.key) {
                    this.item = items[i];
                }
            }
        });
    }

}
