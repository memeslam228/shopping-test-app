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

    constructor(public authService: AuthService, private counter: BadgeCounterService) {
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
    }
}
