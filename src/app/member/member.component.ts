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
    //set the member to passed in member object
    let member = history.state.member;
    this.isLoading = true; 
    //if member is passed in set the member else if the page is refreshed fetch the member
    member ? this.setMember(member) : this.fetchMember(0);
  }

  setMember(member){
    //set the member and votes for the member
    this.member = member;
    this.setVotesData(0);
  }

  fetchMember(skipCount){
    //make call to fetch members with the skip count
    this.membersStoreService.fetchMembers(skipCount).subscribe(data=> {
      //set member data and fetch votes after success
      this.setMemberData(data);
      this.setVotesData(0);
    });
  }

  setMemberData(data){
    //set member data in the service
    this.membersStoreService.setMembers(data.results)
    const id = this.route.snapshot.params.id;
    this.member = this.membersStoreService.getMemberById(id);
  }

  setVotesData(skipCount){
    //get the congressId from member object to get the votes data
    const congressId = this.member.congresses[0].congressNum;
    //call the vote service to fetch vote data
    this.votesStoreService.fetchVotesById(congressId, skipCount).subscribe(res=> {
      //set all the required properties after getting data
      this.votesStoreService.setVotes(res.results);
      this.votes = this.votesStoreService.getVotes();
      this.votesStoreService.setPagination(res.pagination);
      this.pagination = this.votesStoreService.getPagination();
      this.isLoading = false;
    });
  }
  

  fetchPage(skipCount){
    //fetch the next page
    this.isLoading = true;
    this.setVotesData(skipCount);
  }

}
