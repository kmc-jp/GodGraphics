import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from './home'
import User from './user'
import Tag from './tag'
import Tags from './tags'
import UploadForm from './upload_form'
import Folder from './folder'
import EditFolderForm from './edit_folder_form'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import api from "./api";

const styles = theme => ({

});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: 0
        }
    }

    componentDidMount() {
        api("./users/me", { method: 'get' }).then(data => {
            this.setState({
                loginID: data.id
            });
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/mypage' component={(props) => <User id={this.state.loginID} {...props} />} />
                <Route path='/users/:id' component={(props) => <User id={this.state.loginID} {...props} />} />
                <Route exact path='/tags' component={Tags} />
                <Route path='/tags/:id' component={Tag} />
                <Route path='/upload' component={UploadForm} />
                <Route exact path='/folders/:id' component={Folder} />
                <Route path='/folders/:id/edit' component={EditFolderForm} />
            </Switch>
        );
    }
}

export default withStyles(styles)(Main);