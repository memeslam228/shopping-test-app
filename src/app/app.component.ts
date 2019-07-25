import {Component, OnInit} from '@angular/core';
import {AuthService} from './Services/auth/auth.service';
import {BadgeCounterService} from './Services/badge/badge-counter.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'FirebaseTask';
    cart = 0;
    favourite = 0;

    constructor(public authService: AuthService, private counter: BadgeCounterService) {
        this.favourite = this.counter.favouriteCount();
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
    }
}
