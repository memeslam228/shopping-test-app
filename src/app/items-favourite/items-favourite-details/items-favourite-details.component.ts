import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../Services/shopping-items/item';

@Component({
  selector: 'app-items-favourite-details',
  templateUrl: './items-favourite-details.component.html',
  styleUrls: ['./items-favourite-details.component.css']
})
export class ItemsFavouriteDetailsComponent implements OnInit {

  @Input()
  item: Item;

  constructor() { }

  ngOnInit() {
  }

}
