import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const timezone = moment().format("Z");

class Menu extends React.Component {
d
  handleClick = (itemId, event) => {
    event.preventDefault();
    this.props.onElementClicked(itemId);
  };

  render() {
    if (this.props.mobile) {
      return (
        <ul id="slide-out" className="sidenav">
          <li>
            <b className="title">MKDOWNME</b>
          </li>
          <li>
            <a href="#!" onClick={ this.handleClick.bind(this, 'new_doc') }>
              <b className="title">Crear nuevo</b>
            </a>
          </li>
          { this.props.items.map((item, i) => (
            <li key={i}>
              <a href="#!" onClick={ this.handleClick.bind(this, item._id) }>
                <b className="title">{ item.name }</b> - { moment.utc(item.updatedAt).utcOffset(timezone).fromNow() }
              </a>
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
        <a href="#!" className="collection-item" onClick={ this.handleClick.bind(this, 'new_doc') }>
          <b className="title">Crear nuevo</b>
        </a>
        { this.props.items.map((item, i) => (
          <a href="#!" className="collection-item" key={i} onClick={ this.handleClick.bind(this, item._id) }>
            <b className="title">{ item.name }</b>
            <p className="date">
              { moment(item.updatedAt).utcOffset(timezone).fromNow() }
            </p>
          </a>
        )) }
      </div>
    );
  }
}

Menu.propTypes = {
  mobile: PropTypes.bool,
  onElementClicked: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
};

export default Menu;
