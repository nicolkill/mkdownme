import React from 'react';
import PropTypes from "prop-types";

import BackendApi from '../data_source/BackendApi';

import Editor from '../components/Editor';
import Preview from "../components/Preview";
import MobileButton from '../components/navigation_menu/MobileButton';

import './App.css';

class App extends React.Component {
  state = {
    showDelete: true,
    selectedDoc: undefined,
  };

  getDocData = async (docId) => {
    const selectedDoc = (await BackendApi.getOne(docId)).data;
    this.setState({
      selectedDoc,
    });
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getDocData(this.props.match.params.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getDocData(this.props.match.params.id)
    }
  }

  onChange = (content) => {
    const state = this.state;
    state.selectedDoc.content = content;
    this.setState(state);
  };

  onFinishTyping = async () => {
    const selectedDoc = (await BackendApi.update(
      this.state.selectedDoc._id,
      this.state.selectedDoc.content,
    )).data;

    this.setState({
      selectedDoc,
      showDelete: true,
    });

    this.props.onChange(selectedDoc);
  };

  onStartTyping = () => {
    this.setState({
      showDelete: false,
    });
  };

  onDeleteClicked = async () => {
    await BackendApi.delete(this.state.selectedDoc._id);

    this.props.onDelete(this.state.selectedDoc);

    this.setState({
      selectedDoc: undefined,
    });

    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="col m6 l5">
          <MobileButton/>
          { this.state.selectedDoc &&
          <Editor
            onChange={ this.onChange }
            onStartTyping={this.onStartTyping}
            onFinishTyping={this.onFinishTyping}
            content={ this.state.selectedDoc.content }
          /> }
        </div>
        <div className="col m6 l5">
          { this.state.selectedDoc &&
          <Preview
            showDelete={this.state.showDelete}
            onDeleteClicked={ this.onDeleteClicked }
            content={ this.state.selectedDoc.content }
          /> }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default App;
