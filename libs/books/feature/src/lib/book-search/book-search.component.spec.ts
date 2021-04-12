import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] } } })]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  afterEach(() => {
    fixture.destroy();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getBooksError, 'Error');
    store.overrideSelector(getAllBooks, []);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('1. should create', () => {
    expect(component).toBeDefined();
  });

  it('2. should return formatted data', () => {
    let result = component.formatDate('2018-11-15T00:00:00.000Z');
    expect(result).toBe('11/15/2018');
    result = component.formatDate('');
    expect(result).toBeUndefined();
  });

  it('3. should add book to reading list', () => {
    fixture.detectChanges();
    const book: Book = createBook('B');
    component.addBookToReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(addToReadingList({ book }));
  });

});
