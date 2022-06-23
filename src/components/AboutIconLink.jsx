import {FaQuestion} from 'react-icons/fa';

// We dont usually want to use the a tag with a href attribute to route to different pages, because it causes refresh issues so we will use a link from react-router-dom
import {Link} from 'react-router-dom';

function AboutIconLink() {
  return (
    <div className="about-link">
        <Link to='/about'>
            <FaQuestion size={30}/>
        </Link>
    </div>
  )
}

export default AboutIconLink