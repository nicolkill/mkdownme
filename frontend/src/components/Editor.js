import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.Component {

  onChange = (event) => this.props.onChange(event.target.value);

  render() {
    return (
      <textarea value={ this.props.content } className="editor" onChange={ this.onChange }/>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Editor;
