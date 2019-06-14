import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'FirebaseTask';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBtvnrGaqcGDYWgEJuFV5Ivt2Gcg03V_qc',
            authDomain: 'fir-task-bb3fd.firebaseapp.com',
        });
    }
}
