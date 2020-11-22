import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpLibrary } from './http.library';
import { MessageLibrary } from '../message.library';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpPostLibrary extends HttpLibrary {

  constructor(public messages: MessageLibrary, public http: Http) {
    super(messages);
  }

  public post(params: any): any {
    this.setParams(params).then(() => {
      let data = {};
      if (params.inputs !== undefined && typeof params.inputs == 'object') {
        for (let key in params.inputs) {
          data[key] = params.inputs[key];
        }
      }
      this.sendPost(data);
    });
  }

  public sendPost(data: any): void {
    this.http.post(this.url, data, this.options)
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
