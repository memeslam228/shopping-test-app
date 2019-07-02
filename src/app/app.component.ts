import {Component, OnInit} from '@angular/core';
import {AuthService} from './Services/auth/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'FirebaseTask';

    constructor(public authService: AuthService) {

    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
    }
}
