import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  key: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id');
  }

}
