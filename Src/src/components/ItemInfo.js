import React from 'react';
import './css/ItemInfo.css';

function ItemInfo({ item }) {
    // Check if nutriments object exists and has the desired fields
    const calories = item.nutriments?.energy_value;
    const protein = item.nutriments?.proteins;

    return (
        <div className="item-info">
            <h2>{item.product_name}</h2>
            <div className="info-box">
                <p className="category">Category:</p>
                <p>{item.categories}</p>
            </div>
            <div className="info-box">
                <p className="category">Ingredients:</p>
                <p>{item.ingredients_text}</p>
            </div>
            {calories && (
                <div className="info-box calories">
                    <p className="category">Calories:</p>
                    <p>{calories} kcal</p>
                </div>
            )}
            {protein !== 0 && (
                <div className="info-box protein">
                    <p className="category">Protein:</p>
                    <p>{protein} g</p>
                </div>
            )}
        </div>
    );
}

export default ItemInfo;



