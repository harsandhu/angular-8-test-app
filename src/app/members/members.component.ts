import { Component, OnInit, ɵisDefaultChangeDetectionStrategy, Optional } from '@angular/core';
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
  pagination: any;
  isLoading: Boolean;

  constructor(private membersStoreService: MembersStoreService) { }

  ngOnInit() {
    this.fetchMembers(0);
  }

  fetchMembers(skipCount){
    this.isLoading = true;
    this.membersStoreService.fetchMembers(skipCount).subscribe(data=> {
      this.membersStoreService.setMembers(data.results);
      this.membersStoreService.setPagination(data.pagination);
      this.pagination = this.membersStoreService.getPagination();
      this.members = this.membersStoreService.getMembers();
      this.isLoading = false;
    });
  }

  fetchPage(skipCount){
    this.fetchMembers(skipCount);
  }
  
}
