import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { Typography } from '@material-ui/core';

const IMAGES_MAX = 31 * 1024 * 1024;

const styles = theme => ({
    root: {
        position: "relative"
    },
    preview_root: {
        padding: 16,
        position: "relative",
        border: "1px solid black",
        zIndex: 1,
        pointerEvents: "none",
        width: "96%"
    },
    wrapper: {
        height: "160px",
        overflow: "hidden",
        textAlign: 'center',
        padding: theme.spacing.unit * 2
    },
    input_file: {
        width: "100%",
        height: "100%",
        opacity: "0",
        top: "0",
        left: "0",
        position: "absolute",
        zIndex: 0
    },
});

class MultipleFileForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            size: 0,
            is_valid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleChange(e) {
        const reg = /^image\/*/;
        const files = e.target.files;
        var images = this.state.images;
        for (var i = 0; i < files.length; ++i) {
            const file = files[i];
            if (file.type.match(reg)) images.push(file);
        }
        this.updateState(images);
    }

    handleClick(e, key) {
        var target = e.target;
        var num = target.getAttribute("data-num");
        var images = this.state.images;
        var size = this.state.size;
        size -= images[num].size;
        images.splice(num, 1);

        this.updateState(images);
    }

    updateState(images) {
        var size = 0;
        for (var i = 0; i < images.length; ++i) {
            size += images[i].size;
        }

        var state = {
            images: images,
            size: size,
            is_valid: this.isValid(size)
        };
        this.props.updateInput(this.props.name, state);
        this.setState(state);
    }

    componentWillMount() {
        this.updateState([]);
    }

    isValid(size) {
        return size > 0 && size <= IMAGES_MAX
    }

    render() {
        const { classes } = this.props;
        var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
        var previews = [];
        var inputs = [];
        if (this.props.editMode) {
            const images = this.props.images;
            for (var i in images) {
                var image = images[i];
                previews.push(
                    <Grid item sm={2} key={i}>
                        <Paper
                            square
                            className={classes.wrapper}
                            key={i}
                        >
                            <img src={image} width="100%" />
                        </Paper>
                    </Grid>
                );
            }
        } else {
            const images = this.state.images;
            for (var i in images) {
                var image = images[i];
                previews.push(
                    <Grid item sm={2} key={i}>
                        <Paper
                            square
                            className={classes.wrapper}
                            key={i}
                            data-num={i}
                            onClick={this.handleClick}
                            style={{ cursor: "pointer", pointerEvents: "auto" }}
                        >
                            <img src={createObjectURL(image)} width="100%" data-num={i} />
                        </Paper>
                    </Grid>
                );
            }
        }


        let DrawSize = () => {
            var size = Math.round(this.state.size / 1024 / 1024);
            var max_size = Math.round(IMAGES_MAX / 1024 / 1024);
            if (this.isValid(this.state.size)) {
                return (
                    <Typography>
                        {size} / {max_size} MB
                    </Typography>
                );
            } else {
                return (
                    <Typography color="error">
                        {size} / {max_size} MB
                    </Typography>
                );
            }
        }

        let AddCard = () => {
            if (!this.props.editMode) {
                return (
                    <Grid item sm={2}>
                        <Paper square className={classes.wrapper}>
                            <Typography>
                                画像を追加する
                                 </Typography>
                            <DrawSize />
                        </Paper>
                    </Grid>
                );
            } else {
                return null;
            }
        };

        let InputFolder = () => {
            if (this.props.editMode) return null;
            else {
                return (
                    <input className={classes.input_file} type="file" accept="image/*" multiple onChange={this.handleChange} value="" />
                );
            }
        };
        return (
            <div className={classes.root}>
                <div className={classes.preview_root}>
                    <Grid container spacing={16}>
                        {previews}
                        <AddCard />
                    </Grid>
                </div>
                <InputFolder />
            </div>
        );
    }
}

MultipleFileForm.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string
};

export default withStyles(styles)(MultipleFileForm)