import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-admin-dialog',
    templateUrl: './admin-dialog.component.html',
    styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

    form: FormGroup;
    description: string;
    prodName: string;
    price: string;
    title: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
        this.prodName = data.prodName;
        this.price = data.price;
        this.title = data.title;
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
            prodName: [this.prodName, []],
            price: [this.price, []],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}
