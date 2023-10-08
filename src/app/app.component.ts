/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private translate: TranslateService) {
    // init language
    translate.addLangs(['en', 'ar']);
    let lang = localStorage.getItem('lang');
    debugger;
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


  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
