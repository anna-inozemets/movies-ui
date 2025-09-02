import Logo from '../../assets/logo.webp';
import './Header.css';

export const Header = () => (
  <header className="header">
    <div className="container df">
      <img src={Logo} alt="logo" />
      <h1>Movies</h1>
    </div>
  </header>
)