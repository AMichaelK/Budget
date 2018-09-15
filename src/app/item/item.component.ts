import { Component, OnInit, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
@Injectable()
export class ItemComponent implements OnInit {

  constructor(
    public name: string,
    public cost: number) { }

  ngOnInit() {
  }

}
