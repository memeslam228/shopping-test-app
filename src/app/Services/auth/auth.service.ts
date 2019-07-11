import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastrService} from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, public afAuth: AngularFireAuth, private toastr: ToastrService) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user; // Setting up user data in userData var
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    token: string;
    userData: any;

    signupUser(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch(
                error => this.toastr.error(error)
            );
    }

    singinUser(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
                response => {
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
        return this.afAuth.auth.currentUser.uid;
    }

    logout() {
        this.afAuth.auth.signOut();
        localStorage.removeItem('user');
        this.token = null;
        this.router.navigate(['/signin']);
    }

    isAuthenticated() {
        return this.afAuth.auth.currentUser != null;
    }

    getEmail() {
        return this.afAuth.auth.currentUser.email;
    }
}
