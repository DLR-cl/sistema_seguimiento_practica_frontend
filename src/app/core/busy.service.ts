import { Injectable, signal } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = signal(0);
  constructor(
    private spinnerService: NgxSpinnerService
  ) { }

  busy(){
    this.busyRequestCount.update( (current: number): number => current + 1);
    this.spinnerService;
    this.spinnerService.show(undefined, {
      type: 'ball-scale-ripple',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#fff',
      size: 'default'
    });
  }

  idle(){
    this.busyRequestCount.update( (current:number ): number => current - 1);
    if(this.busyRequestCount() <= 0){
      this.busyRequestCount.set(0);
      this.spinnerService.hide();
    };
  }
}
