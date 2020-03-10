import { Directive, Input, OnInit, ElementRef } from '@angular/core';
export interface ReCaptchaConfig {
  theme? : 'dark' | 'light';
  type? : 'audio' | 'image';
  size? : 'compact' | 'normal';
  tabindex? : number;
}
@Directive({
  selector: '[appRecapCha]'
})
export class RecapChaDirective {
/*   @Input() key : string;
  @Input() config : ReCaptchaConfig = {};
  @Input() lang : string;

  private widgetId : number;

  constructor( private element : ElementRef ) {}

  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();
  }

  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement, config);
    };
  }

  private render( element : HTMLElement, config ) : number {
    return grecaptcha.render(element, config);
  }

  addScript() {
    let script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  } */

}
