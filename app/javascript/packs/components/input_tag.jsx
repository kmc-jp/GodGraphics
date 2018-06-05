import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip'
import { Divider, Paper } from '@material-ui/core';
import api from "./api";

const styles = theme => ({
    chip: {
        margin: 4
    }
});

class InputTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            tags: this.props.tags ? this.props.tags : [],
            selectTags: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectTag = this.handleSelectTag.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadTags = this.loadTags.bind(this);
        this.props.updateState(this.props.name, this.state);
    }

    handleChange(e) {
        var target = e.target;
        this.setState({
            input: target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.addTag(this.state.input);
    }

    handleKeyDown(e) {
        if (e.keyCode == 13) this.addTag(this.state.input);
    }

    handleSelectTag(e, name) {
        this.addTag(name);
    }

    addTag(input) {
        var tags = this.state.tags;
        if (input === '') return;
        var inputTag = input.trim().replace(/\s+/g, ' ').split(' ').filter((x, i, self) => self.indexOf(x) === i).map(x => { return { name: x } });
        if (tags.length > 0) {
            tags = [...tags, ...inputTag].filter((x, i, self) => self.indexOf(x) === i);
        } else {
            tags = inputTag;
        }
        var state = ({
            input: "",
            tags: tags
        });
        this.updateState(state);
    }

    deleteTag(e, num) {
        e.preventDefault();
        const target = e.target;
        var tags = this.state.tags;
        tags.splice(num, 1);
        var state = ({
            tags: tags
        });
        this.updateState(state);
    }

    updateState(state) {
        this.props.updateState(this.props.name, state);
        this.setState(state);
    }

    loadTags() {
        api("./tags", { method: "get" }).then(data => {
            this.setState({
                selectTags: data
            });
        });
    }

    componentDidMount() {
        this.loadTags();
    }

    render() {
        const { classes } = this.props;
        const tags = this.state.tags;
        var views = tags.map((tag, i) => {
            const num = i;
            return (
                <Chip
                    key={i}
                    onDelete={(e) => { this.deleteTag(e, num) }}
                    label={tag.name}
                    className={classes.chip}
                />
            );
        });
        const names = tags.map(x => x.name)
        const selectTags = this.state.selectTags.filter((x, i, self) => {
            return !names.includes(x.name) &&
                x.name.startsWith(this.state.input);
        });
        var items = selectTags.map((tag, i) => {
            const name = tag.name;
            return (
                <Chip
                    className={classes.chip}
                    key={i}
                    onClick={(e) => this.handleSelectTag(e, name)}
                    label={name}
                />
            );
        });

        return (
            <div>
                <Grid container>
                    <Grid item sm={1}>タグ: </Grid>
                    <Grid item sm={11}>{views}</Grid>
                </Grid>
                <Divider />
                <Grid container >
                    <Grid item sm={10}>
                        <FormControl fullWidth>
                            <InputLabel>新しいタグ</InputLabel>
                            <Input value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={2} style={{ position: "relative" }}>
                        <Button style={{ position: "absolute", bottom: 0 }} fullWidth type="button" variant="raised" color="primary" size="small" onClick={this.handleClick}>
                            追加
                        </Button>
                    </Grid>
                </Grid>
                <Paper style={{ maxHeight: 128, overflowY: 'scroll' }}>
                    {items}
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(InputTag)