import {Component, OnDestroy, AfterViewInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { MemebersService } from '../../@core/utils';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, AfterViewInit {

  private alive = true;
  solarValue: number;

  todayAttendanceCount = 0;
  allMembersCount = 0;
  paymentOverdueCount = 0;
  activeMemberCount = 0;

  todayAttendanceCard: CardSettings = {
    title: 'Today Attendance',
    iconClass: 'log-in',
    type: 'success',
  };

  allMembersCard: CardSettings = {
    title: 'All Members',
    iconClass: 'people-outline',
    type: 'warning',
  };

  activeMemberCard: CardSettings = {
    title: 'Active Members',
    iconClass: 'person-done-outline',
    type: 'primary',
  };

  paymentOverdueCard: CardSettings = {
    title: 'Payment Overdue',
    iconClass: 'alert-triangle-outline',
    type: 'danger',
  };

  options: any = {};

  themeSubscription: any;

  constructor(private theme: NbThemeService,
              private solarService: SolarData, private memebersService: MemebersService) {

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });


      this.fillDashboards();

  }

  fillDashboards(){

    this.memebersService.membersAttandanceCount().subscribe((data)=>{
      this.todayAttendanceCount = data['document']['total_count'];
    });

    this.memebersService.allMembersCount().subscribe((data)=>{
      this.allMembersCount = data['document']['total_count'];
    });

    this.memebersService.paymentOverdueCount().subscribe((data)=>{
      this.paymentOverdueCount = data['document']['total_count'];
    });

    this.memebersService.activeMembersCount().subscribe((data)=>{
      this.activeMemberCount = data['document']['total_count'];
    });

  }



  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {


      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;



      this.memebersService.membersAttandanceCountCurrentYear().subscribe((data)=>{
        let dateAtt: Map<string,number> = new Map<string, number>();
        let count = [];
        let dates = [];
        data['document']['records'].forEach(item=>{
          dates.push(item['date']);
          count.push(item['count']);
        });



        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: dates,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: 'Score',
              type: 'bar',
              barWidth: '60%',
              data: count,
            },
          ],
        };

      });




    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.themeSubscription.unsubscribe();
  }



}
