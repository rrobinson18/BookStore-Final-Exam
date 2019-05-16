import * as React from "react";
import { BrowserRouter,  Switch, Route } from "react-router-dom";
import "./scss/app";

import Nav from './components/Nav';
import Home from './components/Home';
import AllBooks from './components/AllBooks';
import BookDetails from "./components/BookDetails";

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
            </Switch>
            </main>
        </BrowserRouter>
     );
}
 
export default App;