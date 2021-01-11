import React, { PureComponent } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import withAuthentication from '../../../api/withAuthentication';
import Request from '../../../api/Request';
import Spinner from '../../../components/common/Spinner/Spinner';
import GoBack from '../../../components/common/GoBack/GoBack';

class GuildDetail extends PureComponent {
  state = {
    open: false,
  };

  setOpen = () =>
    this.setState((prevState) => ({
      open: !prevState.open,
    }));

  render() {
    const { guildid } = this.props.match.params;
    return (
      <div>
        <Request url={`http://127.0.0.1:8000/api/guild/${guildid}`}>
          {({ data, loading }) => {
            if (loading) {
              return <Spinner />;
            }
            console.log(data);
            return (
              <div className="col-md-10 m-auto">
                <div className="card card-body mt-12">
                  <h2 className="text-center">{data?.guild_name}</h2>
                </div>
                <div className="col-md-10 m-auto">
                  <div className="card card-bold col-md-12 m-auto">
                    <div className="col-8 text-center">Members:</div>
                    <button type="button" className="col-2" onClick={this.Setopen}>
                      aaa
                    </button>
                  </div>

                  <div className="list-group">
                    {data?.guild_members.map((member) => (
                      <div key={member.id} className="list-group-item">
                        <div className="row" id="member-list">
                          <div className="col-6">{member[0]}</div>
                          <div>{member[1]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 m-auto">
                  <div className="card card-body md-12">
                    <h3 className="text-center">Raids</h3>
                  </div>
                </div>
                <div className="col-md-10 m-auto card card-bold">
                  {data?.raids.map((raid) => (
                    <div className="row">
                      <div className="list-group col-md-8 m-auto" key={raid.id}>
                        <div className="list-group-item md-8">
                          <div className="col-sm-8">{raid[0]}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <Link to={`/raid/${raid[1]}`} className="btn btn-info">
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <GoBack />
                <button type="button" className="btn btn-danger">
                  a
                </button>
              </div>
            );
          }}
        </Request>
      </div>
    );
  }
}
export default withAuthentication(GuildDetail);
