import logoTwitter from '../svg/twitter.svg';
import logoInstagram from '../svg/linkedin.svg';
import logoGithub from '../svg/github.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div className="footer-content">
        <h1>
          <a>F2F Business</a>
        </h1>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://facebook.com">
            <img src={logoTwitter} className="icon" alt="website logo" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/federico-hern%C3%A1n-su%C3%A1rez-palavecino-8374011bb/"
          >
            <img src={logoInstagram} className="icon" alt="website logo" />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Federicosuarezpa">
            <img src={logoGithub} className="icon" alt="website logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
