import React, { Component } from 'react';
import withAuthentication from '../../api/withAuthentication';
import GuildList from './GuildList';

class Guild extends Component {
  state = {
    guilds: [],
  };

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/guild/list')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ guilds: data });
      });
  }

  render() {
    return <GuildList guilds={this.state.guilds} />;
  }
}
export default withAuthentication(Guild);
