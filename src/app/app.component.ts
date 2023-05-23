import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from './books-list/books.service';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string){
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string){
    this.store.dispatch(BooksActions.removeBook({ bookId }))
  }

  constructor(
    private bookService: GoogleBooksService,
    private store: Store
  ) {}  

  ngOnInit(){
    this.bookService
    .getBooks()
    .subscribe((books) =>
     this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
    );
  }
  
}

