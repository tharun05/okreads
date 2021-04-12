import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { createBook, createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('1. should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });

    it('2. should invoke loadReadingListError action when fail to load', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action.type).toEqual(
          ReadingListActions.loadReadingListError(new ErrorEvent('unknown_error')).type
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').error(new ErrorEvent('unknown_error'));
    });
  });
  describe('addBook$', () => {
    it('3. should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.addToReadingList({ 'book': createBook('B') }));

      effects.addBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedAddToReadingList({ book: createBook('B') })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([createBook('B')]);
    });

    it('4. should invoke failedAddToReadingList action when failed to add', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.addToReadingList({ book: createBook('A') }));

      effects.addBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.failedAddToReadingList({ book: createBook('A') })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').error(new ErrorEvent('Error'));
    });
  });

  describe('removeBook$', () => {
    it('5. should work', done => {
      actions = new ReplaySubject();
      const item = {
        bookId: 'B',
        title: 'A',
        authors: ['A'],
        description: 'A'
      };
      actions.next(ReadingListActions.removeFromReadingList({
        item
      }));

      effects.removeBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedRemoveFromReadingList({
            item
          })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/B').flush([]);
    });

    it('6. should invoke failedRemoveFromReadingList action when failed to remove', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.removeFromReadingList({ item: createReadingListItem('A') }));

      effects.removeBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.failedRemoveFromReadingList({ item: createReadingListItem('A') })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/A').error(new ErrorEvent('Error'));
    });
  });
});


