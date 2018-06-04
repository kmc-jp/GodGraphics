import React from 'react'
import PropTypes from 'prop-types'
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText"
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

export default class LimitedInput extends React.Component {
    constructor(props) {
        super(props);
        const text = this.props.text ? this.props.text : "";
        const length = this.props.text ? this.props.text.length : 0;
        var state = {
            text: text,
            length: length,
            is_valid: this.isValid(length)
        };
        this.state = state;
        this.props.updateInput(this.props.name, state);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var target = e.target;
        var value = target.value;

        var state = {
            text: value,
            length: value.length,
            is_valid: this.isValid(value.length)
        };

        this.setState(state);
        this.props.updateInput(this.props.name, state);
    }

    isValid(length) {
        if (length == 0) {
            return this.props.allowEmpty ? true : false;
        } else {
            return length <= this.props.max;
        }
    }
    render() {

        let LengthHelper = () => {
            var text = this.state.length + "/" + this.props.max;
            if (this.isValid(this.state.length)) {
                return (
                    <FormHelperText>{text}</FormHelperText>
                );
            } else {

                return (
                    <FormHelperText error>{text}</FormHelperText>
                );
            }
        };
        return (
            <FormControl fullWidth={this.props.fullWidth}>
                <InputLabel>{this.props.label}</InputLabel>
                <Input
                    value={this.state.text}
                    onChange={this.handleChange}
                    rows={this.props.rows}
                    multiline={this.props.multiline}
                />
                <LengthHelper />
            </FormControl>
        );
    }
}

LimitedInput.propTypes = {
    label: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    updateInput: PropTypes.func.isRequired
}
