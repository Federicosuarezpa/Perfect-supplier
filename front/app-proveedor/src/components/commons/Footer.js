import logoTwitter from '../../svg/twitter.svg';
import logoLinkedin from '../../svg/linkedin.svg';
import logoGithub from '../../svg/github.svg';

export default function Footer() {
  return (
    <div>
      <div className="footer-content">
        <h1>
          <a target="_blank" rel="noopener noreferrer" href="/">
            F2F Business
          </a>
        </h1>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com">
            <img src={logoTwitter} className="icon" alt="website logo" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/federico-hern%C3%A1n-su%C3%A1rez-palavecino-8374011bb/"
          >
            <img src={logoLinkedin} className="icon" alt="website logo" />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Federicosuarezpa">
            <img src={logoGithub} className="icon" alt="website logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
