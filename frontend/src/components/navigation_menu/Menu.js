import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const timezone = moment().format("Z");

class Menu extends React.Component {

  handleClick = (itemId, event) => {
    event.preventDefault();

    this.props.onElementClicked(itemId);
  };

  render() {
    if (this.props.mobile) {
      return (
        <ul id="slide-out" className="sidenav">
          { this.props.items.map((item, i) => (
            <li key={i}>
              <a href="#!" onClick={ this.handleClick.bind(this, item.id) }>
                <b className="title">{ item.name }</b> - { moment.utc(item.updatedAt).utcOffset(timezone).fromNow() }
              </a>
            </li>
          )) }
        </ul>
      );
    }

    return (
      <div className="collection">
        { this.props.items.map((item, i) => (
          <a href="#!" className="collection-item" key={i} onClick={ this.handleClick.bind(this, item.id) }>
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
