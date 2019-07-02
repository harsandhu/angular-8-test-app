import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.styl']
})
export class VoteComponent implements OnInit {
  @Input() voteObj: Object;
  openTab: Boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleTab(){
    this.openTab = !this.openTab;
  }

}
