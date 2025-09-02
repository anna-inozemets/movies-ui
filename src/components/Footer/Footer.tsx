import CompanyLogo from '../../assets/company-logo.webp';
import './Footer.css';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>Performed as part of a test task for the <span>webbylab</span> company</p>
      <a href="https://webbylab.com/" target='_blank'><img src={CompanyLogo} alt="logo" /></a>
    </div>
  </footer>
)