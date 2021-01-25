import React, { PureComponent } from 'react';
import Request from '../../api/Request';
import Spinner from '../../components/common/Spinner/Spinner';
import GuildList from './GuildList';

class Guilds extends PureComponent {
  render() {
    const username = localStorage.getItem('username');
    return (
      <Request url={`http://127.0.0.1:8000/api/guild/list/${username}`}>
        {({ data, loading, refetch }) => {
          if (loading) return <Spinner />;
          return <GuildList guilds={data} refetch={refetch} />;
        }}
      </Request>
    );
  }
}
export default Guilds;
