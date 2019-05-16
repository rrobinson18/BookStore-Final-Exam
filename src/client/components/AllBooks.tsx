import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { Link } from 'react-router-dom';

export interface AllBooksProps { }

export interface Book {
    id: number,
    categoryid: number,
    title: string,
    author: string,
    price: number,
    _created: Date
}

const AllBooks: React.SFC<AllBooksProps> = () => {

   const [books, setBooks] = useState<Book[]>([]);
   useEffect(() => {
        json('/api/books')
            .then(books => setBooks(books));
   }, []); 

    return(
        <section className="row">
            <article className="col-md-12">
                <ul className="list-group">
                    {books.map(book => (
                        <li className="list-group-item" key={book.id}>{book.title} <Link to={`/${book.id}/details`}>Get Details</Link></li>
                    ))}
                </ul>
            </article>
        </section>
     );
}


export default AllBooks;