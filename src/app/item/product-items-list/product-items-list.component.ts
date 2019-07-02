import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ItemCRUDService} from '../../Services/shopping-items/item-crud.service';

@Component({
  selector: 'app-product-items-list',
  templateUrl: './product-items-list.component.html',
  styleUrls: ['./product-items-list.component.css']
})
export class ProductItemsListComponent implements OnInit {

  constructor(private itemCRUD: ItemCRUDService) { }
  items: any;

  getItemsList() {
    // Use snapshotChanges().map() to store the key
    this.itemCRUD.getItemsList().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(items => {
      this.items = items;
    });
  }

  ngOnInit() {
    this.getItemsList();
  }
}
