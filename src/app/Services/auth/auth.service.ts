import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastrService} from 'ngx-toastr';
import {BadgeCounterService} from '../badge/badge-counter.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    userData: any;

    constructor(private router: Router,
                public afAuth: AngularFireAuth,
                private toastr: ToastrService,
                private badge: BadgeCounterService) {

        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user; // Setting up user data in userData var
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    signupUser(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.userData = this.afAuth.auth.currentUser;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['/']);
                    this.badge.cartUpdate();
                }
            )
            .catch(
                error => this.toastr.error(error)
            );
    }


    singinUser(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.userData = this.afAuth.auth.currentUser;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.badge.cartUpdate();
                    this.router.navigate(['/']);
                    this.afAuth.auth.currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        );
                }
            ).catch(
            error => this.toastr.error(error)
        );
    }

    getUid() {
        this.userData = JSON.parse(localStorage.getItem('user'));
        if (this.userData != null) {
            return this.userData.uid;
        }
    }


    logout() {
        this.afAuth.auth.signOut();
        localStorage.removeItem('user');
        this.token = null;
        this.badge.cart = 0;
        this.router.navigate(['/signin']);
    }

    isAuthenticated() {
        return this.afAuth.auth.currentUser != null;
    }

    getEmail() {
        return this.afAuth.auth.currentUser.email;
    }
}
