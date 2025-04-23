import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tests = [];

  constructor(private notification: NzNotificationService,
    private testService: AdminService
  ){

  }

  ngOnInit(){
    this.getAllTests();
  }

  getAllTests(){
    this.testService.getAllTests().subscribe(res=>{
      this.tests = res;
    }, error => {
      this.notification.error("ERROR", `Somethins went wrong`, {nzDuration: 5000});
    })
  }

  getFormattedTime(time): string{
    const seconds = time % 60;
    const minutes = Math.floor(time/60);
    return `${minutes} minutes ${seconds} seconds`;
  }
}
