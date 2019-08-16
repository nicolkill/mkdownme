import React from 'react';
import showdown from 'showdown';

import Editor from '../components/Editor';
import Preview from "../components/Preview";

import './App.css';

showdown.setOption('simpleLineBreaks', true);

const converter = new showdown.Converter()

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});
  }

  onChange = (content) => {
    this.setState({
      content,
    });
  };

  render() {
    return (
      <div>

        <ul id="slide-out" className="sidenav">
          <li>
            <a href="#!">
              <b className="title">Title</b> - 3 day ago
            </a>
          </li>
        </ul>

        <div className="row">

          <div className="col l2 hide-on-med-and-down">

            <div className="collection">
              <a href="#!" className="collection-item">
                <b className="title">Title</b>
                <p className="date">
                  3 day ago
                </p>
              </a>
            </div>

          </div>

          <div className="col m6 l5">
            <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only">
              <i className="material-icons">menu</i>
            </a>

            <Editor onChange={ this.onChange }/>
          </div>
          <div className="col m6 l5">
            <Preview content={this.state.content}/>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
