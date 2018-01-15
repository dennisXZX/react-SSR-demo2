import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import requireAuth from '../components/HOCs/requireAuth';

class AdminListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>
    })
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>
          {this.renderAdmins()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ admins }) {
  return { admins: admins }
}

export default {
  // { fetchAdmin } is short for { fetchAdmin: fetchAdmin }
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminListPage)),
  loadData: ({ dispatch } ) => dispatch(fetchAdmins())
}
