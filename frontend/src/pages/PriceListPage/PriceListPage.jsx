import React, { useState, useMemo } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductTable from '../../components/ProductTable/ProductTable';
import './PriceListPage.css';

// --- Dummy Data (with more fields for expansion) ---
const createDummyProduct = (id) => ({
  id,
  articleNo: 123456780 + id,
  productName: `Test Product ${String.fromCharCode(65 + (id % 26))}${id} with a potentially long name`,
  inPrice: 90500 + id * 150,
  price: 150080 + id * 250,
  unit: 'pcs',
  inStock: 25000 + id * 50,
  description: `This is the detailed description for product item #${id}. It can be quite long and will be hidden on smaller screens.`,
});
const initialProducts = Array.from({ length: 25 }, (_, i) => createDummyProduct(i + 1));

// --- The Page Component ---
const PriceListPage = () => {
    const [products, setProducts] = useState(initialProducts);
    const [sortConfig, setSortConfig] = useState({ key: 'articleNo', direction: 'ascending' });
    const [expandedRowId, setExpandedRowId] = useState(null); // State for expanded row

    const sortedProducts = useMemo(() => {
        let sortableItems = [...products];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
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
    
    // Handler to toggle which row is expanded
    const handleToggleExpand = (id) => {
        setExpandedRowId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="page-layout">
            <TopNav />
            <div className="page-body">
                <Sidebar />
                <main className="main-content">
                    <Controls />
                    <div className="content-area">
                        <ProductTable 
                            products={sortedProducts} 
                            onSort={handleSort} 
                            sortConfig={sortConfig}
                            expandedRowId={expandedRowId}
                            onToggleExpand={handleToggleExpand}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PriceListPage;