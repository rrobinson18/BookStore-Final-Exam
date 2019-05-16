import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { json } from '../utils/api';
import { Link } from 'react-router-dom';

export interface BookDetailsProps extends RouteComponentProps<{ id: string }> {}
 
const BookDetails: React.SFC<BookDetailsProps> = props => {

    const [book, setBook] = useState<any>({});
    useEffect(() => {
        json(`/api/books/${props.match.params.id}`)
        .then(book => setBook(book));
    }, []);

    return (  
        <section className="row justify-content-center">
            <article className="col-md-12">
                <h1>{book.title}</h1>
                <h3>{book.author}</h3>
                <h5>{book.price}</h5>
                <Link to="/" className="btn btn-outline-dark mt-2">Go Back</Link>
                <Link to={`/${props.match.params.id}/admin`}
            className="btn btn-outline-info mt-2">Edit Blog</Link>
        

            </article>
        </section>
    );
}
 
export default BookDetails;