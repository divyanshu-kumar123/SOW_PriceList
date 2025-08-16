import React, { useEffect, useRef } from 'react';
import Tag from '../Tag/Tag';
import './ProductTable.css';

// --- Icon component definitions ---
const SortArrow = ({ direction }) => <span className={`sort-arrow ${direction === 'descending' ? 'desc' : ''}`}>▲</span>;
const ExpandArrowIcon = () => <svg className="row-icon" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>;
const MoreIcon = () => <svg className="row-icon" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>;

const EditableInput = ({ value, name, onChange, onBlur, onKeyDown }) => { // 1. Receive onKeyDown prop
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <input
            ref={inputRef}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown} // 2. Add onKeyDown event handler to the input
            className="editable-cell"
        />
    );
};

const ProductTable = ({
    products,
    onSort,
    sortConfig,
    expandedRowId,
    onToggleExpand,
    onInputChange,
    onSaveProduct,
    editingCell,
    onSetEditing
}) => {
    const headers = [
        { key: 'articleNo', label: 'Article No.', class: 'hide-mobile' },
        { key: 'productName', label: 'Product/Service' },
        { key: 'inPrice', label: 'In Price', class: 'hide-tablet' },
        { key: 'price', label: 'Price' },
        { key: 'unit', label: 'Unit', class: 'hide-tablet' },
        { key: 'inStock', label: 'In Stock', class: 'hide-tablet' },
        { key: 'description', label: 'Description', class: 'hide-tablet' },
    ];

    const totalColumns = headers.length + 2;

    return (
        <div className="product-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-icon"></th>
                        {headers.map(header => (
                            <th key={header.key} className={`${header.class || ''} col-${header.key}`} onClick={() => onSort(header.key)}>
                                {header.label}
                                {sortConfig.key === header.key && <SortArrow direction={sortConfig.direction} />}
                            </th>
                        ))}
                        <th className="col-icon"></th>
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
                                    <td key={header.key} className={`${header.class || ''} col-${header.key}`}>
                                        {editingCell && editingCell.productId === product.id && editingCell.fieldName === header.key
                                            ? (
                                                <EditableInput
                                                    name={header.key}
                                                    value={product[header.key]}
                                                    onChange={(e) => onInputChange(e, product.id)}
                                                    onBlur={() => onSaveProduct(product.id)}
                                                    // 3. Define the function to pass to onKeyDown
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            onSaveProduct(product.id);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <Tag
                                                    value={product[header.key]}
                                                    onClick={() => onSetEditing(product.id, header.key)}
                                                />
                                            )
                                        }
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