import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { ExcelService } from './services/excel.service';

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
  currentItem: any;
  itemList = [];
  data: any = []

  constructor(private excelService: ExcelService) { }

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
      this.currentItem = new ItemComponent()
      this.currentItem.setItem(itemName, Number(itemPrice));
      this.itemList.push(this.currentItem);
      this.spendingTotal -= Number((<HTMLInputElement>document.getElementById('inputPrice')).value);
      this.solveNet();
      (<HTMLInputElement>document.getElementById('inputName')).value = '';
      (<HTMLInputElement>document.getElementById('inputPrice')).value = '';
      this.validName = true;
      this.validPrice = true;
      this.addToJSON(itemName, itemPrice);
    }
  }

  addToJSON(itemName, itemPrice) {
    var jsonData = {
      "Name": itemName,
      "Price": itemPrice
    };
    this.data.push(jsonData);
  }

  // Updates total
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

  // Solves for net total
  solveNet(): void {
    this.net = this.deposit + this.spendingTotal + this.withdrawal; //It is + because spendingTotal is already negative
  }

  // Exports to pdf
  export() {
    // Add net total
    var jsonData = {
      "Name": null,
      "Price": null,
      "Deposit": this.deposit,
      "Withdrawal": this.withdrawal,
      "Net": this.net
    };
    this.data.push(jsonData);
    this.excelService.exportAsExcelFile(this.data, 'Budget');
  }
}
