import React, { useState } from 'react';
import withAuthentication from '../../api/withAuthentication';
import Tabs from '../../components/common/Tabs/Tabs';
import Characters from '../Characters/Characters';
import GuildList from '../Guilds/Guilds';
import UserGuilds from '../Guilds/UserGuilds/UserGuilds';
import './Home.css';

function Home() {
  const [tabs, setTabs] = useState(0);

  const handleTabClick = (nextTab) => (e) => {
    e.preventDefault();
    setTabs(nextTab);
  };

  const TabItems = ({ activeTab, elements }) => {
    if (typeof activeTab !== 'number' || activeTab >= elements?.lenght) return null;
    return elements[activeTab];
  };

  return (
    <div className="col-md-10 m-auto">
      <div className="card card-body mt-12">
        <h2 className="text-center">Home</h2>
      </div>

      <ul className="nav nav-tabs nav-justified">
        <Tabs values={['Guilds', 'Characters', 'Account Settings']} onSelectTab={handleTabClick} />
      </ul>

      <TabItems
        activeTab={tabs}
        elements={[
          <div>
            <h3 className="text-center">Guilds tab</h3>
            <UserGuilds />
          </div>,
          <div>
            <h3 className="text-center">Chatacters tab</h3>
            <Characters />
          </div>,
          <div>
            <h3 className="text-center">Account Settings</h3>
          </div>,
        ]}
      />
    </div>
  );
}
export default withAuthentication(Home);
