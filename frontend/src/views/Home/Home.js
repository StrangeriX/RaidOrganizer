import React from 'react';
import withAuthentication from '../../api/withAuthentication';
import Sidebar from '../../components/layout/Sidebar';
// import './Home.scss';

function Home() {
  return <Sidebar />;
}
export default withAuthentication(Home);
