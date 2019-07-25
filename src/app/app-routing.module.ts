import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {SingupComponent} from './auth/singup/singup.component';
import {SinginComponent} from './auth/singin/singin.component';
import {ProductItemsListComponent} from './item/product-items-list/product-items-list.component';
import {AdminItemsListComponent} from './item/admin-items-list/admin-items-list.component';
import {AuthGuard} from './Services/auth/auth-guard.service';
import {ItemsFavouriteComponent} from './items-favourite/items-favourite.component';
import {ItemsCartComponent} from './items-cart/items-cart.component';
import {ItemPageComponent} from './item-page/item-page.component';

const appRoutes: Routes = [
    {path: 'signup', component: SingupComponent},
    {path: 'signin', component: SinginComponent},
    {path: 'products', component: ProductItemsListComponent},
    {path: 'admin', component: AdminItemsListComponent, canActivate: [AuthGuard]},
    {path: 'favourites', component: ItemsFavouriteComponent},
    {path: 'cart', component: ItemsCartComponent},
    {path: 'item/:id', component: ItemPageComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', component: ProductItemsListComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {
}
