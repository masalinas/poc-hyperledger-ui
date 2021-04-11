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
      
      this.tradesBuy = this.trades.filter(trade => trade.tradeType === 'Buy'); 
      this.tradesBuy.sort((a, b) => {
        return  b.price - a.price || new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      });

      this.tradesSell = this.trades.filter(trade => trade.tradeType === 'Sell');
      this.tradesSell.sort((a, b) => {
        return  a.price - b.price || new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      });
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
