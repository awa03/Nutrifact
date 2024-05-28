import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import axios from 'axios';

function BarcodeScanner({ onItemScanned }) {
    const [scannerActive, setScannerActive] = useState(true);

    useEffect(() => {
        if (scannerActive) {
            Quagga.init({
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: document.querySelector('#barcode-scanner'),
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: 'environment', // Use "user" for front camera
                    },
                },
                decoder: {
                    readers: ['ean_reader'], // Barcode type to scan (EAN-13)
                },
            }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
            });

            Quagga.onDetected((data) => {
                setScannerActive(false); // Turn off scanner
                fetchItemData(data.codeResult.code);
            });

            return () => {
                Quagga.stop();
            };
        }
        // eslint-disable-next-line
    }, [scannerActive]);

    const fetchItemData = async (barcode) => {
        try {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            if (response.data.status === 1) {
                onItemScanned(response.data.product);
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    return (
        <div>
            <div id="barcode-scanner"></div>
        </div>
    );
}

export default BarcodeScanner;

