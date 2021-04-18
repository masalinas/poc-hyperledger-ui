import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { map } from 'rxjs/operators';

import { NgEventBus } from 'ng-event-bus';

import { TradeControllerService } from '../../shared/backend/api/api';
import { Trade } from '../../shared/backend/model/models';

import { EventType } from '../../shared/enums/EventType.enum';
import { EventSeverity } from '../../shared/enums/EventSeverity.enum';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  
  public eventSeverity = EventSeverity;
  public eventType = EventType;  
  public loading: boolean;

  public trades: Trade[];
  public indexTrade: number = 0;
  public actionButton: string = "Buy";
  public actionColor: string = "Green";
  public tradesBuy: Trade[];
  public tradesSell: Trade[];
  public energyTotalOptions: any;
  public energyTotal: any;
  public priceTotalOptions: any;
  public priceTotal: any;

  public tradeSellFormGroup = this.fb.group({
    owner: [''],
    tradeType: [''],
    value: [''],
    price: ['']
  });

  public tradeBuyFormGroup = this.fb.group({
    owner: [''],
    tradeType: [''],
    value: [''],
    price: ['']
  });

  constructor(private eventBus: NgEventBus,
              private fb: FormBuilder,
              private tradeControllerService: TradeControllerService) {
  }

  private getTrades() {
    this.loading = true;

    this.tradeControllerService.getAll().pipe(map((datum) => datum.map((trade: any) => {
      if (trade.creationDate != undefined)
        trade.creationDate = new Date(trade.creationDate);

      return trade;
    }))).subscribe((trades: any) => {
      this.loading = false;
      
      this.trades = trades;

      console.log (trades);
      
      // filter and sort buy trades
      this.tradesBuy = this.trades.filter(trade => trade.tradeType === 'Buy'); 
      this.tradesBuy.sort((a, b) => {
        return  b.price - a.price || new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      });

      // filter and sort sell trades
      this.tradesSell = this.trades.filter(trade => trade.tradeType === 'Sell');
      this.tradesSell.sort((a, b) => {
        return  a.price - b.price || new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      });

      // calculate energy trades
      let totalBuyEnergy: number = 0;
      let totalBuyPrice: number = 0;
      this.tradesBuy.forEach(trade => {
        totalBuyEnergy = totalBuyEnergy + trade.value;        
        totalBuyPrice = Math.round(totalBuyPrice + (trade.value * trade.price));
      });

      let totalSellEnergy: number = 0;
      let totalSellPrice: number= 0;
      this.tradesSell.forEach(trade => {
        totalSellEnergy = totalSellEnergy + trade.value;
        totalSellPrice = Math.round(totalSellPrice + (trade.value * trade.price));
      });

      this.energyTotalOptions = {
        title: {
          display: true,
          text: 'Energy Market',
          fontSize: 16
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + ' Kw';
              }
            }
        }
      }

      this.energyTotal = {
        labels: ['Buy','Sell'],
        datasets: [
            {
                data: [totalBuyEnergy, totalSellEnergy],
                backgroundColor: [
                    "green",
                    "red"
                ],
                hoverBackgroundColor: [
                    "green",
                    "red"
                ]
            }
        ]  
      };
      
      this.priceTotalOptions = {
        title: {
          display: true,
          text: 'Price Market',
          fontSize: 16
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + ' €';
              }
            }
        }  
      }

      this.priceTotal = {
        labels: ['Buy','Sell'],
        options: {
          title: {
              display: true,
              text: 'Chart.js Doughnut Chart'
            }
        },
        datasets: [
            {
                data: [totalBuyPrice, totalSellPrice],
                backgroundColor: [
                    "green",
                    "red"
                ],
                hoverBackgroundColor: [
                    "green",
                    "red"
                ]
            }
        ]    
      };
    },
    err => {
      this.loading = false;

      console.log(err);

      this.eventBus.cast(this.eventType.MESSAGE, {severity: this.eventSeverity.ERROR, title: 'Dashboard', error: err.message});
    });
  }

  ngOnInit(): void {   
    this.getTrades();  
  }

  public onGetTradesClick(event: any) {
    this.getTrades();
  }

  public onTabTradeChange(event: any) {
    if (this.indexTrade === 0)
      this.actionButton = "Buy";    
    else
      this.actionButton = "Sell";    
  }

  public onExecuteTradeClick(event: any) {
    let trade: any

    // create trade
    if (this.indexTrade === 0) {
      trade = this.tradeBuyFormGroup.value;    
      trade.tradeType = "Buy";
    }
    else {
      trade = this.tradeSellFormGroup.value;
      trade.tradeType = "Sell";
    }
      
    console.log(trade);

    // save new trade
    this.loading = true;

    this.tradeControllerService.create(trade)
    .subscribe((result: any) => {
      this.loading = false;
      
      // refresh trades
      this.getTrades();

      this.tradeBuyFormGroup.setValue(null);
    },
    err => {
      this.loading = false;

      console.log(err);

      this.eventBus.cast(this.eventType.MESSAGE, {severity: this.eventSeverity.ERROR, title: 'Dashboard', error: err.message});
    });
  }
}
