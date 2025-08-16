import React from 'react';
import './Controls.css';

const SearchIcon = () => <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>;
const AddIcon = () => <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>;
const PrintIcon = () => <svg viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></svg>;
const ToggleIcon = () => <svg viewBox="0 0 40 24" style={{verticalAlign: 'middle'}}><rect x="0" y="0" width="40" height="24" rx="12" fill="#E0E0E0"/><rect x="18" y="2" width="20" height="20" rx="10" fill="white"/></svg>;


const Controls = () => {
    return (
        <section className="controls-section">
            <div className="search-container">
                <div className="search-bar">
                    <input type="text" placeholder="Search Article No..." />
                    <SearchIcon />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search Product..." />
                    <SearchIcon />
                </div>
            </div>
            <div className="actions-container">
                <button className="action-btn">
                    <span className="button-text">New Product</span> <AddIcon />
                </button>
                <button className="action-btn">
                    <span className="button-text">Print List</span> <PrintIcon />
                </button>
                <button className="action-btn">
                    <span className="button-text">Advanced Mode</span> <ToggleIcon />
                </button>
            </div>
        </section>
    );
};

export default Controls;