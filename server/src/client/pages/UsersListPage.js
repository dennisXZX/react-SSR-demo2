import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/index';

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        Here is a list of users:
        <ul>
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

function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  // { fetchUsers } is short for { fetchUsers: fetchUsers }
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
  loadData: loadData
};