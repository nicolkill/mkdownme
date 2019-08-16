import React from 'react';
import PropTypes from "prop-types";
import showdown from 'showdown';

showdown.setOption('simpleLineBreaks', true);

const converter = new showdown.Converter()

class Preview extends React.Component {

  render() {
    return (
      <div className="result" dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.content) }} />
    );
  }
}

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
