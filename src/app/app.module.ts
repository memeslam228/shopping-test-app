import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {AuthService} from './Services/auth.service';
import {MatButtonModule, MatIconModule} from '@angular/material';

const appRoutes: Routes = [
    {path: 'signup', component: SingupComponent},
    {path: 'signin', component: SinginComponent}
];

// {path: 'signin', component: SinginComponent, canActivate: [AuthGuard]}
@NgModule({
    declarations: [
        AppComponent,
        SinginComponent,
        SingupComponent
    ],
    imports: [
        BrowserModule,
        AngularFireDatabaseModule,
        NgbModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,

        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
