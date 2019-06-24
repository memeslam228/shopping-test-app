import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {SingupComponent} from './auth/singup/singup.component';
import {SinginComponent} from './auth/singin/singin.component';
import {ProductItemsListComponent} from './item/product-items-list/product-items-list.component';
import {AdminItemsListComponent} from './item/admin-items-list/admin-items-list.component';
import {AuthGuard} from './Services/auth/auth-guard.service';

const appRoutes: Routes = [
    {path: 'signup', component: SingupComponent},
    {path: 'signin', component: SinginComponent},
    {path: 'products', component: ProductItemsListComponent},
    {path: 'admin', component: AdminItemsListComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {
}
