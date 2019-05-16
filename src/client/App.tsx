import * as React from "react";
import { BrowserRouter,  Switch, Route } from "react-router-dom";
import "./scss/app";

import Nav from './components/public/Nav';
import Home from './components/public/Home';
import AllBooks from './components/public/AllBooks';
import BookDetails from './components/public/BookDetails';
import Admin from './components/admin/Admin';

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
    return ( 
        <BrowserRouter>
            <Nav />
            <main className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/books" component={AllBooks} />
                <Route exact path="/:id/details" component={BookDetails} />
                <Route exact path="/:id/admin" component={Admin} />
                {/* <Route exact path="/:id/login" component={Login} />
                <Route exact path="/:id/register" component={register} /> */}
            </Switch>
            </main>
        </BrowserRouter>
     );
}
 
export default App;