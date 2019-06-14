import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {AuthService} from './auth/auth.service';

const appRoutes: Routes = [
    {path: 'signup', component: SingupComponent},
    {path: 'signin', component: SinginComponent}
];

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
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
