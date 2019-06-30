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

  constructor(private membersStoreService: MembersStoreService, 
              private route : ActivatedRoute,
              private votesStoreService: VotesStoreService) {}

  ngOnInit() {
    let member = history.state.member;
    member ? this.member = member : this.fetchMember();
  }

  fetchMember(){
    this.membersStoreService.fetchMembers().subscribe(data=> {
      this.setMemberData(data);
      this.setVotedData();
    });
  }

  setMemberData(data){
    this.membersStoreService.setMembers(data.results)
    const id = this.route.snapshot.params.id;
    this.member = this.membersStoreService.getMemberById(id);
  }

  setVotedData(){
    const congressId = this.member.congresses[0].congressNum;
    this.votesStoreService.fetchVotesById(congressId).subscribe(res=> {
      this.votesStoreService.setVotes(res.results);
      this.votes = this.votesStoreService.getVotes();
      console.log(this.votes);
    });
  }

}
