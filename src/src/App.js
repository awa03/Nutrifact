import React, { useState } from 'react';
import BarcodeScanner from './components/BarcodeScanner';
import ItemInfo from './components/ItemInfo';
import './components/css/App.css';

function App() {
    const [scannedItem, setScannedItem] = useState(null);

    const handleItemScanned = (item) => {
        setScannedItem(item);
    };

    const handleScanNew = () => {
        setScannedItem(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                Welcome To Nutrifact!
            </header>
            <div className="container">
                {!scannedItem ? (
                    <BarcodeScanner onItemScanned={handleItemScanned} />
                ) : (
                    <div>
                        <ItemInfo item={scannedItem} />
                        <button onClick={handleScanNew}>Scan New Item</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
