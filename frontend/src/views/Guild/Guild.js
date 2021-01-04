import React, { Component } from 'react';
import Request from '../../api/Request';
import withAuthentication from '../../api/withAuthentication';

class Guild extends Component {
  render() {
    return (
      <div>
        <>
        <Request url="http://127.0.0.1:8000/api/guild/list">
          {' '}
          {({ data }) => {
            console.log(data);
            return null;
          }}{' '}
          </Request>
          </>
      </div>
    );
  }
}
export default withAuthentication(Guild);
