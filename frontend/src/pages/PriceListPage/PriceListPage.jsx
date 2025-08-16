import React, { useState, useEffect, useMemo } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductTable from '../../components/ProductTable/ProductTable';
import './PriceListPage.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const PriceListPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'articleNo', direction: 'ascending' });
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [editingCell, setEditingCell] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e, productId) => {
        const { name, value } = e.target;
        const updatedProducts = products.map(p =>
            p.id === productId ? { ...p, [name]: value } : p
        );
        setProducts(updatedProducts);
    };

    const handleSaveProduct = async (productId) => {
        const productToSave = products.find(p => p.id === productId);
        if (!productToSave) return;

        setEditingCell(null);

        try {
            const response = await fetch(`${API_URL}/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave),
            });
            if (!response.ok) throw new Error('Failed to save product');
            console.log(`Product ${productId} saved successfully!`);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleSetEditing = (productId, fieldName) => {
        setEditingCell({ productId, fieldName });
    };
    
    // THIS IS THE CORRECTED PART
    const sortedProducts = useMemo(() => {
        let sortableItems = [...products];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
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

    const renderContent = () => {
        if (isLoading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
        if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
        return (
            <ProductTable
                products={sortedProducts}
                onSort={handleSort}
                sortConfig={sortConfig}
                expandedRowId={expandedRowId}
                onToggleExpand={handleToggleExpand}
                onInputChange={handleInputChange}
                onSaveProduct={handleSaveProduct}
                editingCell={editingCell}
                onSetEditing={handleSetEditing}
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