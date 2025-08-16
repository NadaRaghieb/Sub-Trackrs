import './footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  const footerText = 'صُنع بشغف ❤️ وتعاون 🤝 بواسطة فريق SubTrackrs';
  
  return (
    <footer id="footer">
      <div className="container footer-container">
        <p className="footer__text">
          {footerText} 
        </p>
        <p className="footer__text">{year}</p>
      </div>
    </footer>
  );
};

export default Footer;
