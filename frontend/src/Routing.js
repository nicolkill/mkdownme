import React, { Component } from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";

import App from "./app/App";
import Menu from "./components/navigation_menu/Menu";
import BackendApi from "./data_source/BackendApi";

class Routing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      docList: [],
    };
  }

  getAllDocuments = async () => {
    const docList = (await BackendApi.getAll()).data;

    this.setState({
      docList
    });
  };

  createEmptyDoc = async () => {
    await BackendApi.create()

    this.getAllDocuments();
  };

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});

    this.getAllDocuments();
  }

  onChange = (newDoc) => {
    const docList = this.state.docList;
    this.setState({
      docList: [newDoc, ...docList.filter(d => d._id !== newDoc._id)]
    });
  };

  onDelete = (oldDoc) => {
    const docList = this.state.docList;
    this.setState({
      docList: docList.filter(d => d._id !== oldDoc._id)
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Menu items={ this.state.docList } handleNewDocClick={ this.createEmptyDoc } mobile/>
        <div className="row">
          <div className="col l2 hide-on-med-and-down">
            <Menu items={ this.state.docList } handleNewDocClick={ this.createEmptyDoc }/>
          </div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/doc/:id" component={ (props) => (
                <App {...props} onChange={this.onChange} onDelete={this.onDelete} />
              ) } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routing;
