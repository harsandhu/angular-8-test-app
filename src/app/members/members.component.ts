import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MembersStoreService } from '../members-store.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.styl'],
  providers: [MembersStoreService]
})
export class MembersComponent implements OnInit {
  members: Array<Member>;
  constructor(private membersStoreService: MembersStoreService) { }

  ngOnInit() {
    this.membersStoreService.fetchMembers().subscribe(data=> {
      this.membersStoreService.setMembers(data.results);
      this.members = this.membersStoreService.getMembers();
    });
  }
  
}
