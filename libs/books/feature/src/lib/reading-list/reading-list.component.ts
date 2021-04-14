import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  addToReadingList } from '@tmo/books/data-access';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const confirmSnackbar = this._snackBar.open('Removed from reading list', 'Undo' , {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    confirmSnackbar.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({book: item}));
    });
  }
}
