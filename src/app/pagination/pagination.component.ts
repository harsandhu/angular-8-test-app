import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.styl']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: any; //pagination object passed in from parent components
  @Output() pageNumberSelected = new EventEmitter<number>(); //when a page is selected, this event is emitted

  private numPages: Array<Number>;
  private activePage: number;
  private paginationPageStart: number;
  private paginationPageEnd: number;
  private paginationIncrementSize = 10; 

  constructor() { }

  ngOnInit() {
    //create an array from total pages from the pagination object
    this.numPages = Array(this.pagination.number_pages).fill(0).map((x,i)=>i+1);
    this.activePage = this.pagination.page + 1;
    this.paginationPageStart = 0;
    this.paginationPageEnd = this.paginationIncrementSize;
  }

  getShowLeftPagesArrow(){
    return this.paginationPageStart > 0;
  }

  getShowRightPagesArrow(){
    return this.paginationPageEnd < this.numPages.length;
  }

  decrementPaginationPages(){
    this.paginationPageStart = this.paginationPageStart - this.paginationIncrementSize;
    this.paginationPageEnd = this.paginationPageEnd - this.paginationIncrementSize;
  }

  incrementPaginationPages(){
    this.paginationPageStart = this.paginationPageStart + this.paginationIncrementSize;
    this.paginationPageEnd = this.paginationPageEnd + this.paginationIncrementSize;
  }

  fetchNextPage(pageNum){
    this.activePage = pageNum;
    const skipCount = (this.activePage - 1) * this.pagination.per_page;
    this.pageNumberSelected.emit(skipCount);
  }

}
