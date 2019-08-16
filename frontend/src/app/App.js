import React from 'react';

import BackendApi from '../data_source/BackendApi';

import Editor from '../components/Editor';
import Preview from "../components/Preview";
import Menu from '../components/navigation_menu/Menu';
import MobileButton from '../components/navigation_menu/MobileButton';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docList: [],
      selectedDoc: {
        content: '',
      },
    };
  }

  getAllDocuments = async () => {
    const docList = (await BackendApi.getAll()).data;

    if (docList.length === 0) {
      const selectedDoc = (await BackendApi.create()).data;
      docList.push(selectedDoc);
    }
    this.setState({
      docList
    });
  };

  createEmptyDoc = async () => {
    const selectedDoc = (await BackendApi.create()).data;
    this.setState({
      selectedDoc,
    });
    this.getAllDocuments();
  };

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});

    this.getAllDocuments();
  }

  onChange = (content) => {
    this.setState({
      selectedDoc: { content },
    });
  };

  onMenuElementClicked = async (itemId) => {
    if (itemId === 'new_doc') {
      this.createEmptyDoc();
    } else {
      const selectedDoc = (await BackendApi.getOne(itemId)).data;
      this.setState({
        selectedDoc,
      });
    }
  };

  render() {
    return (
      <div>
        <Menu items={ this.state.docList } onElementClicked={ this.onMenuElementClicked } mobile/>
        <div className="row">
          <div className="col l2 hide-on-med-and-down">
            <Menu items={ this.state.docList } onElementClicked={ this.onMenuElementClicked }/>
          </div>
          <div className="col m6 l5">
            <MobileButton/>
            <Editor content={ this.state.selectedDoc.content } onChange={ this.onChange }/>
          </div>
          <div className="col m6 l5">
            <Preview content={ this.state.selectedDoc.content }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
