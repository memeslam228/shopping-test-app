import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {AuthService} from './Services/auth/auth.service';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {ProductItemsListComponent} from './item/product-items-list/product-items-list.component';
import {AdminItemsListComponent} from './item/admin-items-list/admin-items-list.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
        SinginComponent,
        SingupComponent,
        ProductItemsListComponent,
        AdminItemsListComponent,
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
        AppRoutingModule,
        RouterModule,
        MatFormFieldModule,
        MatDialogModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
