import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Intro extends PureComponent {
    render() {
        const { intro } = this.props;

        return (
            <div className="tapp__intro">
                {intro}
            </div>
        );
    }
}

Intro.propTypes = {
    intro: PropTypes.string.isRequired,
};

export default Intro;
