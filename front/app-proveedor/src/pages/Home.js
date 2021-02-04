import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div>
        <div className="topnav" id="myTopnav">
          <header>
            <myheader></myheader>
          </header>
        </div>
        <div className="back">
          <div className="info">
            <h1>F2F Business</h1>
            <h2>El portal web donde puedes encontrar lo que necesitas</h2>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
