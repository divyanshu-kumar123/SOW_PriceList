import React from 'react';
import Tag from '../Tag/Tag';
import './ProductTable.css';

// --- Icons ---
const SortArrow = ({ direction }) => <span className={`sort-arrow ${direction === 'descending' ? 'desc' : ''}`}>▲</span>;
const ExpandArrowIcon = () => <svg className="row-icon" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>;
const MoreIcon = () => <svg className="row-icon" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>;

const ProductTable = ({ products, onSort, sortConfig, expandedRowId, onToggleExpand }) => {
    const headers = [
        // Keys match product object, classes are for responsive hiding
        { key: 'articleNo', label: 'Article No.', class: 'hide-mobile' },
        { key: 'productName', label: 'Product/Service' },
        { key: 'inPrice', label: 'In Price', class: 'hide-tablet' },
        { key: 'price', label: 'Price' },
        { key: 'unit', label: 'Unit', class: 'hide-tablet' },
        { key: 'inStock', label: 'In Stock', class: 'hide-tablet' },
        { key: 'description', label: 'Description', class: 'hide-tablet' },
    ];

    const totalColumns = headers.length + 2; // +2 for icon columns

    return (
        <div className="product-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-icon"></th> {/* Column for expand arrow */}
                        {headers.map(header => (
                            <th 
                                key={header.key} 
                                className={`${header.class || ''} col-${header.key}`} 
                                onClick={() => onSort(header.key)}
                            >
                                {header.label}
                                {sortConfig.key === header.key && <SortArrow direction={sortConfig.direction} />}
                            </th>
                        ))}
                        <th className="col-icon"></th> {/* Column for more icon */}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <React.Fragment key={product.id}>
                            <tr className="main-row">
                                <td className="col-icon" onClick={() => onToggleExpand(product.id)}>
                                    <ExpandArrowIcon />
                                </td>
                                {headers.map(header => (
                                    <td 
                                        key={header.key} 
                                        className={`${header.class || ''} col-${header.key}`}
                                    >
                                        <Tag value={product[header.key]} />
                                    </td>
                                ))}
                                <td className="col-icon" onClick={() => onToggleExpand(product.id)}>
                                    <MoreIcon />
                                </td>
                            </tr>
                            {expandedRowId === product.id && (
                                <tr className="expanded-row">
                                    <td colSpan={totalColumns}>
                                        <div className="expanded-details">
                                            <h4>Full Details</h4>
                                            <p><strong>Article No:</strong> {product.articleNo}</p>
                                            <p><strong>Product:</strong> {product.productName}</p>
                                            <p><strong>In Price:</strong> {product.inPrice}</p>
                                            <p><strong>Price:</strong> {product.price}</p>
                                            <p><strong>Unit:</strong> {product.unit}</p>
                                            <p><strong>In Stock:</strong> {product.inStock}</p>
                                            <p><strong>Description:</strong> {product.description}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;