import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MembersStoreService } from '../members-store.service';
import { VotesStoreService } from '../votes-store.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.styl'],
  providers: [MembersStoreService],
  
})
export class MemberComponent implements OnInit {

  member: Member;
  votes: Array<Object>;
  pagination: any;
  isLoading: Boolean;

  constructor(private membersStoreService: MembersStoreService, 
              private route : ActivatedRoute,
              private votesStoreService: VotesStoreService) {}

  ngOnInit() {
    let member = history.state.member;
    this.isLoading = true;
    member ? this.setMember(member) : this.fetchMember(0);
  }

  setMember(member){
    this.member = member;
    this.setVotesData(0);
  }

  fetchMember(skipCount){
    this.membersStoreService.fetchMembers(skipCount).subscribe(data=> {
      this.setMemberData(data);
      this.setVotesData(0);
    });
  }

  setMemberData(data){
    this.membersStoreService.setMembers(data.results)
    const id = this.route.snapshot.params.id;
    this.member = this.membersStoreService.getMemberById(id);
  }

  setVotesData(skipCount){
    const congressId = this.member.congresses[0].congressNum;
    this.votesStoreService.fetchVotesById(congressId, skipCount).subscribe(res=> {
      this.votesStoreService.setVotes(res.results);
      this.votes = this.votesStoreService.getVotes();
      this.votesStoreService.setPagination(res.pagination);
      this.pagination = this.votesStoreService.getPagination();
      this.isLoading = false;
      console.log(this.votes);
    });
  }
  

  fetchPage(skipCount){
    this.isLoading = true;
    this.setVotesData(skipCount);
  }

}
