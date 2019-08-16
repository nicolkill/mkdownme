import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.Component {

  onChange = (event) => this.props.onChange(event.target.value);

  render() {
    return (
      <textarea className="editor" onChange={ this.onChange }/>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Editor;
