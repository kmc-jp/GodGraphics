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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'
import api from "./api";

const styles = theme => ({

    root: {
        position: "absolute",
        top: "96px",
        width: "96%",
        padding: 16
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        bottom: 40,
    },
});

const TITLE_MAX = 33;
const CAPTION_MAX = 3001;



function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getChannels(channels, inputValue) {
    let count = 0;

    return channels.filter(channel => {
        const keep =
            (!inputValue || channel.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

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
            can_submit: false,
            postSlack: false,
            postSlackChannel: "graphics",
            slackChannels: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSlack = this.handleChangeSlack.bind(this);
        this.handleChangeSlackChannel = this.handleChangeSlackChannel.bind(this);
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
            formData.append("tags[]", tags.tags[i].name);
        }
        if (this.props.id) formData.append("id", this.props.id);
        if (this.state.postSlack) {
            formData.append("post_slack", 'true');
            formData.append("post_slack_channel", this.state.postSlackChannel);
        }
        const path = this.props.editMode ? './folders/' + this.props.folder.id + '/update' : './upload';
        api(path, {
            body: formData,
            method: 'post',
        }).then(response => {
            this.props.history.push('/folders/' + response.id);
        })
    }

    handleChangeSlack(e) {
        var target = e.target;
        this.setState({
            postSlack: target.checked
        });
    }
    handleChangeSlackChannel(e) {
        var target = e.target;
        if (target) {
            this.setState({
                postSlackChannel: target.value
            });
        } else {
            this.setState({
                postSlackChannel: e
            });
        }

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

    componentDidMount() {
        if (this.props.editMode) return;
        api('./upload/slack_channels', { method: 'get' }).then(data => {
            try {
                this.setState({
                    slackChannels: data
                });
            } catch (ex) {
            }
        });
    }

    render() {
        const { classes } = this.props;

        var submitText = () => { return this.props.editMode ? "更新" : "投稿"; }
        var folder = this.props.folder;
        return (
            <Paper className={classes.root}>
                <form onSubmit={this.handleSubmit} >
                    <Grid container spacing={24} >
                        <Grid item xs={12}>
                            <MultipleFileForm
                                name="images"
                                updateInput={this.updateInput}
                                images={folder ? folder.images : null}
                                editMode={this.props.editMode}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <LimitedInput
                                name="title"
                                label="タイトル"
                                max={TITLE_MAX}
                                updateInput={this.updateInput}
                                text={folder ? folder.title : null}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={8}>
                            <LimitedInput
                                name="caption"
                                label="キャプション"
                                max={CAPTION_MAX}
                                rows={3}
                                multiline
                                fullWidth
                                updateInput={this.updateInput}
                                allowEmpty
                                text={folder ? folder.caption : null}
                            />
                        </Grid>
                        <Grid item sm={8}>
                            <InputTag
                                name="tags"
                                updateState={this.updateInput}
                                tags={folder ? folder.tags : null}
                            />
                        </Grid>
                        <Grid item sm={4} >
                            <div hidden={this.props.editMode}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.postSlack}
                                            onChange={this.handleChangeSlack}
                                        />
                                    }
                                    label="Slackへの投稿"
                                />
                                <Downshift
                                    onChange={this.handleChangeSlackChannel}
                                >
                                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                                        <div className={classes.container}>
                                            {renderInput({
                                                fullWidth: true,
                                                classes,
                                                InputProps: getInputProps({
                                                    placeholder: 'チャンネル名を選択',
                                                    value: this.state.postSlackChannel,
                                                    onChange: this.handleChangeSlackChannel,
                                                }),
                                                disabled: !this.state.postSlack,
                                            })}
                                            {isOpen ? (
                                                <Paper className={classes.paper} square>
                                                    {getChannels(this.state.slackChannels, inputValue).map((suggestion, index) =>
                                                        renderSuggestion({
                                                            suggestion,
                                                            index,
                                                            itemProps: getItemProps({ item: suggestion }),
                                                            highlightedIndex,
                                                            selectedItem,
                                                        }),
                                                    )}
                                                </Paper>
                                            ) : null}
                                        </div>
                                    )}
                                </Downshift>
                            </div>
                            < Button
                                fullWidth
                                disabled={!this.state.can_submit}
                                color="primary"
                                variant="raised"
                                type="submit"
                            >
                                {submitText()}
                            </Button>
                        </Grid>
                    </Grid>
                </form >
            </Paper >
        );
    }
}

export default withStyles(styles)(UploadForm)