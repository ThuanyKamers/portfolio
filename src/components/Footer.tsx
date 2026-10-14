import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer 
      className="py-10 border-t text-center"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--card-bg)'
      }}
    >
      <SocialLinks size={36} className="mb-6" />
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2026 Thuany Paula Kamers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;