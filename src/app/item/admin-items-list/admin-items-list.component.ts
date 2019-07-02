import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AdminDialogComponent} from './admin-dialog/admin-dialog.component';
import {Item} from '../../Services/shopping-items/item';
import {ItemCRUDService} from '../../Services/shopping-items/item-crud.service';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-admin-items-list',
    templateUrl: './admin-items-list.component.html',
    styleUrls: ['./admin-items-list.component.css']
})
export class AdminItemsListComponent implements OnInit {

    item: Item = new Item();
    items: any;

    constructor(private dialog: MatDialog, private itemCRUD: ItemCRUDService) {
    }

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: 1,
            title: 'New Product'
        };

        const dialogRef = this.dialog.open(AdminDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                if (data != null) {
                    this.item = new Item();
                    this.item.description = data.description;
                    this.item.name = data.prodName;
                    this.item.price = data.price;
                    this.item.photoUrl = data.imageUrl;
                    this.itemCRUD.createItem(this.item);
                }
            }
        );
    }

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
