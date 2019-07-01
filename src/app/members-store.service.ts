import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersStoreService {
private members: Array<Member>
private pagination: Object;

  constructor(private http: HttpClient) {  }

  getMembers(){
    return this.members;
  }

  setMembers(value){
    this.members = value;
  }

  setPagination(value){
    this.pagination = value;
  }

  getPagination(){
    return this.pagination;
  }

  fetchMembers(skipCount: Number): Observable<any>{
    return skipCount? this.http.get(`/members?$skip=${skipCount}&key=da13cc0dce344b3fa36b500e01602df8`): this.http.get("/members?key=da13cc0dce344b3fa36b500e01602df8");
  }

  getMemberById(id){
    return this.members.filter(member => member._id === id)[0];
   }
}
