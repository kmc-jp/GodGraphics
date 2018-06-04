import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({

});

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <AppBar>
                    <Toolbar>
                        <Button color="inherit" component={Link} to='/'>
                            <Typography variant="title" color="inherit">
                                God Graphics Uploader
                            </Typography>
                        </Button>
                        <Button color="inherit" component={Link} to='/upload'>
                            投稿
                        </Button>
                        <Button color="inherit" component={Link} to='/mypage'>
                            マイページ
                        </Button>
                        <Button color="inherit" component={Link} to='/tags'>
                            タグ
                        </Button>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default withStyles(styles)(Header);