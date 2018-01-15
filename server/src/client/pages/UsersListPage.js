import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/index';
import { Helmet } from 'react-helmet';

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id} className="collection-item">{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.head()}
        <ul className="collection with-header">
          <li className="collection-header"><h4>Here is a list of users:</h4></li>
          {this.renderUsers()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

// manually dispatch an action from the store
function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  // { fetchUsers } is short for { fetchUsers: fetchUsers }
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
  loadData: loadData
};