import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TestService } from '../../services/test.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tests =[];

  constructor(private notification: NzNotificationService,
    private testService: TestService){}

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
