import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Headline extends PureComponent {
    render() {
        const { headline } = this.props;

        return <h1>{headline}</h1>;
    }
}

Headline.propTypes = {
    headline: PropTypes.string.isRequired,
};

export default Headline;
