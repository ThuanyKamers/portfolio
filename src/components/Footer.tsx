import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="py-10 border-t text-center"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--card-bg)'
      }}
    >
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2026 Thuany Paula Kamers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;