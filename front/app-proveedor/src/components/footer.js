import logoTwitter from '../twitter.svg';
import logoInstagram from '../instagram.svg';
import logoGithub from '../github.svg';
export default function Footer() {
  return (
    <div>
      <div className="footer-content">
        <h1>
          <a class="remark">F2F Business</a>
        </h1>
        <a href="#">
          <i class="fa fa-facebook">
            <img src={logoTwitter} className="hola" alt="website logo" />
          </i>
          <i class="fa fa-facebook">
            <img src={logoInstagram} className="hola" alt="website logo" />
          </i>
          <i class="fa fa-facebook">
            <img src={logoGithub} className="hola" alt="website logo" />
          </i>
        </a>
      </div>
    </div>
  );
}
