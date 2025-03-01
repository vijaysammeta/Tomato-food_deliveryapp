import React, { useContext, useState } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../Context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the food list based on category and search query
  const filteredFoodList = food_list.filter((item) => {
    return (
      (category === "All" || category === item.category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name
    );
  });

  return (
    <>
      {/* Search Input */}
      <div className='bg-black w-full p-4 flex justify-center'>
        <input 
          type="text" 
          placeholder="Search food..." 
          className="p-2 w-3/4 md:w-1/2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Food Display Section */}
      <div className='food-display' id="food-display">
        <h2>Top Dishes Near You</h2>
        <div className="food-display-list">
          {filteredFoodList.length > 0 ? (
            filteredFoodList.map((item, index) => (
              <Fooditem 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No food items found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;


