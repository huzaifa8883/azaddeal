import React from "react";
import { useState,useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { cities } from "./cites";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight, faLocationDot,faHeart,faBed,faKitchenSet,faBathtub,faCouch,faHouse, faCarSide,faTableCellsLarge,faCity,faCar,faMobile, faMobileScreenButton, faWarehouse, faGraduationCap,faAngleDown, faMessage,faBars, faBell, faCirclePlus, faUser, faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


import products from './mobile';
import cars from './cars';
import properties from './properties'

import {
  FaPlusCircle,
  FaMapMarkerAlt,
  FaChevronDown,
  FaSearchPlus,
  FaCar,
  FaMobileAlt,
  FaBicycle,
  FaTv,
  FaCouch,
} from "react-icons/fa";

const Header = () => {
  const carouselRef = useRef(null)
  const propertyCarouselRef = useRef(null)
  const carsref = useRef(null)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isLeftDisabledproperty, setIsLeftDisabledproperty] = useState(true);
  const [isLeftDisabledcars, setIsLeftDisabledcars] = useState(true);


  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [favorites, setFavorites] = useState(new Array(products.length).fill(false));
  const [favoritesproperty, setFavoritesproperty] = useState(new Array(properties.length).fill(false));
  const [favoritescars, setFavoritescars] = useState(new Array(cars.length).fill(false)); 

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };
  const categories = [
    { name: "Mobiles", image: "https://w0.peakpx.com/wallpaper/110/397/HD-wallpaper-xiaomi-android-mobile-phone-2019.jpg" },
    { name: "Cars", image: "https://cdn.pixabay.com/photo/2014/09/07/22/34/car-race-438467_640.jpg" },
    { name: "Properties", image: "https://cdn.pixabay.com/photo/2017/07/08/02/16/house-2483336_640.jpg" },
    { name: "Academics", image: "https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-symbolic-representation-of-academic-achievement-3d-render-depicting-a-black-mortarboard-image_13554732.png" }
  ];

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' 
      ? -carouselRef.current.clientWidth / 1
      : carouselRef.current.clientWidth / 1; // Adjust scroll amount as needed
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkScrollButtons();
    }
  };
  const scrollproperty = (direction) => {
    if (propertyCarouselRef.current) {
      const scrollAmount = direction === 'left' 
      ? -propertyCarouselRef.current.clientWidth / 1
      : propertyCarouselRef.current.clientWidth / 1; // Adjust scroll amount as needed
      propertyCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkScrollButtonspropery();
    }
  };
  const scrollcars = (direction) => {
    if (carsref.current) {
      const scrollAmount = direction === 'left' 
      ? -carsref.current.clientWidth / 1
      : carsref.current.clientWidth / 1; // Adjust scroll amount as needed
      carsref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkScrollButtonscars();
    }
  };
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const isAtStart = carouselRef.current.scrollLeft === 0; // Check if at start
      const isAtEnd = carouselRef.current.scrollWidth - carouselRef.current.scrollLeft <= carouselRef.current.clientWidth; // Check if at end

      setIsLeftDisabled(isAtStart); // Enable/disable left button
    }
  };

  const checkScrollButtonspropery = () => {
    if (propertyCarouselRef.current) {
      const isAtStart = propertyCarouselRef.current.scrollLeft === 0; // Check if at start
      const isAtEnd = propertyCarouselRef.current.scrollWidth - propertyCarouselRef.current.scrollLeft <= propertyCarouselRef.current.clientWidth; // Check if at end

      setIsLeftDisabledproperty(isAtStart); // Enable/disable left button
    }
  };
  const checkScrollButtonscars = () => {
    if (carsref.current) {
      const isAtStart = carsref.current.scrollLeft === 0; // Check if at start
      const isAtEnd = carsref.current.scrollWidth - carsref.current.scrollLeft <= carsref.current.clientWidth; // Check if at end

      setIsLeftDisabledcars(isAtStart); // Enable/disable left button
    }
  };
  useEffect(() => {
    checkScrollButtons(); // Initial check on mount
    const handleScroll = () => checkScrollButtons(); // Check buttons on scroll
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll); // Attach scroll event listener
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll); // Clean up event listener
      }
    };
  }, [products]);
  useEffect(() => {
    checkScrollButtonspropery(); // Initial check on mount
    const handleScroll = () => checkScrollButtonspropery(); // Check buttons on scroll
    const currentRef = propertyCarouselRef.current; // Use the ref correctly
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll); // Corrected the event name
    }
  
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll); // Clean up event listener
      }
    };
  }, [properties]);
  useEffect(() => {
    checkScrollButtonscars(); // Initial check on mount
    const handleScroll = () => checkScrollButtonscars(); // Check buttons on scroll
    const currentRef = carsref.current; // Use the ref correctly
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll); // Corrected the event name
    }
  
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll); // Clean up event listener
      }
    };
  }, [cars]);
  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index]; // Toggle the favorite state
    setFavorites(newFavorites);
  };
  const toggleFavoriteproperty = (index) => {
    const newFavorites = [...favoritesproperty];
    newFavorites[index] = !newFavorites[index]; // Toggle the favorite state
    setFavoritesproperty(newFavorites);
  };
  const toggleFavoritecars = (index) => {
    const newFavorites = [...favoritescars];
    newFavorites[index] = !newFavorites[index]; // Toggle the favorite state
    setFavoritescars(newFavorites);
  };
  return (
    <>
    <div
      className="h-[700px] w-full relative bg-cover bg-center"
      style={{
        backgroundImage: `url(https://wallpaperaccess.com/full/1899388.jpg)`,
      }}
    >
      {/* Light Green Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>

      <header className="absolute top-0 left-0 w-full text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-col sm:flex-row">
          {/* Left Section */}
          <div className="text-xl sm:text-3xl font-bold mb-4 sm:mb-0">
            <span className="text-gray-200">Offer</span>{" "}
            <span className="text-white font-extrabold">Sale</span>
          </div>

          {/* Center Section */}
          <div className="flex space-x-4 sm:space-x-10 mb-4 sm:mb-0">
            {/* Explore */}
            <div className="flex items-center text-sm sm:text-base font-semibold font-sans">
              <span>Explore</span>
              <MdOutlineExpandMore className="ml-2 text-lg" />
            </div>
            {/* Today's Deals */}
            <div className="flex items-center text-sm sm:text-base font-semibold font-sans">
              <span>Today's Deals</span>
              <MdOutlineExpandMore className="ml-2 text-lg" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex space-x-4">
  {/* Get Started Button */}
  <button className="px-6 font-sansing py-3 h-12 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 font-semibold text-white rounded-3xl shadow-lg transform hover:scale-110 hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 transition-all duration-300 text-sm sm:text-base">
    Get Started
  </button>

  {/* Post Ad Button */}
  <button className="px-6 font-sansing py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-3xl h-12 shadow-lg transform hover:scale-110 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base">
    <FaPlusCircle className="text-sm" />
    <span>Post Ad</span>
  </button>
</div>

        </div>
      </header>

      {/* Large Text Section */}
      <div className="absolute bottom-[70px] w-full text-center text-white px-4 sm:px-0 md:py-0 translate-y-[20px]">
        {/* Main Heading */}
        <h1 className="text-2xl font-montserrat sm:text-5xl font-extrabold">
        Discover <span className="text-green-400">Mobiles</span> Cars{" "}
          <span className="block mt-4 text-xl sm:text-4xl">Properties</span>
        </h1>

        {/* Description */}
        <p className="text-[13px] sm:text-[16px] font-sansing text-gray-200 mt-4 max-w-lg mx-auto">
        Post your listing today and turn your assets into cash, or find the perfect deal for your next purchase!"

</p>

        {/* Button */}
        <button className="px-4 py-2 font-sansing h-12 w-40  mx-auto bg-gradient-to-r from-green-500 to-green-700 font-semibold text-white rounded-3xl shadow-md transform hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2 mt-4 text-base">
          <FaPlusCircle className="text-lg" />
          <span>Post Ad</span>
        </button>

        <div className="flex items-center justify-center space-x-2 mt-16 relative">
      {/* Location Icon */}
      <FaMapMarkerAlt className="text-red-500 text-xl" />

      {/* Location Text */}
      <span
        className="text-gray-300 font-semibold text-sm sm:text-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedCity}
      </span>

      {/* Up Chevron */}
      <FaChevronDown
        className={`text-gray-300 text-lg cursor-pointer transform transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}
        onClick={toggleDropdown}
      />

      {/* Dropdown Menu */}
      {isOpen && (
   <div className="absolute bottom-full  w-48 bg-gray-200 shadow-lg rounded-md mt-2 z-10 max-h-48 overflow-y-auto  ring-2 ring-gray-300">
   <ul className="py-1 text-gray-700 text-sm sm:text-base">
     {cities.map((city, index) => (
       <li
         key={index}
         className="px-4 py-2 font-sansing hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition-all"
         onClick={() => handleCitySelect(city)}
       >
         {city}
       </li>
     ))}
   </ul>
 </div>
    
      
      )}
    </div>
        {/* Search Bar */}
        <div className="flex items-center justify-center space-x-4 mt-6 w-full sm:w-[700px] mx-auto bg-gray-200 rounded-3xl shadow-md">
          <input
            type="text"
            placeholder="Search Products here"
            className="flex-grow px-4 py-3 bg-transparent outline-none text-gray-700 rounded-l-3xl text-sm sm:text-base"
          />
          <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 rounded-full p-3 cursor-pointer">
            <FaSearchPlus className="text-white text-xl" />
          </div>
        </div>

        {/* Category Icons */}
        <div className="flex items-center justify-center space-x-8 sm:space-x-16 mt-8 flex-wrap font-ralewayjjj">
          <div className="flex flex-col items-center">
            <FaCar className="text-white text-2xl sm:text-3xl" />
            <span className="text-sm mt-2">Car</span>
          </div>
          <div className="flex flex-col items-center">
            <FaMobileAlt className="text-white text-2xl sm:text-3xl" />
            <span className="text-sm mt-2">Mobile</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCouch className="text-white text-2xl sm:text-3xl" />
            <span className="text-sm mt-2">Property</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTv className="text-white text-2xl sm:text-3xl" />
            <span className="text-sm mt-2">Academics</span>
          </div>
          {/* <div className="flex flex-col items-center">
            <FaBicycle className="text-white text-2xl sm:text-3xl" />
            <span className="text-sm mt-2">Bikes</span>
          </div> */}
        </div>
      </div>
    </div>
    <div className="py-8 bg-gray-50">
      {/* Section Header */}

      <div className="text-center mb-12">
      <a href="#" className="text-gray-700 font-sans mx-7 font-semibold hover:underline">Products Listed in</a>

        <h2 className="text-3xl font-bold font-helveticaLight text-gray-800">Popular Categories</h2>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {categories.map((category, index) => (
          <div key={index} className="relative group">
            {/* Card Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-all duration-300"
            />
            {/* Card Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
              <h3 className="text-white text-xl font-roboto font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Ads Section */}
     
    </div>
    <div className="text-center mb-6 mt-6">

        <h2 className="text-[34px] font-bold font-roboto text-gray-800">Featured Ads</h2>
        <a href="#" className="text-green-500 font-sans mx-7 font-semibold hover:underline">Explore Whats New</a>

      </div>
    <div className='w-full mx-auto p-4  xl:px-16 md:translate-y-[-20px] translate-y-[-0px]'>
  <div className='md:flex justify-between items-center flex-auto mb-4'>
    <h1 className='font-roboto font-bold text-2xl my-2 py-7 text-gray-800'>Mobiles for Sale</h1>
  
      <button className='font-sans font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md'>
        See More
      </button>
   
  </div>

  <div className='relative'>
    {/* Left Scroll Button */}
    {!isLeftDisabled && (
      <button
        className='absolute left-4 top-40 transform -translate-y-1/2 z-10 
                   text-black bg-white rounded-full shadow-lg 
                   w-10 h-10 flex items-center justify-center 
                   hover:bg-gray-200 transition duration-300 ease-in-out'
        onClick={() => scroll('left')}>
        <FontAwesomeIcon icon={faChevronLeft} className='text-lg' />
      </button>
    )}
   

    <div
      ref={carouselRef}
      className='flex overflow-x-hidden snap-x snap-mandatory'>
      {products.map((property, index) => (
        <div key={index} className='flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-3 snap-center'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative'>
            <img
              src={property.image}
              className='object-cover w-full h-80 cursor-pointer transition-transform duration-300 transform hover:scale-105' // Image scaling on hover
              alt='Property'
            />
            {/* "For Rent" or "For Sale" Label */}
            {/* <div className='absolute top-2 left-2 bg-white bg-opacity-80 text-black font-bold text-sm p-1 rounded'>
              {property.forSale ? 'For Sale' : 'For Rent'}
            </div> */}
            {/* Favorite Icon on top of the image */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full group cursor-pointer transition-colors duration-300 
                          ${favorites[index] ? 'bg-red-500' : 'bg-slate-200'} absolute top-2 right-2 shadow hover:bg-red-600`}
              onClick={() => toggleFavorite(index)}
            >
              <FontAwesomeIcon icon={faHeart} className={`text-${favorites[index] ? 'white' : 'red-500'} text-[17px] group-hover:text-white`} />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-center mb-2'>
                <div className='price-location'>
                  <h3 className='font-bold font-roboto text-2xl text-gray-800'>{property.price}</h3>
                  <h3 className='font-helveticaLight text-base line-through text-gray-500'>{property.originalPrice}</h3>
                </div>
              </div>
              <div className='font-sans font-semibold my-2'>
                <h1 className='text-lg text-gray-800'>{property.name}</h1>
              </div>
              <div className='location flex items-center'>
                <FontAwesomeIcon icon={faLocationDot} className='text-[14px] text-gray-500' />
                <h3 className='ml-1 text-gray-700'>{property.location}</h3>
              </div>
              <div className='details font-montserrat text-[14px] text-gray-500'>
                {property.details}
          
              </div>
              <div className="mt-4">
                  <button className=" font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg font-raleway hover:bg-blue-700 transition duration-300 ease-in-out shadow-md w-32">
                    Contact
                  </button>
                </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Right Scroll Button */}
    <button
      className='absolute right-4 top-40 transform -translate-y-1/2 z-10 
                 text-black bg-white rounded-full shadow-lg 
                 w-10 h-10 flex items-center justify-center 
                 hover:bg-gray-200 transition duration-300 ease-in-out'
      onClick={() => scroll('right')}>
      <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
    </button>
  </div>
</div>








<div className='w-full mx-auto p-4 xl:px-16 md:translate-y-[-50px] translate-y-[-0px]'>
  <div className='md:flex justify-between items-center flex-auto mb-4'>
    <h1 className='font-roboto font-bold text-2xl my-2 py-7 text-gray-800'>Properties for Sale</h1>
   
      <button className='font-sans font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md'>
        See More
      </button>
    
  </div>

  <div className='relative'>
    {/* Left Scroll Button */}
    {!isLeftDisabledproperty && (
      <button
        className='absolute left-4 top-40 transform -translate-y-1/2 z-10 
                   text-black bg-white rounded-full shadow-lg 
                   w-10 h-10 flex items-center justify-center 
                   hover:bg-gray-200 transition duration-300 ease-in-out'
        onClick={() => scrollproperty('left')}>
        <FontAwesomeIcon icon={faChevronLeft} className='text-lg' />
      </button>
    )}

    <div
      ref={propertyCarouselRef}
      className='flex overflow-x-hidden snap-x snap-mandatory'>
      {properties.map((property, index) => (
        <div key={index} className='flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-3 snap-center'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative'>
            <img
              src={property.image}
              className='object-cover w-full h-80 cursor-pointer transition-transform duration-300 transform hover:scale-105' // Image scaling on hover
              alt='Property'
            />
            {/* "For Rent" or "For Sale" Label */}
            <div className='absolute top-2 left-2 bg-white bg-opacity-80 text-black font-bold text-sm p-1 rounded'>
              {property.forSale ? 'For Sale' : 'For Rent'}
            </div>
            {/* Favorite Icon on top of the image */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full group cursor-pointer transition-colors duration-300 
                          ${favoritesproperty[index] ? 'bg-red-500' : 'bg-slate-200'} absolute top-2 right-2 shadow hover:bg-red-600`}
              onClick={() => toggleFavoriteproperty(index)}
            >
              <FontAwesomeIcon icon={faHeart} className={`text-${favoritesproperty[index] ? 'white' : 'red-500'} text-[17px] group-hover:text-white`} />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-center mb-2'>
                <div className='price-location'>
                  <h3 className='font-bold font-roboto text-2xl text-gray-800'>{property.price}</h3>
                  <h3 className='font-helveticaLight text-base line-through text-gray-500'>{property.originalPrice}</h3>
                </div>
              </div>
              <div className='font-sans font-semibold my-2'>
                <h1 className='text-lg text-gray-800'>{property.name}</h1>
              </div>
              <div className='location flex items-center'>
                <FontAwesomeIcon icon={faLocationDot} className='text-[14px] text-gray-500' />
                <h3 className='ml-1 text-gray-700'>{property.location}</h3>
              </div>
              <div className='details font-montserrat text-[14px] text-gray-500'>
                {property.details}
              </div>
              <div className="mt-4">
                  <button className=" font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg font-raleway hover:bg-blue-700 transition duration-300 ease-in-out shadow-md w-32">
                    Contact
                  </button>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Right Scroll Button */}
    <button
      className='absolute right-4 top-40 transform -translate-y-1/2 z-10 
                 text-black bg-white rounded-full shadow-lg 
                 w-10 h-10 flex items-center justify-center 
                 hover:bg-gray-200 transition duration-300 ease-in-out'
      onClick={() => scrollproperty('right')}>
      <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
    </button>
  </div>
</div>





<div className='w-full mx-auto p-4 xl:px-16 md:translate-y-[-50px] translate-y-[-0px]'>
  <div className='md:flex justify-between items-center flex-auto mb-4'>
    <h1 className='font-roboto font-bold text-2xl my-2 py-7 text-gray-800'>Cars for Sale</h1>
   
      <button className='font-sans font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md'>
        See More
      </button>
  </div>

  <div className='relative'>
    {/* Left Scroll Button */}
    {!isLeftDisabledcars && (
      <button
        className='absolute left-4 top-40 transform -translate-y-1/2 z-10 
                   text-black bg-white rounded-full shadow-lg 
                   w-10 h-10 flex items-center justify-center 
                   hover:bg-gray-200 transition duration-300 ease-in-out'
        onClick={() => scrollcars('left')}>
        <FontAwesomeIcon icon={faChevronLeft} className='text-lg' />
      </button>
    )}

    <div
      ref={carsref}
      className='flex overflow-x-hidden snap-x snap-mandatory'>
      {cars.map((property, index) => (
        <div key={index} className='flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-3 snap-center'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative'>
            <img
              src={property.image}
              className='object-cover w-full h-80 cursor-pointer transition-transform duration-300 transform hover:scale-105' // Image scaling on hover
              alt='Property'
            />
            {/* "For Rent" or "For Sale" Label */}
            {/* <div className='absolute top-2 left-2 bg-white bg-opacity-80 text-black font-bold text-sm p-1 rounded'>
              {property.forSale ? 'For Sale' : 'For Rent'}
            </div> */}
            {/* Favorite Icon on top of the image */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full group cursor-pointer transition-colors duration-300 
                          ${favoritescars[index] ? 'bg-red-500' : 'bg-slate-200'} absolute top-2 right-2 shadow hover:bg-red-600`}
              onClick={() => toggleFavoritecars(index)}
            >
              <FontAwesomeIcon icon={faHeart} className={`text-${favoritescars[index] ? 'white' : 'red-500'} text-[17px] group-hover:text-white`} />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-center mb-2'>
                <div className='price-location'>
                  <h3 className='font-bold font-roboto text-2xl text-gray-800'>{property.price}</h3>
                  <h3 className='font-helveticaLight text-base line-through text-gray-500'>{property.originalPrice}</h3>
                </div>
              </div>
              <div className='font-sans font-semibold my-2'>
                <h1 className='text-lg text-gray-800'>{property.name}</h1>
              </div>
              <div className='location flex items-center'>
                <FontAwesomeIcon icon={faLocationDot} className='text-[14px] text-gray-500' />
                <h3 className='ml-1 text-gray-700'>{property.location}</h3>
              </div>
              <div className='details font-montserrat text-[14px] text-gray-500'>
                {property.details}
              </div>
              <div className="mt-4">
                  <button className=" font-bold text-base bg-green-600 text-white px-6 py-2 rounded-lg font-raleway hover:bg-blue-700 transition duration-300 ease-in-out shadow-md w-32">
                    Contact
                  </button>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Right Scroll Button */}
    <button
      className='absolute right-4 top-40 transform -translate-y-1/2 z-10 
                 text-black bg-white rounded-full shadow-lg 
                 w-10 h-10 flex items-center justify-center 
                 hover:bg-gray-200 transition duration-300 ease-in-out'
      onClick={() => scrollcars('right')}>
      <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
    </button>
  </div>
</div>


    </>
  );
};

export default Header;
