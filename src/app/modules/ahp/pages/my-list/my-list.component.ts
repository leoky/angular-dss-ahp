import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  myList = ['sdssd', '2d1e12d', 'sdj1k2jdl'];

  constructor() { }

  ngOnInit() {
  }

  delete(id: string) {

  }
}
