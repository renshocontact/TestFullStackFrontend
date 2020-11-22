import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpLibrary } from './http.library';
import { MessageLibrary } from '../message.library';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpGetLibrary extends HttpLibrary {
  constructor(public messages: MessageLibrary, public http: Http) {
    super(messages);
  }

  public get(params: any): any {
    this.setParams(params).then(() => {
      this.sendGet();
    });
  }

  public sendGet(): void {
    this.http.get(this.url, this.options)
      .pipe(map(response => response.json()))
      .subscribe(this.successCallBack.bind({
        success: this.success.bind(this.context)
      }), this.errorCallBack.bind({
        error: this.error.bind(this.context),
        messages: this.messages
      }), this.finallyCallBack.bind({
        finally: this.finally
      })
      );
  }
}
