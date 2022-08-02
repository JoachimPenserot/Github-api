import Avatar from '../img/Myself.jfif';

import InformationContainer from './InformationContainer';

import "../styles/components/sidebar.sass";

const Sidebar = () => {
  return (
    <aside id="sidebar">
        <img src={Avatar} alt="Joachim Penserot" />
        <InformationContainer/>
    </aside>
  )
}

export default Sidebar