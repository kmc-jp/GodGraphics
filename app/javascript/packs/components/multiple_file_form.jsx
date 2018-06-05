import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { Typography } from '@material-ui/core';

const IMAGES_MAX = 31 * 1024 * 1024;

const styles = theme => ({
    root: {
        position: "relative",
        padding: 16
    },
    preview_root: {
        padding: 16,
        position: "relative",
        border: "1px solid black",
        zIndex: 1,
        pointerEvents: "none",
    },
    wrapper: {
        height: "160px",
        overflow: "hidden",
        textAlign: 'center',
        position: "relative",
        padding: 8,
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
        [...files].map((file, i) => {
            if (file.type.match(reg)) images.push(file);
        });
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
        size = images.reduce((acc, image) => {
            return acc + image.size
        }, 0);

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
        if (this.props.editMode) {
            previews = this.props.images.map((image, i) => (
                <Grid item sm={2} key={i}>
                    <Paper
                        square
                        className={classes.wrapper}
                        key={i}
                    >
                        <img src={image.url.medium} width="100%" />
                    </Paper>
                </Grid>
            ));
        } else {
            previews = this.state.images.map((image, i) => (
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
            ));
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
                            <span width="100%"></span>
                            <Typography >
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