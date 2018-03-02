import React from 'react';
import PropTypes from 'prop-types';

class NativeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleChange = event => {
        const val = event.target;
        this.setState({ value: val }, this.props.onChange(val));
    };

    render() {
        const { options, className } = this.props;
        const opts = options.map(val => (
            <option key={val.name + val.label} value={val.value}>
                {val.label}
            </option>
        ));
        return (
            <select
                onChange={this.handleChange}
                className={`nativeSelect ${className}`}
            >
                {opts}
            </select>
        );
    }
}

NativeSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.string,
            link: PropTypes.string,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};
NativeSelect.defaultProps = {
    className: '',
};

export default NativeSelect;
