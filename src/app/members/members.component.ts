import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: any[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchMembers().subscribe(data=> this.members = data.results);
  }

  showMemberDetails(member):any {
    console.log(member);
  }

  fetchMembers(): Observable<any>{
    return this.http.get("/members");
  }
}
