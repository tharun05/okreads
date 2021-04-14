import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  finishReadingBook } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  constructor(
    private readonly store: Store) {
  }
  ngOnInit() {
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  finishReadingBook(book) {
    this.store.dispatch(finishReadingBook({ book: {...book, finished: true, finishedDate: new Date().toISOString()} }));
  }
}
