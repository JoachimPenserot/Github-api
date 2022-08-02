import { IoConstructOutline, IoHome } from "react-icons/io5"

import '../styles/components/informationcontainer.sass';

const InformationContainer = () => {
  return (
    <section id="information-container">
        <div className="info-card">
            <IoHome id="home" />
            <div>
                Home
            </div>
        </div>
        <div className="info-card">
            <IoConstructOutline id="favorite"/>{/**Still under construction ^^ */}
            <div>
                Favorite
            </div>
        </div>
    </section>
  )
}

export default InformationContainer