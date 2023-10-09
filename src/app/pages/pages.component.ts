import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { MENU_ITEMS } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu;
  save_menu: NbMenuItem[];

  constructor( private translate: TranslateService ) {
    this.menu = [... MENU_ITEMS];
    this.save_menu =  JSON.parse(JSON.stringify(MENU_ITEMS));
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.menu = JSON.parse(JSON.stringify( this.save_menu ));
      this.translateMenuItems(this.menu);
    });

    this.translateMenuItems(this.menu);
  }

  translateMenuItems(menu) {
    menu.forEach( item => {
      this.translateMenuItem( item );
    });
  }

  translateMenuItem( menuItem: NbMenuItem ) {
    if ( menuItem.children != null ) {
      menuItem.children.forEach( item => this.translateMenuItem( item ) );
    }
    menuItem.title = this.translate.instant( menuItem.title );
  }
}