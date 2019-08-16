import React from 'react';
import PropTypes from "prop-types";
import showdown from 'showdown';

showdown.setOption('simpleLineBreaks', true);

const converter = new showdown.Converter()

class Preview extends React.Component {

  onDeleteClicked = (event) => {
    event.preventDefault();

    this.props.onDeleteClicked();
  };

  render() {
    return (
      <div className="result">
        <a href="!#" onClick={ this.onDeleteClicked }>Delete</a>
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.content) }} />
      </div>
    );
  }
}

Preview.propTypes = {
  content: PropTypes.string.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
};

export default Preview;
