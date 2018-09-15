import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  placeholder = '';
  itemPrice = 0;
  deposit = 0;
  withdrawal = 0;
  currentDeposit = 0;
  currentWithdrawal = 0;
  net = 0;
  spendingTotal = 0;
  validName = true;
  validPrice = true;
  validDeposit = true;
  itemList = [];

  addPurchase(): void {
    let itemName = (<HTMLInputElement>document.getElementById('inputName')).value;
    let itemPrice = (<HTMLInputElement>document.getElementById('inputPrice')).value;
    //validNameation for both name and price entries
    if (!itemName) {
      this.validName = false;
    }
    if (!itemPrice) {
      this.validPrice = false;
    }
    if (itemPrice && itemName) {
      this.itemList.push(new ItemComponent(itemName, Number(itemPrice)));
      this.spendingTotal -= Number((<HTMLInputElement>document.getElementById('inputPrice')).value);
      this.solveNet();
      (<HTMLInputElement>document.getElementById('inputName')).value = '';
      (<HTMLInputElement>document.getElementById('inputPrice')).value = '';
      this.validName = true;
      this.validPrice = true;
    }
  }

  //   onReset(): void {
  //     this.itemList = [];
  //     this.spendingTotal = 0;
  //     this.deposit = 0;
  //     this.net = 0;
  //   }

  onUpdate(): void {

    this.currentDeposit = Number((<HTMLInputElement>document.getElementById('inputDeposit')).value);
    this.currentWithdrawal = Number((<HTMLInputElement>document.getElementById('inputWithdrawal')).value);

    if (this.currentDeposit > 0 || this.currentWithdrawal > 0) {
      this.deposit += this.currentDeposit;
      this.withdrawal -= this.currentWithdrawal;
      this.solveNet();
      (<HTMLInputElement>document.getElementById('inputDeposit')).value = '';
      (<HTMLInputElement>document.getElementById('inputWithdrawal')).value = '';
      this.validDeposit = true;
    }
    else {
      this.validDeposit = false;
    }
  }

  solveNet(): void {
    console.log(this.deposit, this.spendingTotal, this.withdrawal);
    this.net = this.deposit + this.spendingTotal + this.withdrawal; //It is + because spendingTotal is already negative
  }

  //   ngOnInit() {
  //     this.itemList = [
  //       new ItemComponent('Cheetos', 3.50),
  //       new ItemComponent('Talenti', 4.99),
  //       new ItemComponent('Toothbrush', 2.99)
  //     ];
  //     this.spendingTotal = (-3.50 - 4.99 - 2.99);
  //     this.solveNet();
  //   }
  // }
}
