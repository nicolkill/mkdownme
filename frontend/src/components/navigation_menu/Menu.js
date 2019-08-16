import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import { Link } from "react-router-dom";

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const timezone = moment().format("Z");

class Menu extends React.Component {

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, {});
  }

  handleNewDocClick = (event) => {
    event.preventDefault();
    this.props.handleNewDocClick();
  };

  render() {
    if (this.props.mobile) {
      return (
        <ul id="slide-out" className="sidenav">
          <li>
            <b className="title">MKDOWNME</b>
          </li>
          <li>
            <a href="#!" onClick={ this.handleNewDocClick }>
              <b className="title">Crear nuevo</b>
            </a>
          </li>
          { this.props.items.map((item, i) => (
            <li key={i}>
              <Link to={`/doc/${item._id}`}>
                <b className="title truncate">{ item.name }</b> - { moment.utc(item.updatedAt).utcOffset(timezone).fromNow() }
              </Link>
            </li>
          )) }
        </ul>
      );
    }

    return (
      <div className="collection">
        <div className="collection-item">
          <b className="title">MKDOWNME</b>
        </div>
        <a href="#!" className="collection-item" onClick={ this.handleNewDocClick }>
          <b className="title">Crear nuevo</b>
        </a>
        { this.props.items.map((item, i) => (
          <Link to={`/doc/${item._id}`} className="collection-item" key={i}>
            <b className="title truncate">{ item.name }</b>
            <p className="date">
              { moment(item.updatedAt).utcOffset(timezone).fromNow() }
            </p>
          </Link>
        )) }
      </div>
    );
  }
}

Menu.propTypes = {
  mobile: PropTypes.bool,
  handleNewDocClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
};

export default Menu;
