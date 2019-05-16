import * as React from "react";
import { BrowserRouter,  Switch, Route } from "react-router-dom";
import "./scss/app";

import Home from './components/Home';

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
    return ( 
        <BrowserRouter>
            <main className="container">
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
            </main>
        </BrowserRouter>
     );
}
 
export default App;