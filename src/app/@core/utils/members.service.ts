import { Injectable } from '@angular/core';
import { AppHttpService } from "./http.service";

@Injectable()
export class MemebersService   {

  constructor(private httpService: AppHttpService){

  }

  public membersAttandanceCount(){
    return this.httpService.get(`members_attandance/read_count.php`);
  }


  public membersAttandanceCountCurrentYear(){
    return this.httpService.get(`members_attandance/members_attandance_month.php`);
  }

  public allMembersCount(){
    return this.httpService.get(`members/read_count.php`);
  }

  public activeMembersCount(){
    return this.httpService.get(`members/read_count.php?status=Enable`);
  }

  public paymentOverdueCount(){
    return this.httpService.get(`payments/payment_overdue.php`);
  }

  public changeMemberAttendedStatus(date, memberId ){
    return this.httpService.get(`members_attandance/payment_overdue.php`);
  }

}
