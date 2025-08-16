import React from 'react';
import './TopNav.css';

// --- SVG Icons ---
const MenuIcon = () => <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>;

const TopNav = () => {
    return (
        <header className="top-nav">
            <div className="nav-left">
                <button className="hamburger-btn mobile-only" aria-label="Menu">
                    <MenuIcon />
                </button>

                <div className="user-profile desktop-only">
                    <div className="user-avatar">JA</div>
                    <div className="user-info">
                        <span className="user-name">John Andre</span>
                        <span className="user-company">Storfjord AS</span>
                    </div>
                </div>
            </div>

            <div className="nav-right">
                <span>Norsk Bokmal</span>
                <span className="flag-icon">🇳🇴</span>
            </div>
        </header>
    );
};

export default TopNav;