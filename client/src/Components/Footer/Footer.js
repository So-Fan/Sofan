import React from 'react';
import './Footer.css';
import SocialLinks from './SocialLinks/SocialLinks';
import InstagramLogo from '../../Assets/Image/SocialIcons/instagram.svg'
import LinkedInLogo from '../../Assets/Image/SocialIcons/linkedin.svg'

const links = [
    { icon: InstagramLogo, url: 'https://www.instagram.com/sofan_app/' },
    { icon: LinkedInLogo, url: 'https://www.linkedin.com/company/sofan-app/' }
  ];
  const year = new Date().getFullYear();
function Footer() {
    return (
        <footer className='footer-container'>
            <SocialLinks links={links} />
            <div className='copyright-section'>
                <p>&copy; {year} Copyright: Sofan</p>
            </div>
        </footer>
    );
}

export default Footer;