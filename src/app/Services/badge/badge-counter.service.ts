import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BadgeCounterService {

    constructor() {
    }

    favouriteCount() {
        const array = JSON.parse(localStorage.getItem('favourite-items'));
        return array.length;
    }


}
