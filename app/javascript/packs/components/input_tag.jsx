import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => {

}

class InputTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            tags: this.props.tags ? this.props.tags : []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.updateState = this.updateState.bind(this);
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
        if (this.input === '') return;
        var tags = this.state.tags;
        tags.push(this.state.input);
        var state = ({
            input: "",
            tags: tags
        });
        this.updateState(state);
    }

    deleteTag(e) {
        e.preventDefault();
        const target = e.target;
        const num = target.getAttribute('data-num');
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

    render() {

        const tags = this.state.tags;
        var views = [];
        for (var i in tags) {
            views.push(
                <Button key={i} data-num={i} onClick={this.deleteTag}>{tags[i]}</Button>
            );
        }

        return (
            <Grid container>
                <Grid item sm={12}>
                    タグ: {views}
                </Grid>
                <Grid item sm={12}>
                    <FormControl>
                        <InputLabel>新しいタグ</InputLabel>
                        <Input value={this.state.input} onChange={this.handleChange} />
                    </FormControl>
                    <Button type="button" variant="raised" color="primary" size="small" onClick={this.handleClick}>
                        追加
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InputTag)