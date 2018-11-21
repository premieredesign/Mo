import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private http: HttpClient) { }

  public stripe = Stripe('pk_test_5Qt3jHSXFMmilG0oeqPQ8cWN');

  public onChangeState: BehaviorSubject<any> = new BehaviorSubject({});

  public getByUrl(url: string): Observable<any> {
    const options = this.createRequestOptions();

    return this.http.get(url, options)
      .pipe(map((response: any) => response.DATA));
  }

  private createRequestOptions(): any {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append(
      'Access-Control-Allow-Origin', '*'
    );

    return {headers: headers};
  }
}
