import React, { Component } from 'react';
import withAuthentication from '../../../api/withAuthentication';
import GuildDetailView from './GuildDetailView';
import Request from '../../../api/Request';

class GuildDetail extends Component {
  state = {
    details: [],
  };

  // componentDidMount() {
  //   const { guildid } = this.props.match.params;
  //   console.log(guildid);
  //   fetch(`http://127.0.0.1:8000/api/guild/${guildid}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({ details: data });
  //     });
  // }

  render() {
    // return <GuildDetailView guilds={this.state.details} />;
    const { guildid } = this.props.match.params;
    return (
      <Request url={`http://127.0.0.1:8000/api/guild/${guildid}`}>
        {({ data, loading }) => {
          if (loading) {
            return <span>Loading</span>;
          }
          console.log(data);
          return <span>aaa</span>;
        }}
      </Request>
    );
  }
}
export default withAuthentication(GuildDetail);
