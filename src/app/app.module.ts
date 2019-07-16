import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import { CommonModule } from '@angular/common';
import {SinginComponent} from './auth/singin/singin.component';
import {SingupComponent} from './auth/singup/singup.component';
import {AuthService} from './Services/auth/auth.service';
import {
    MatButtonModule, MatCardModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import {ProductItemsListComponent} from './item/product-items-list/product-items-list.component';
import {AdminItemsListComponent} from './item/admin-items-list/admin-items-list.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AdminDialogComponent} from './item/admin-items-list/admin-dialog/admin-dialog.component';
import {AdminItemDetailComponent} from './item/admin-items-list/admin-item-detail/admin-item-detail.component';
import { FooterComponent } from './footer/footer.component';
import { ProductItemDetailsComponent } from './item/product-items-list/product-item-details/product-item-details.component';
import { ItemsFavouriteComponent } from './items-favourite/items-favourite.component';
import { ItemsCartComponent } from './items-cart/items-cart.component';
import { ItemsFavouriteDetailsComponent } from './items-favourite/items-favourite-details/items-favourite-details.component';
import { ItemsCartDetailsComponent } from './items-cart/items-cart-details/items-cart-details.component';

@NgModule({
    declarations: [
        AppComponent,
        SinginComponent,
        SingupComponent,
        ProductItemsListComponent,
        AdminItemsListComponent,
        AdminDialogComponent,
        AdminItemDetailComponent,
        FooterComponent,
        ProductItemDetailsComponent,
        ItemsFavouriteComponent,
        ItemsCartComponent,
        ItemsFavouriteDetailsComponent,
        ItemsCartDetailsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ToastrModule.forRoot(),
        AngularFireDatabaseModule,
        NgbModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        MatFormFieldModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        AngularFireStorageModule,
        MatProgressBarModule,
        MatDividerModule,
        MatExpansionModule,
        MatCardModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
    entryComponents: [AdminDialogComponent]
})
export class AppModule {
}
