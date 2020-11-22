import { Injectable } from '@angular/core';
import { HttpGetLibrary } from '../libraries/http/httpGet.library';
import { HttpPostLibrary } from '../libraries/http/httpPost.library';
import { HttpPutLibrary } from '../libraries/http/httpPut.library';
import { HttpDeleteLibrary } from '../libraries/http/httpDelete.library';

import { CONFIG } from '../config/config';

@Injectable()
export class UserService {
  private users: Array<Object> = [];
  private page: number = 0;
  private loading: boolean = false;
  private currentSearch: string = '';

  constructor(private httpGetLibrary: HttpGetLibrary, private httpPostLibrary: HttpPostLibrary, private httpPutLibrary: HttpPutLibrary, private httpDeleteLibrary: HttpDeleteLibrary) { }

  public resetPage(): void {
    this.page = 0;
  }

  public resetUsers(): void {
    this.users = [];
  }

  public setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public isLoading(): boolean {
    return this.loading;
  }

  public setUser(users: Object): void {
    this.users.push(users);
  }

  public getUsers(): Array<Object> {
    return this.users;
  }

  public seCurrentSearch(search: string): void {
    this.currentSearch = search;
  }

  public geCurrentSearch(): string {
    return this.currentSearch;
  }

  public getLength(): Number {
    return this.users.length;
  }

  public getDetail(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isLoading()) {
        this.setLoading(true);
        this.httpGetLibrary.get({
          url: 'admins/users/'+id,
          success: function(response) {
            this.setLoading(false);
            resolve(response.data);
          },
          error: function(res) {
            this.setLoading(false);
            resolve(false);
          },
          context: this
        });
      } else {
        resolve(false);
      }
    });
  }
}
