import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { json, User } from '../../utils/api';


export default class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);

        this.state = {
            id: null,
            title: '',
            author: '',
            price: null,
            saveStatus: '',
            deleteStatus: ''
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    private alert: JSX.Element = null;
    private saving: boolean = false;
    private delete: boolean = false;

    async componentDidMount() {
        if(!User || User.userid === null || User.role !== 'admin' || User.role !== 'guest') {
            this.props.history.replace('/login');
            console.log(User);
        }

        let id = this.props.match.params.id;
        
        try {
            let book = await json(`/api/admin/${id}`);
            this.setState({
                id: book.id,
                title: book.title, 
                author: book.author,
                price: book.price
            });
        } catch (e) {
            console.log(e);
        }
    }

        async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();

        if (this.saving) return

        let id = this.props.match.params.id;
        let body = { 
            title: this.state.title, 
            author: this.state.author,
            price: this.state.price
         }

        try {

            this.saving = true;
            let result = await json(`/api/admin/${id}`, 'PUT', body);
            if(result) {
                this.setState({
                    title: '',
                    author: '',
                    price: null,
                    saveStatus: 'success'
                })
            } else {
                this.setState({ saveStatus: 'error' });
            }
        } catch (e) {
            this.setState({ saveStatus: 'error' });
            console.log(e);
        } finally {
            this.saving = false;
        }
    }   

    async handleDelete (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

        if(this.delete) return;

        let id = this.props.match.params.id;
        try {
            this.delete = true;
            let result = await json(`/api/admin/${id}`, 'DELETE');
            if (result) {
                this.setState({ 
                    title: '',
                    author: '',
                    price: null,
                    deleteStatus: 'success'
                });
            } else {
                this.setState({ deleteStatus: 'error' });
            }
        } catch (e) {
            this.setState({ deleteStatus: 'error' });
            console.log(e);
        } finally {
            this.delete = false;
        }
    }
    
render() {

    
    if(this.state.saveStatus === 'success') {
        this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Book Edited</div>
    } else if(this.state.saveStatus === 'error') {
        this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Editing Book</div>
    }

    if(this.state.deleteStatus === 'success') {
        this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Book Deleted</div>
    } else if(this.state.deleteStatus === 'error') {
        this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Deleting Book</div>
    }


    return (
        <>
        <div className="container">
            <div className="row my-2">
                <div className="col-md-12">
                    <form className="form-group p-3 border border-dark rounded">
                        <label>Title: </label>
                        <input
                            value={this.state.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ title: e.target.value });
                            }}
                            className="p-1 form-control"
                            placeholder="Title ..." />
                        <label>Book Author: </label>
                        <input
                            value={this.state.author}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ author: e.target.value });
                            }}
                            className="p-1 form-control"
                            placeholder="Author ..." />
                        <button onClick={ this.handleEdit } className="btn btn-lg btn-primary mt-2">Save Edit!</button>
                        <button onClick={ this.handleDelete } className="btn btn-lg btn-danger mt-2">Delete!</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        </div>
        </>
        );
    }   
}



    interface IAdminProps extends RouteComponentProps<{ id: string; }> { }

    interface IAdminState {
        id: number;
        title: string;
        author: string;
        price: number;
        saveStatus: string;
        deleteStatus: string;
    }