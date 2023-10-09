/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private analytics: AnalyticsService,
              private seoService: SeoService, private translate: TranslateService,
              private router: Router
  ) {
    // init language
    translate.addLangs(['en', 'ar']);
    let lang = localStorage.getItem('lang');
    if(lang && lang != ""){
      translate.setDefaultLang( lang ); // Fallback
      translate.use( lang );
    }else{
      translate.setDefaultLang( 'ar' ); // Fallback
      translate.use( 'ar' );
      localStorage.setItem('lang','ar');
    }

    const bodyTag = document.body;
    setTimeout(()=>{
      if(this.translate.currentLang != 'ar'){
        bodyTag.classList.remove('rtl');
        document.dir = 'ltr';
      }else{
        bodyTag.classList.add('rtl');
        document.dir = 'rtl'
      }
    },1000);


    router.events.subscribe((val) => {
      // see also
      val instanceof NavigationEnd;
      if(val['url'] == '/auth/logout'){
        localStorage.clear();
      }
    });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  ngAfterViewInit(){

  }
}
