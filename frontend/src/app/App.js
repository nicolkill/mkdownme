import React from 'react';

import Editor from '../components/Editor';
import Preview from "../components/Preview";
import Menu from '../components/navigation_menu/Menu';
import MobileButton from '../components/navigation_menu/MobileButton';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docList: [
        {
          id: 'abcdefg',
          name: 'doc perron',
          updatedAt: '2019-08-16 00:04:00',
        },
      ],
      content: '',
    };
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});

    // TODO: make axios call to get list
  }

  onChange = (content) => {
    this.setState({
      content,
    });
  };

  onMenuElementClicked = (itemId) => {
    // TODO: make axios call to get one element
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
