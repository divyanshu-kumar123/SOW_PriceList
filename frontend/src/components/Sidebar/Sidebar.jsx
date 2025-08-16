import React from 'react';
import './Sidebar.css';

// --- SVG Icons for the menu ---
const InvoiceIcon = () => <svg viewBox="0 0 24 24"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/></svg>;
const CustomerIcon = () => <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const BusinessIcon = () => <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/></svg>;
const PriceListIcon = () => <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>;
const MultiInvoiceIcon = () => <svg viewBox="0 0 24 24"><path d="M8 8H6v9h11v-2H8V8zm2-2v9h11V6H10zm-4-4v9h11V2H6z"/></svg>;
const OfferIcon = () => <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>;
const InventoryIcon = () => <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>;

const menuItems = [
    { id: 'invoices', label: 'Invoices', icon: <InvoiceIcon /> },
    { id: 'customers', label: 'Customers', icon: <CustomerIcon /> },
    { id: 'my-business', label: 'My Business', icon: <BusinessIcon /> },
    { id: 'price-list', label: 'Price List', icon: <PriceListIcon /> },
    { id: 'multiple-invoicing', label: 'Multiple Invoicing', icon: <MultiInvoiceIcon /> },
    { id: 'unpaid-invoices', label: 'Unpaid Invoices', icon: <InvoiceIcon /> },
    { id: 'offer', label: 'Offer', icon: <OfferIcon /> },
    { id: 'inventory-control', label: 'Inventory Control', icon: <InventoryIcon /> },
];


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="menu">
                <p>Menu</p>
                <ul>
                    {menuItems.map(item => (
                         <li 
                            key={item.id} 
                            className={item.id === 'price-list' ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;