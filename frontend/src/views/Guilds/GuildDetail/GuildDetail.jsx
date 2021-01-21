import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import withAuthentication from '../../../api/withAuthentication';
import Request from '../../../api/Request';
import Spinner from '../../../components/common/Spinner/Spinner';
import GoBack from '../../../components/common/GoBack/GoBack';
import Tabs from '../../../components/common/Tabs/Tabs';
import CreateRaidModal from '../../Raids/RaidModals/CreateRaidModal/CreateRaidModal';
import UpdateGuildModal from '../GuildModals/UpdateGuildModal/UpdateGuildModal';

function GuildDetail(props) {
  const [isNotMember, setIsNotMember] = useState(false);
  const { history } = props;
  const { guildid } = props.match.params;
  const user = localStorage.getItem('username');
  const handlePromote = (mutate, refetch) => () => {
    mutate().then(() => {
      refetch();
    });
  };
  const [tabs, setTabs] = useState(0);
  const handleTabClick = (nextTab) => (e) => {
    e.preventDefault();
    setTabs(nextTab);
  };
  const handleDeleteGuild = (mutate) => () => {
    mutate().then(() => {
      history.push('/home');
    });
  };
  const handleUpdateGuild = (mutate, refetch) => (state) => {
    mutate({
      name: state.name,
    }).then(() => {
      refetch();
    });
  };
  const handleCreateRaid = (mutate, refetch) => (state) => {
    mutate({
      user,
      guild_id: guildid,
      name: state.name,
      damage_slots: state.damage_slots,
      tank_slots: state.tank_slots,
      healer_slots: state.healer_slots,
    }).then(() => {
      refetch();
    });
  };
  const handleDeleteRaid = (mutate, refetch) => () => {
    mutate().then(() => {
      refetch();
    });
  };
  const onLeavingGuild = (mutate) => () => {
    mutate().then(() => {
      history.push('/home');
    });
  };
  const TabItems = ({ activeTab, elements }) => {
    if (typeof activeTab !== 'number' || activeTab >= elements?.lenght) return null;
    return elements[activeTab];
  };

  return (
    <div>
      <Request url={`http://127.0.0.1:8000/api/guild/${guildid}`}>
        {({ data, loading, refetch }) => {
          if (loading) return <Spinner />;
          return (
            <div>
              <div className="col-md-10 m-auto">
                <div className="card card-body">
                  <h2 className="text-center">{data?.guild_name}</h2>
                  {data?.guild_master_name === user && (
                    <div className="row">
                      <Request url={`http://127.0.0.1:8000/api/guild/${guildid}`} method="PUT">
                        {({ mutate, loading: isUpdating }) => {
                          if (isUpdating) return <Spinner />;
                          return (
                            <UpdateGuildModal
                              name={data?.guild_name}
                              refetch={refetch}
                              onUpdateGuild={handleUpdateGuild(mutate, refetch)}
                            />
                          );
                        }}
                      </Request>
                      <Request url={`http://127.0.0.1:8000/api/guild/${guildid}`} method="DELETE">
                        {({ mutate, loading: isDeleting }) => {
                          if (isDeleting) return <Spinner />;
                          return (
                            <button
                              type="button"
                              className="btn btn-danger"
                              title="delete"
                              onClick={handleDeleteGuild(mutate, refetch)}
                            >
                              Delete Guild
                            </button>
                          );
                        }}
                      </Request>
                    </div>
                  )}
                </div>
                <div>
                  <ul className="nav nav-tabs nav-justified">
                    <Tabs values={['Members', 'Raids']} onSelectTab={handleTabClick} />
                  </ul>
                </div>

                <TabItems
                  activeTab={tabs}
                  elements={[
                    <div className="table-responsive">
                      {/* Members tab */}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>Guild Position</th>
                            <th>Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.guild_members.map((member) => (
                            <tr key={member.id}>
                              {member[0] === user && member[1] !== 'member' && setIsNotMember(true)}
                              <td>{member[0]}</td>
                              <td>{member[1]}</td>
                              <td>
                                {((data?.guild_master_name === user &&
                                  member[1] !== 'Guild Master') ||
                                  (member[0] === user &&
                                    member[1] !== 'Guild Master' &&
                                    member[0] === user &&
                                    member[1] !== 'member')) && (
                                  <Request
                                    url={`http://127.0.0.1:8000/api/userto/mutate/${data?.guild_name}/${member[0]}`}
                                    method="PUT"
                                    variables={user}
                                  >
                                    {({ mutate }) => {
                                      if (loading) return <Spinner />;
                                      if (member[1] === 'member') {
                                        return (
                                          <button
                                            type="button"
                                            className="btn btn-info"
                                            title="promote"
                                            onClick={handlePromote(mutate, refetch)}
                                          >
                                            Promote
                                          </button>
                                        );
                                      }
                                      if (member[1] === 'Officer') {
                                        return (
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            title="promote"
                                            onClick={handlePromote(mutate, refetch)}
                                          >
                                            Demote
                                          </button>
                                        );
                                      }
                                    }}
                                  </Request>
                                )}
                                {member[0] === user && member[1] !== 'Guild Master' && (
                                  <Request
                                    url={`http://127.0.0.1:8000/api/userto/mutate/${data?.guild_name}/${user}`}
                                    method="DELETE"
                                  >
                                    {({ mutate, loading: isLeaving }) => {
                                      if (isLeaving) return <Spinner />;
                                      return (
                                        <button
                                          type="button"
                                          className="btn btn-warning"
                                          onClick={onLeavingGuild(mutate)}
                                        >
                                          Leave
                                        </button>
                                      );
                                    }}
                                  </Request>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>,
                    <div className="table-responsive">
                      {/* Raids tab */}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Raid Name</th>
                            <th>Details</th>
                            <th>
                              <Request url="http://127.0.0.1:8000/api/raid/create" method="POST">
                                {({ mutate, loading: isCreating }) => {
                                  if (isCreating) return <Spinner />;
                                  return (
                                    <CreateRaidModal
                                      canCreate={isNotMember}
                                      refetch={refetch}
                                      onCreateRaid={handleCreateRaid(mutate, refetch)}
                                    />
                                  );
                                }}
                              </Request>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.raids.map((raid) => (
                            <tr key={raid.id}>
                              <td className="col-sm-8">{raid[0]}</td>
                              <td>
                                <Link to={`/raid/${raid[1]}`} className="btn btn-info">
                                  Details
                                </Link>
                                {data?.guild_master_name === user && (
                                  <Request
                                    url={`http://127.0.0.1:8000/api/raid/${raid[1]}`}
                                    method="DELETE"
                                  >
                                    {({ mutate, loading: isDeleting }) => {
                                      if (isDeleting) return <Spinner />;
                                      return (
                                        <button
                                          type="button"
                                          className="btn btn-danger"
                                          onClick={handleDeleteRaid(mutate, refetch)}
                                        >
                                          Delete
                                        </button>
                                      );
                                    }}
                                  </Request>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>,
                  ]}
                />
              </div>
              <GoBack />
            </div>
          );
        }}
      </Request>
    </div>
  );
}

export default memo(withAuthentication(GuildDetail));
