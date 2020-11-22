import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpLibrary } from './http.library';
import { MessageLibrary } from '../message.library';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpPutLibrary extends HttpLibrary {

  constructor(public messages: MessageLibrary, public http: Http) {
    super(messages);
  }

  public put(params: any): any {
    this.setParams(params).then(() => {
      let data = {};
      if (params.inputs !== undefined && typeof params.inputs == 'object') {
        for (let key in params.inputs) {
          data[key] = params.inputs[key];
        }
      }
      this.sendPut(data);
    });
  }

  public sendPut(data: any): void {
    data['_method'] = 'PUT';
    //this.http.put(this.url, data, this.options)
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

  //NOTA EN CHROME Y ALGUNOS NAVEGADORES NO SIRVE PUT, POR ESO HACEMOS UN HACK Y USAMOS POST
  public sendFilePut(data: any): void {
    data.append('_method', 'PUT');
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
