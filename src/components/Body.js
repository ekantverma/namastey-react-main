import RestaurantCard from "./RestaurantCard";
import React, { useState, useEffect } from 'react';
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  // Local State Variable
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [searchText, setSearchText] = useState('');

  //Use Effect Hooks
  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    
    // const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();

    console.log(json);
    setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestro(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
  }

  const FilterTopRes = () => {
    setListOfRestaurant(listOfRestaurant.filter((restaurant) => restaurant.info.avgRating > 4));
    console.log(listOfRestaurant);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredRestaurants = listOfRestaurant.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestro(filteredRestaurants);
  };


  
    return listOfRestaurant.length === 0 ? <Shimmer/> : (
      <div className="body">
        <div className="filter">
          <div className="search">
            <input type="text" className="search-box" placeholder="Search by restaurant name" value={searchText} onKeyPress={handleEnterKeyPress} onChange={(e) => {
              setSearchText(e.target.value);
            }} />
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
          <button className="filter-btn" onClick={FilterTopRes}>Top Rated Restaurants</button>
        </div>
        <div className="cards-container">
        <div className='restro-names'><h2>Restaurants with online food delivery in Delhi</h2></div>
        <div className='res-container'>
          {
            filteredRestro.map((restaurant) => (
            <Link to={"/restaurants/"+restaurant.info.id}><RestaurantCard resData={restaurant}/></Link>
            ))};
        </div>
      </div>
      </div>
    );
  };

  export default Body;