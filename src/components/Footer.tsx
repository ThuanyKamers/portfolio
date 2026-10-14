import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer 
      className="py-10 text-center"
      style={{ 
        backgroundColor: 'var(--background)'

      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <SocialLinks size={36} />
      </div>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2026 Thuany Paula Kamers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;