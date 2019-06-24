import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-items-list',
  templateUrl: './admin-items-list.component.html',
  styleUrls: ['./admin-items-list.component.css']
})
export class AdminItemsListComponent implements OnInit {

  constructor() { }

    openDialog() {
      alert('Poka tak');
    }

  ngOnInit() {
  }

}
