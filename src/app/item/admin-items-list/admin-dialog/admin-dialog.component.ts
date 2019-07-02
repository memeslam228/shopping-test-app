import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

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
    imageUrl: string;
    downloadUrl: any;
    image: string;
    selectedFile: any;
    private ref: any;
    private task: any;
    uploadProgress: any;

    constructor(
        private toastr: ToastrService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminDialogComponent>,
        private afStorage: AngularFireStorage,
        @Inject(MAT_DIALOG_DATA) data) {
        this.title = data.title;
        this.description = data.description;
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
            prodName: [this.prodName, []],
            price: [this.price, []],
            imageUrl: [this.imageUrl, []],
        });
    }

    save() {
        if (this.imageUrl != null) {
            this.form.patchValue({imageUrl: this.imageUrl});
            this.dialogRef.close(this.form.value);
            this.toastr.success('Your item was added', 'Success!');
        } else if (this.imageUrl == null) {
            this.toastr.warning('Please, upload your picked image!');
        }
    }

    close() {
        this.dialogRef.close();
    }

    uploadToLocal(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
            this.image = e.target.result;
        };
        this.selectedFile = event.target.files[0];
    }


    uploadToFS() {
        const randomId = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref('/items/' + randomId);
        this.task = this.ref.put(this.selectedFile);
        this.uploadProgress = this.task.percentageChanges();
        this.task.snapshotChanges().pipe(
            finalize(() => {
                this.downloadUrl = this.ref.getDownloadURL();
                this.downloadUrl.subscribe(downloadURLResponse => {
                    this.imageUrl = downloadURLResponse;
                });
            })
        ).subscribe();
    }

}
