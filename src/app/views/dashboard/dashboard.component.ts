import { Component, OnInit } from '@angular/core';

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
  public trades: Trade[];

  constructor(private eventBus: NgEventBus,
              private tradeControllerService: TradeControllerService) {
  }

  ngOnInit(): void {     
  }

  onClick(event) {
    this.tradeControllerService.getAll()
      .subscribe((trades: any) => {
        this.trades = trades;

        console.log (trades);
    },
    err => {
      console.log(err);

      this.eventBus.cast(this.eventType.MESSAGE, {severity: this.eventSeverity.ERROR, title: 'Dashboard', error: err.message});
    });
  }
}
