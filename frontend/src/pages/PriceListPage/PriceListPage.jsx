import React, { useState, useEffect, useMemo } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductTable from '../../components/ProductTable/ProductTable';
import './PriceListPage.css';

// The base URL for our API, imported from the .env file
const API_URL = import.meta.env.VITE_API_BASE_URL;


const PriceListPage = () => {
    const [products, setProducts] = useState([]); // Initial state is now an empty array
    const [isLoading, setIsLoading] = useState(true); // To show a loading message
    const [error, setError] = useState(null); // To show any errors
    
    const [sortConfig, setSortConfig] = useState({ key: 'articleNo', direction: 'ascending' });
    const [expandedRowId, setExpandedRowId] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Set the fetched data into state
            } catch (error) {
                setError(error.message); // Set error state if fetching fails
            } finally {
                setIsLoading(false); // Stop loading, whether successful or not
            }
        };

        fetchProducts();
    }, []); // The empty array [] means this effect runs only once

    const sortedProducts = useMemo(() => {
        let sortableItems = [...products];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                // Handle numeric sorting for appropriate fields
                const fieldsToSortAsNumbers = ['articleNo', 'inPrice', 'price', 'inStock'];
                const valA = fieldsToSortAsNumbers.includes(sortConfig.key) ? parseFloat(a[sortConfig.key]) : a[sortConfig.key];
                const valB = fieldsToSortAsNumbers.includes(sortConfig.key) ? parseFloat(b[sortConfig.key]) : b[sortConfig.key];

                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [products, sortConfig]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    const handleToggleExpand = (id) => {
        setExpandedRowId(prevId => (prevId === id ? null : id));
    };

    // Helper function to render the main content
    const renderContent = () => {
        if (isLoading) {
            return <p style={{ textAlign: 'center' }}>Loading products...</p>;
        }
        if (error) {
            return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
        }
        return (
            <ProductTable 
                products={sortedProducts} 
                onSort={handleSort} 
                sortConfig={sortConfig}
                expandedRowId={expandedRowId}
                onToggleExpand={handleToggleExpand}
            />
        );
    };

    return (
        <div className="page-layout">
            <TopNav />
            <div className="page-body">
                <Sidebar />
                <main className="main-content">
                    <Controls />
                    <div className="content-area">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PriceListPage;