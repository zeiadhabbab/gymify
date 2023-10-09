import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { TranslateService } from "@ngx-translate/core";
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent extends NbLoginComponent {

    constructor(service: NbAuthService,
                @Inject(NB_AUTH_OPTIONS) options:{},
                cd: ChangeDetectorRef, router: Router, public translate: TranslateService) {
        super(service, options, cd, router);
    }

    selectedItem = this.translate.currentLang;


    changeLanguage(event){
        const bodyTag = document.body;
        if(this.selectedItem == 'en'){
            this.translate.use('en');
            bodyTag.classList.remove('rtl');
            document.dir = 'ltr';
            localStorage.setItem('lang','en');
        }else{
            this.translate.use('ar');
            bodyTag.classList.add('rtl');
            document.dir = 'rtl'
            localStorage.setItem('lang','ar');
        }
    }
}