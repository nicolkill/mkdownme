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
      content: '',
    };
  }

  async getAllDocuments() {
    const docList = await BackendApi.getAll();

    this.setState({
      docList: docList.data
    });
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});
  }

  onChange = (content) => {
    this.setState({
      content,
    });
  };

  onMenuElementClicked = async (itemId) => {
    if (itemId === 'new_doc') {
      // TODO: create document on backend
      this.getAllDocuments();
    } else {
      const doc = await BackendApi.getOne(itemId);
      this.setState({
        content: doc.content,
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
            <Editor content={ this.state.content } onChange={ this.onChange }/>
          </div>
          <div className="col m6 l5">
            <Preview content={ this.state.content }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
