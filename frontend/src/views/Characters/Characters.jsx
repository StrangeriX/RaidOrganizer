import React, { PureComponent } from 'react';
import Request from '../../api/Request';
import withAuthentication from '../../api/withAuthentication';
import CharactersList from './CharactersList';

class Guild extends PureComponent {
  render() {
    const username = localStorage.getItem('username');
    return (
      <Request url={`http://127.0.0.1:8000/api/char/${username}`}>
        {({ data, loading, refetch }) => {
          if (loading) {
            return <span>loading</span>;
          }
          console.log({ data });
          return <CharactersList characters={data} refetch={refetch} />;
        }}
      </Request>
    );
  }
}
export default withAuthentication(Guild);
