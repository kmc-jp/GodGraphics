import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Home from './home'
import User from './user'
import Tag from './tag'
import Tags from './tags'
import UploadForm from './upload_form'
import Folder from './folder'
import EditFolderForm from './edit_folder_form'
import EditUserForm from './edit_user_form'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import api from "./api";

const styles = theme => ({

});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: 0
        }
    }

    componentDidMount() {
        api("./users/me", { method: 'get' }).then(data => {
            this.setState({
                login_id: data.id
            });
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/mypage' component={(props) => <User id={this.state.login_id} {...props} />} />
                <Route path='/mypage/edit' component={(props) => <EditUserForm login_id={this.state.login_id} id={this.state.login_id} {...props} />} />
                <Route exact path='/users/:id' component={User} />
                <Route path='/users/:id/edit' component={(props) => <EditUserForm login_id={this.state.login_id}{...props} />} />
                <Route exact path='/tags' component={Tags} />
                <Route path='/tags/:id' component={Tag} />
                <Route path='/upload' component={UploadForm} />
                <Route exact path='/folders/:id' component={Folder} />
                <Route path='/folders/:id/edit' component={(props) => <EditFolderForm login_id={this.state.login_id} {...props} />} />
            </Switch>
        );
    }
}

export default withStyles(styles)(Main);