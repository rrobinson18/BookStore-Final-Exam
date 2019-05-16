import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { json } from '../../utils/api';
import { Link } from 'react-router-dom';

export default class BookDetails extends  React.Component<IBookDetailsProps, IBookDetailsState> {
    constructor(props: IBookDetailsProps) {
        super(props);
            this.state = {
                books: {
                    id: null,
                    categoryid: null,
                    title: null,
                    author: null,
                    price: null,
                    _created: null
                 },
               categories: []      
         };
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        try {
            let books = await json(`/api/books/${id}`);
            let categories = await json(`/api/categories/${id}`);
            this.setState({ books, categories});
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (  
            <section className="row justify-content-center">
                <article className="col-md-12">
                    <h1>{this.state.books.title}</h1>
                    <h3>{this.state.books.author}</h3>
                    <h5>{this.state.books.price}</h5>
                    <Link to="/" className="btn btn-outline-dark mt-2">Go Back</Link>
                    <Link to={`/${this.props.match.params.id}/admin`}
                className="btn btn-outline-info mt-2">Edit Blog</Link>
                </article>
            </section>
        );
    }
    
}
 
interface IBookDetailsProps extends RouteComponentProps<{id: string}> {}

interface IBookDetailsState {
    books: {
        id: number,
        categoryid: number,
        title: string,
        author: string,
        price: string,
        _created: Date
     };  
     categories: {
         id: number,
         name: string
     }[]   
}