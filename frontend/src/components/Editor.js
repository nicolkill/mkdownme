import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.Component {

  state = {
    timer: undefined,
  };

  onChange = (event) => this.props.onChange(event.target.value);

  onKeyDown = () => {
    clearTimeout(this.state.timer);
  };

  onKeyUp = () => {
    this.onKeyDown();
    this.setState({
      timer: setTimeout(this.props.onFinishTyping, 2000)
    });
  };

  render() {
    return (
      <textarea
        className="editor"
        onKeyUp={ this.onKeyUp }
        onChange={ this.onChange }
        onKeyDown={ this.onKeyDown }
        value={ this.props.content }
      />
    );
  }
}

Editor.propTypes = {
  onFinishTyping: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Editor;
