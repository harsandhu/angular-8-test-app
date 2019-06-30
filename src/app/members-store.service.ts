import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersStoreService {
private members: Array<Member>

  constructor(private http: HttpClient) {  }

  getMembers(){
    return this.members;
  }

  setMembers(value){
    this.members = value;
  }

  fetchMembers(): Observable<any>{
    return this.http.get("/members");
  }

  getMemberById(id){
    return this.members.filter(member => member._id === id)[0];
   }
}
