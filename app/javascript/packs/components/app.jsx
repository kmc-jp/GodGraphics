import React from "react";
import Header from './header';
import Main from './main';
import { hot } from 'react-hot-loader'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default hot(module)(App)