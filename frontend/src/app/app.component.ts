import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  defaultLanguage: string = 'ar';
  currentLang: string;
  languages: Array<string> = ['ar','fr','en'];
  constructor(private translator: TranslateService){
    this.translator.setDefaultLang(this.defaultLanguage);
    this.translator.use(this.defaultLanguage);
    this.currentLang = this.defaultLanguage;
  }

  changeLang(lang){
    this.translator.use(lang);
    this.currentLang = lang;
  }
}
