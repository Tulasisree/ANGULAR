import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as bookActions from './book.actions';
import { BookService } from "./book.service";
import { mergeMap, map, catchError, of } from "rxjs";

@Injectable()
export class BookEffects{

    //This is a NgRx Effect that responds to 'AddBook' actions
    addBook$ = createEffect(() => this.actions$.pipe(
        //Listen for actions of Type 'AddBlock'
        ofType(bookActions.AddBook),
        
        // For reach 'AddBlock' action, call 'addBlock' on the book service
        // 'mergeMap' allows multiple concurrent 'addblock' calls
        mergeMap((action) => this.bookService.addBook(action)
            .pipe(
                //If the 'addBlock' call is successful, dispatch 'AddBookSuccess' action with the book data
                map(book => bookActions.AddBookSuccess(book)),
                //If the 'addBook' call fails, dispatch 'AddBookfailure' action with the error.
                catchError((error) => of(bookActions.AddBookFailure({error})))
            ))
    ))

    constructor(
        //Actions here is whatever actions are currently running(dispatched) inside NgRx appn
        private actions$: Actions,
        private bookService: BookService
    ){}

}