import React from 'react';
import MultipleFileForm from './multiple_file_form';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import LimitedInput from "./limited_input"
import InputTag from "./input_tag"
import Paper from "@material-ui/core/Paper";

const styles = {

    root: {
        position: "absolute",
        top: "96px",
        width: "96%",
        padding: 16
    },
}

const TITLE_MAX = 33;
const CAPTION_MAX = 3001;

class UploadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: {
                text: "",
                is_valid: false,
            },
            caption: {
                text: "",
                is_valid: false,
            },
            images: {
                is_valid: false,
            },
            tags: {
            },
            can_submit: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        const images = this.state.images;
        const title = this.state.title.text;
        const caption = this.state.caption.text;
        const tags = this.state.tags;
        for (var i in images.images) {
            formData.append("images[]", images.images[i]);
        }
        formData.append("title", title);
        formData.append("caption", caption);

        for (var i in tags.tags) {
            formData.append("tags[]", tags.tags[i]);
        }
        if (this.props.id) formData.append("id", this.props.id);

        const path = this.props.editMode ? './update' : './upload';
        fetch(path, {
            body: formData, // must match 'Content-Type' header
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }).then(response => {
            window.location.href = response.url;
        })
    }

    updateInput(name, value) {
        var state = this.state;
        state[name] = value;
        this.updateState(state);
    }

    updateState(state) {
        state = {
            can_submit:
                (this.props.editMode || state.images.is_valid) &&
                state.title.is_valid &&
                state.caption.is_valid
        }
        this.setState(state);
    }

    render() {
        const { classes } = this.props;

        var submitText = () => { return this.props.editMode ? "更新" : "投稿"; }

        return (
            <Paper className={classes.root}>
                <form onSubmit={this.handleSubmit} >
                    <Grid container spacing={24} >
                        <Grid item sm={12}>
                            <MultipleFileForm
                                name="images"
                                updateInput={this.updateInput}
                                images={this.props.images}
                                editMode={this.props.editMode}
                            />
                        </Grid>

                        <Grid item sm={12}>
                            <LimitedInput
                                name="title"
                                label="タイトル"
                                max={TITLE_MAX}
                                updateInput={this.updateInput}
                                text={this.props.title}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <LimitedInput
                                name="caption"
                                label="キャプション"
                                max={CAPTION_MAX}
                                rows={3}
                                multiline
                                fullWidth
                                updateInput={this.updateInput}
                                allowEmpty
                                text={this.props.caption}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <InputTag
                                name="tags"
                                updateState={this.updateInput}
                                tags={this.props.tags}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Button disabled={!this.state.can_submit} color="primary" variant="raised" type="submit">
                                {submitText()}
                            </Button>
                        </Grid>
                    </Grid>
                </form >
            </Paper>
        );
    }
}

export default withStyles(styles)(UploadForm)