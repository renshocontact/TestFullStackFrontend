import { Injectable } from '@angular/core';
import { ROUTES } from '../../config/routes';
import { CONFIG } from '../../config/config';
import { MessageLibrary } from '../message.library';

@Injectable()
export class HttpLibrary {
  public url: string;
  public context: any = this;
  public success: any;
  public error: any;
  public finally: any;
  public options: any;
  public headers: any;
  public search: any;

  constructor(public messages: MessageLibrary) { }

  public setParams(params: any): any {
    return new Promise((resolve, reject) => {
      this.success = params.success;
      let isExternal = params.url.indexOf("http");
      if (isExternal === -1)
        this.url = ROUTES.DOMAIN_API + '/' + CONFIG.GENERAL.LANGUAGE + "/" + params.url;
      else
        this.url = params.url;

      this.error = function () { };
      this.finally = function () { };
      if (params.error !== undefined && typeof params.error == 'function')
        this.error = params.error;

      if (params.finally !== undefined && typeof params.finally == 'function')
        this.finally = params.finally;

      if (params.context !== undefined)
        this.context = params.context;

      this.options = {};
      this.headers = {};
      this.search = {};
      this.options.headers = this.headers;
      this.loadParams(params);
      resolve(true);
    });
  }

  private scapeCharacters(value: string): string {
    var regex = new RegExp('[/\]', 'g');
    return value.toString().replace(regex, '');
  }

  private loadParams(params: any): void {
    if (params.urlParams !== undefined && params.urlParams instanceof Array) {
      let max_length = params.urlParams.length;
      for (let i = 0; i < max_length; i++) {
        let current = params.urlParams[i];
        if (typeof current == 'object') {
          for (let key in current) {
            if (key !== '') {
              if (current[key] !== '')
                this.url = this.url + '/' + key + '/' + this.scapeCharacters(current[key]);
            } else {
              if (current[key] !== '')
                this.url = this.url + '/' + this.scapeCharacters(current[key]);
            }
          }
        } else {
          if (current !== '')
            this.url = this.url + '/' + this.scapeCharacters(current);
        }
      }
    }

    if (params.urlAltParams !== undefined && typeof params.urlAltParams == 'object') {
      for (let key in params.urlAltParams) {
        this.search[key] = this.scapeCharacters(params.urlAltParams[key]);
      }
      this.options.search = this.search;
    }
  }

  public successCallBack(response: any): void {
    console.log('successCallBack');
    this.success(response);
  }

  public errorCallBack(error: any): void {
    console.log(error._body);
    if (typeof error === 'object' && typeof error._body === 'string') {
      let parseError: any = JSON.parse(error._body);
      this.error(parseError);
    } else {
      console.log(error, error);
      this.error({ 'data': { 'message': error.toString() } });
    }
  }

  public finallyCallBack(): void {
    this.finally();
  }
}
