import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { ServerDataSource} from 'ng2-smart-table';
import { HttpHeaders} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import {CustomServerDataSource} from "./serve.data-source";
import {AppHttpService} from "../../../@core/utils/http.service";


@Component({
  selector: 'ngx-members-attendance-component',
  styleUrls: ['./members-attendance.component.scss'],
  templateUrl: './members-attendance.component.html',
})

export class MembersAttendanceComponent implements AfterViewInit{
  totalMemebrs = 0;
  settings = {
    actions: false,
    pager:{
      perPage: 20
    },
    columns: {
      member_id: {
        title: 'Member ID',
        type: 'number',
      },
      name: {
        title: 'Member Name',
        type: 'string',
      },
      phone: {
        title: 'Telephone',
        type: 'string',
      },
      attended: {
        title: 'Attended',
        type: 'custom',
        filter: false,
        width: '10px',
        renderComponent: CustomCheckboxComponent

      },
    },
  };

  source: ServerDataSource;
  token: string;
  headers;

  constructor(private httpClient: HttpClient, private authService: NbAuthService, private appHttpService: AppHttpService){
    this.token = '';

    this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.token = token.getValue(); // here we receive a payload from the token and assigns it to our `user` variable
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        });
      }
    });

    this.source = new CustomServerDataSource(httpClient, {
      endPoint: '/members_attandance/members_attendece_by_date.php',
    }, appHttpService);



  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.totalMemebrs = this.source.count();
    },500);

  }

}
