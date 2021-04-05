import { Component, OnDestroy } from '@angular/core';
import { navItems } from '../../_nav';

import { NgEventBus } from 'ng-event-bus';

import { MessageService, MenuItem } from 'primeng/api';

import { EventSeverity } from '../../shared/enums/EventSeverity.enum'
import { EventType } from '../../shared/enums/EventType.enum'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [MessageService]
})
export class DefaultLayoutComponent implements OnDestroy{
  public sidebarMinimized = false;
  public navItems = navItems;
  public subscriptionMessage: any;
  public eventType = EventType;
  public eventSeverity = EventSeverity;

  constructor(private eventBus: NgEventBus,
              private messageService: MessageService) {
    // subscribe to message events
    this.subscriptionMessage = this.eventBus.on(this.eventType.MESSAGE).subscribe((event: any)=>{
      if (event.data.severity === this.eventSeverity.INFO) {
        this.messageService.add({severity: 'success', summary: event.data.tittle, detail: event.data.message});
      } else if (event.data.severity === this.eventSeverity.WARNING) {
        this.messageService.add({severity: 'warn', summary: event.data.title, detail: event.data.message});
      } else {
        this.messageService.add({severity: 'error', summary: event.data.title, detail: event.data.error});
      }    
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnDestroy(): void {
    if (this.subscriptionMessage)
      this.subscriptionMessage.unsubscribe();
  }
}
