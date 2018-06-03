import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <AppBar>
                    <Toolbar>
                        <Button href="/" color="inherit">
                            <Typography variant="title" color="inherit">
                                God Graphic Uploader
                            </Typography>
                        </Button>
                        <Button color="inherit" href="/upload">
                            投稿
                        </Button>
                        <Button color="inherit" href="/mypage">
                            マイページ
                        </Button>
                        <Button color="inherit" href="/">
                            タグ
                        </Button>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default Header;

ReactDOM.render(
    <Header />,
    document.getElementById('header')
)
