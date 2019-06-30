import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotesStoreService {
  private votes: any[]

  constructor(private http: HttpClient) {  }

  getVotes(){
    return this.votes;
  }

  setVotes(value){
    this.votes = value;
  }

  fetchVotesById(congressId): Observable<any>{
    return this.http.get(this.getVotesUrl(congressId));
  }

  getVotesUrl(congressId){
    return `/votes?key=da13cc0dce344b3fa36b500e01602df8&$filter=superEvent/superEvent/congressNum eq '${congressId}'`;
  }
}
