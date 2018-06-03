import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

function FolderCard(props) {

    const { classes } = props;
    const folder = props.folder;
    const image = folder.images[0];
    let handleClick = (e) => {
        var target = e.target;
        window.location.href = folder.path;
    };

    let EditPane = () => {
        if (props.deletable) {
            return (
                <CardActions>
                    <Button size="small" color="secondary" onClick={() => (props.onDelete(folder))}>
                        <Delete />
                    </Button>
                    <Button size="small" color="primary" href={folder.edit_path}>
                        <Edit />
                    </Button>
                </CardActions>
            );
        } else {
            return null;
        }
    }

    return (
        <Card className={classes.card} >
            <CardMedia
                className={classes.media}
                image={image.url.large}
                style={{ cursor: "pointer" }}
                onClick={handleClick}>
            </CardMedia>
            <CardContent style={{ cursor: "pointer" }} onClick={handleClick}>
                <Typography noWrap variant="headline">
                    {folder.title}
                </Typography>
                <Typography noWrap >
                    {folder.caption}
                </Typography>
            </CardContent>
            <EditPane />
        </Card>
    );
}

export default withStyles(styles)(FolderCard);