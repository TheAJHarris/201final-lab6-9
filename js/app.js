'use strict';

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let myForm = document.getElementById('form');
let storeTable = document.getElementById('storeInfo');


let stores = [];

function Store(name, min, max, avg) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hourSalesArr = [];
  this.dailySalesTotal = 0;
  stores.push(this);
}

Store.prototype.getRandomCustomerNumber = function(){
  return Math.floor(Math.random() * (this.max - this.min) + this.min);
};

Store.prototype.calculateHourlySales = function(){
  for (let i = 0; i < hours.length; i++) {
    let calcSalesRoundedUp = Math.ceil(this.getRandomCustomerNumber() * this.avg);
    this.hourSalesArr.push(calcSalesRoundedUp);
    this.dailySalesTotal += calcSalesRoundedUp;
  }
};


Store.prototype.renderTable = function(){
  this.calculateHourlySales();
  let trElement = document.createElement('tr');

  let tdElement = document.createElement('td');
  tdElement.textContent = this.name;
  trElement.appendChild(tdElement);

  for (let i = 0; i < hours.length; i++){
    tdElement = document.createElement('td');
    tdElement.textContent = this.hourSalesArr[i];
    trElement.appendChild(tdElement);
  }
  tdElement = document.createElement('td');
  tdElement.textContent = this.dailySalesTotal;
  trElement.appendChild(tdElement);
  storeTable.appendChild(trElement);
};

new Store('Seattle', '23', '65', '6.3');
new Store('Tokyo', '3', '24', '1.2');
new Store('Dubai', '11', '38', '3.7');
new Store('Paris', '20', '38', '2.3');
new Store('Lima', '2', '16', '4.6');
// console.log('store array: ', stores);

function renderHeader() {
  let trElement = document.createElement('tr');
  let thElement = document.createElement('th');
  thElement.textContent = 'Locations';
  trElement.appendChild(thElement);

  for (let i = 0; i < hours.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.textContent = hours[i];
    trElement.appendChild(tdElement);
  }
  thElement = document.createElement('th');
  thElement.textContent = 'Total';
  trElement.appendChild(thElement);
  storeTable.appendChild(trElement);
}

function renderFooter(){
  let trElement = document.createElement('tr');
  let thElement = document.createElement('th');
  thElement.textContent = 'Hourly Totals';
  trElement.appendChild(thElement);
  let totalOfTotals = 0;
  let hourlyTotals = 0;
  for (let i = 0; i < hours.length; i++){
    hourlyTotals = 0;
    for (let j = 0; j < stores.length; j++){
      hourlyTotals += stores[j].hourSalesArr[i];
      totalOfTotals += stores[j].hourSalesArr[i];
    }
    thElement = document.createElement('th');
    thElement.textContent = hourlyTotals;
    trElement.appendChild(thElement);
  }
  thElement = document.createElement('th');
  thElement.textContent = totalOfTotals;
  trElement.appendChild(thElement);
  storeTable.appendChild(trElement);
}

function storeSubmit(event) {
  event.preventDefault();
  console.log(event, 'event');
  let storeName = event.target.store.value;
  let storeMin = parseInt(event.target.min.value);
  let storeMax = parseInt(event.target.max.value);
  let storeAvg = parseInt(event.target.avg.value);
  console.log(storeName, storeMin, storeMax, storeAvg);
  new Store(storeName, storeMin, storeMax, storeAvg);
  renderStore();
}

function renderStore(){
  storeTable.innerHTML='';
  renderHeader();
  for (let i = 0; i < stores.length; i++) {
    stores[i].renderTable();
  }
  renderFooter();
}

renderStore();


myForm.addEventListener('submit', storeSubmit);