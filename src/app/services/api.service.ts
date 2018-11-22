import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { userresponse, users } from '../models/users';


     
///const apiUrl = "https://dv6iu1iltl.execute-api.us-east-2.amazonaws.com/Prod/api/S3Bucket/";

@Injectable()
export class ApiService {
  // Define the internal Subject we'll use to push the command count
  public pendingCommandsSubject = new Subject<number>();
  public pendingCommandCount = 0;

  // Provide the *public* Observable that clients can subscribe to
  public pendingCommands$: Observable<number>;

  constructor(public http: HttpClient, private inj: Injector) {
    this.pendingCommands$ = this.pendingCommandsSubject.asObservable(); 
   }

   public postAPIData(emailval: string){
    return this.http.post('http://localhost:4000/SubscribeEmails', {'subscribeEmail' : emailval})
  }

 public login(userName: string, userPassword: string) {  
    return this.http.post('http://localhost:4000/login', {'username' : userName, 'userpassword': userPassword});
  }


  public saveImages(filebase64: string, userId: string){
    return this.http.post('http://localhost:4000/saveimage', {'filebase64' : filebase64, 'userId': userId});
  }

  public getUsers(userId : string){
    return this.http.post('http://localhost:4000/getUser', { 'id': userId});
  }
}
