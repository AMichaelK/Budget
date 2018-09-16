import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  public name: string
  public cost: number
  constructor() { }

  ngOnInit() {
  }

  setItem(name, cost){
    this.name = name;
    this.cost = cost;
  }

}
