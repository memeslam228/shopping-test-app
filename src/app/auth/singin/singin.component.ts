import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../Services/auth/auth.service';

@Component({
    selector: 'app-singin',
    templateUrl: './singin.component.html',
    styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSignin(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.singinUser(email, password);

    }

}
