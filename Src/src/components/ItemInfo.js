import React, { useState } from 'react';
import './css/ItemInfo.css';

function ItemInfo({ item }) {
    // Check if nutriments object exists and has the desired fields
    const calories = item.nutriments?.energy_value;
    const carbs = item.nutriments["carbohydrates_100g"];
    const protein = item.nutriments["proteins_100g"];
    const fat = item.nutriments["fat_100g"];
    const cal_per_100g = item.nutriments["energy-kcal_100g"];

    // Default amount in grams
    const defaultGrams = 100;

    const [grams, setGrams] = useState(defaultGrams);
    const [caloriesPerGram, setCaloriesPerGram] = useState(cal_per_100g);
    const [fatPerGram, setFatsPerGram] = useState((fat / defaultGrams).toFixed(2));
    const [proteinPerGram, setProteinPerGram] = useState((protein / defaultGrams).toFixed(2));
    const [carbsPerGram, setCarbsPerGram] = useState((carbs / defaultGrams).toFixed(2));

    const handleGramsChange = (event) => {
        const selectedGrams = event.target.value;
        setGrams(selectedGrams);
        setFatsPerGram(((fat / defaultGrams) * (selectedGrams)).toFixed(2));
        setProteinPerGram(((protein / defaultGrams) * (selectedGrams)).toFixed(2));
        setCarbsPerGram(((carbs / defaultGrams) * (selectedGrams)).toFixed(2));
        setCaloriesPerGram(((selectedGrams / defaultGrams) * cal_per_100g).toFixed(2));
    };

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
                    <p>{caloriesPerGram} kcal</p>
                    <input
                        type="search"
                        min="0"
                        max="500" // Adjust max value as needed
                        step="1" // Adjust step size as needed
                        value={grams}
                        onChange={handleGramsChange}
                    />
                    <p>{grams} grams</p>
                </div>
            )}
            {(protein !== 0 || carbs !== 0 || fat !== 0) && (
                <div className="info-box protein">
                    <p className="category">Nutritional Info:</p>
                    {protein !== 0 && <p>Protein: {proteinPerGram} g</p>}
                    {carbs !== 0 && <p>Carbohydrates: {carbsPerGram} g</p>}
                    {fat !== 0 && <p>Fat: {fatPerGram} g</p>}
                </div>
            )}
        </div>
    );
}

export default ItemInfo;
