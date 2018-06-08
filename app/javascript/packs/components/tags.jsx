import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'
import api from "./api";

const styles = theme => ({
    root: {
        position: "absolute",
        top: "96px",
        width: "96%",
        padding: 16,
        minHeight: "200px",
    }
})

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
    }

    componentDidMount() {
        api('./tags', { method: 'get' }).then(data => {
            try {
                this.setState({
                    tags: data
                });
            } catch (ex) {

            }
        })
    }

    render() {
        const { classes } = this.props;
        const views = this.state.tags.filter((x) => {
            return x.folder_num > 0;
        }).sort((a, b) => {
            if (a.folder_num < b.folder_num) return 1;
            if (a.folder_num > b.folder_num) return -1;
            return 0;
        }).map((tag, i) => (
            <Button style={{ margin: 8 }} key={i} component={Link} to={"/tags/" + tag.id}>
                {tag.name}{"(" + tag.folder_num + ")"}
            </Button>
        ));

        return (
            <Paper className={classes.root}>
                <Typography variant="title" style={{ textAlign: "center" }}>
                    タグ一覧
                </Typography>
                <Divider />
                <div style={{ padding: 8 }}>
                    {views}
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(TagList)