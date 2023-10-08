import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { TranslateService } from "@ngx-translate/core";
import { CurrentUser } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { UserService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;

  user: CurrentUser = {
    firstName : "",
    lastName : "",
    id: 0,
  };

  themes = [
    {
      value: 'default',
      name: 'default',
    },
    {
      value: 'dark',
      name: 'dark',
    }
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out', link: '/auth/logout' } ];



  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private userService: UserService,
              private breakpointService: NbMediaBreakpointsService,
              public translate: TranslateService) {

        this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {

          if (token.isValid()) {
            let data = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
            this.user.firstName= data['data']['first_name'];
            this.user.lastName = data['data']['last_name'];
            this.user.id = data['data']['id'];

            /*Put user Information*/
            this.userService.setCurrentUser(this.user);
          }


        });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  changeLanguage(currentLang){
    const bodyTag = document.body;
    if(currentLang == 'ar'){
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
