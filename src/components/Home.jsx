import React from "react";
import {Link} from "react-router-dom"
import { useState,useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
// import { cities } from "../cites";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight,faHeartCircleBolt,faMobileAlt,  faBuilding, faLocationDot,faHeart,faBed,faKitchenSet,faBathtub,faCouch,faHouse, faCarSide,faTableCellsLarge,faCity,faCar,faMobile, faMobileScreenButton, faWarehouse, faGraduationCap,faAngleDown, faMessage,faBars, faBell, faCirclePlus, faUser, faMagnifyingGlass, faXmark,faHeartCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Popular from "../Popular"
import Footer from "../Footer"
import products from '../mobile';
import cars from '../cars';
import properties from '../properties'

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

const regions = {
    Sindh: ["Karachi", "Hyderabad", "Sukkur"],
    Punjab: ["Lahore", "Faisalabad", "Rawalpindi"],
    Balochistan: ["Quetta", "Gwadar", "Khuzdar"],
    KPK: ["Peshawar", "Mardan", "Abbottabad"],
    Gilgit: ["Gilgit", "Skardu", "Hunza"],
    Islamabad: ["Islamabad City"],
  };
const Home = () => {
    const carouselRef = useRef(null)
  const propertyCarouselRef = useRef(null)
  const carsref = useRef(null)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isLeftDisabledproperty, setIsLeftDisabledproperty] = useState(true);
  const [isLeftDisabledcars, setIsLeftDisabledcars] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isProvinceOpen, setProvinceOpen] = useState(false);
  const [isCityOpen, setCityOpen] = useState(false);


  const [favorites, setFavorites] = useState(new Array(products.length).fill(false));
  const [favoritesproperty, setFavoritesproperty] = useState(new Array(properties.length).fill(false));
  const [favoritescars, setFavoritescars] = useState(new Array(cars.length).fill(false)); 
   const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

 
  const categories = [
    { adds:195,name: "Mobiles", image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8aXBob25lJTIwMTJ8fDB8fHx8MTYzMTUxMTk3MQ&ixlib=rb-1.2.1&q=80&w=1080" },
    { adds:58,name: "Cars", image: "https://cdn.pixabay.com/photo/2014/09/07/22/34/car-race-438467_640.jpg" },
    { adds:200,name: "Properties", image: "https://cdn.pixabay.com/photo/2017/07/08/02/16/house-2483336_640.jpg" },
    { adds:300,name: "Academics", image: "https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-symbolic-representation-of-academic-achievement-3d-render-depicting-a-black-mortarboard-image_13554732.png" }
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
  
  const toggleProvinceDropdown = () => {
    setProvinceOpen(!isProvinceOpen);
    setCityOpen(false); // Close city dropdown
  };

  const toggleCityDropdown = () => {
    if (selectedProvince) {
      setCityOpen(!isCityOpen);
    }
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedCity(""); // Reset city selection
    setProvinceOpen(false); // Close province dropdown
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityOpen(false); // Close city dropdown
  };
  return (
    <div className="h-full  bg-gradient-to-r from-[#020703] via-[#083b16] to-[#010c03]  ">
<div
  className="h-[700px] max-w-full mx-auto relative bg-cover rounded-lg bg-center z-10 flex justify-center items-center"
  style={{ backgroundImage: `url('https://cdn.dribbble.com/users/5324991/screenshots/20449197/dribbble_shot_1_4x.png') `}}
>
  {/* Green Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#020703] via-[#083b16] to-[#010c03]  opacity-95"></div>

  <header className="absolute top-0 left-0 w-full text-white">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-col sm:flex-row">
      {/* Left Section */}
      <div className="text-xl sm:text-3xl font-bold mb-4 sm:mb-0">
        <span className="text-gray-200">Azad</span>{" "}
        <span className="text-white font-extrabold">Deals</span>
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
        <button className="px-6 py-3 h-12 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 font-semibold text-white rounded-3xl shadow-lg transform hover:scale-110 hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 transition-all duration-300 text-sm sm:text-base">
          Get Started
        </button>

        {/* Post Ad Button */}
        <Link to="/addpost">
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-3xl h-12 shadow-lg transform hover:scale-110 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base">
            <FaPlusCircle className="text-sm" />
            <span>Post Ad</span>
          </button>
        </Link>
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
      Post your listing today and turn your assets into cash, or find the
      perfect deal for your next purchase!
    </p>

    {/* Button */}
    <button className="px-4 py-2 font-sansing h-12 w-40 mx-auto bg-gradient-to-r from-green-500 to-green-700 font-semibold text-white rounded-3xl shadow-md transform hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2 mt-4 text-base">
      <FaPlusCircle className="text-lg" />
      <span>Post Ad</span>
    </button>

    <div className="flex items-center justify-center mt-16 relative">
      {/* Location Icon */}
      <FaMapMarkerAlt className="text-red-500 text-2xl mr-2" />

      {/* Main Dropdown and Display */}
      <div className="relative w-64">
        {/* Country Display */}
        {!selectedProvince && !selectedCity && (
          <div
            className="flex items-center justify-between bg-gray-300 rounded-md px-4 py-2 cursor-pointer shadow-md text-gray-800 font-semibold"
            onClick={toggleProvinceDropdown}
          >
            <span>{selectedCountry}</span>
            <FaChevronDown
              className={`text-gray-600 transition-transform ${
                isProvinceOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}

        {/* Province Dropdown */}
        {selectedProvince === "" && isProvinceOpen && (
          <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md z-10 max-h-48 overflow-y-auto ring-1 ring-gray-300">
            <ul className="py-1 text-gray-700 text-sm">
              {Object.keys(regions).map((province, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition-all"
                  onClick={() => handleProvinceSelect(province)}
                >
                  {province}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* City Dropdown */}
        {selectedProvince && !selectedCity && (
          <div className="relative mt-2">
            <div
              className="flex justify-between items-center bg-gray-200 rounded-md px-4 py-2 cursor-pointer shadow-md"
              onClick={toggleCityDropdown}
            >
              <span className="text-gray-800 font-semibold">
                {`Select City in ${selectedProvince}`}
              </span>
              <FaChevronDown
                className={`text-gray-600 transition-transform ${
                  isCityOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isCityOpen && (
              <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md z-10 max-h-48 overflow-y-auto ring-1 ring-gray-300">
                <ul className="py-1 text-gray-700 text-sm">
                  {regions[selectedProvince].map((city, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition-all"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Final Selected Result */}
        {selectedProvince && selectedCity && (
          <div className="flex items-center mt-4 bg-gray-200 rounded-md px-4 py-2 shadow-md">
            <FaMapMarkerAlt className="text-red-500 text-lg mr-2" />
            <span className="text-gray-800 font-semibold">{`${selectedCity}, ${selectedProvince}`}</span>
          </div>
        )}
      </div>
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
    </div>
  </div>
</div>




    <div className="  max-w-7xl mx-auto bg-white ">
    <div className=" bg-white  mx-auto">
  <div className="text-center  py-8">
    <a
      href="#"
      className="text-gray-700 font-sans mx-7 font-semibold hover:underline"
    >
      Products Listed in
    </a>
    <h2 className="text-3xl font-bold font-helveticaLight text-gray-800">
      Popular Categories
    </h2>
  </div>

  <div className="py-8 px-4 sm:px-6 lg:px-20 flex justify-center">
    {/* Category Cards */}
    <Link to="/listing">
      <div className="flex justify-center items-center mt-12">
        {/* Grid for Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group transform transition-all duration-300 hover:scale-105 max-w-xs w-full mx-auto"
            >
              {/* Card Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-cover rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Category Name and Ads */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-2xl">
                <h3 className="text-gray-100 text-lg font-semibold font-raleway mb-1">
                  {category.name}
                </h3>
                <h3 className="text-gray-300 text-sm font-semibold font-roboto">
                  {category.adds} Ads
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  </div>
</div>




<div className="w-full mx-auto p-6 flex flex-wrap justify-center gap-6 font-manrope font-semibold text-gray-800">
  {/* Mobiles Button */}
  <button
    className={`flex items-center px-12 py-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform 
    ${selected === 0 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg'} 
    w-full sm:w-auto sm:max-w-xs`}
    onClick={() => handleClick(0)}
  >
    <FontAwesomeIcon icon={faMobileAlt} className="mr-3 text-xl text-green-500" />
    <span className="text-lg tracking-wide">Mobiles</span>
  </button>

  {/* Cars Button */}
  <button
    className={`flex items-center px-12 py-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform 
    ${selected === 1 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg'} 
    w-full sm:w-auto sm:max-w-xs`}
    onClick={() => handleClick(1)}
  >
    <FontAwesomeIcon icon={faCar} className="mr-3 text-xl text-green-500" />
    <span className="text-lg tracking-wide">Cars</span>
  </button>

  {/* Properties Button */}
  <button
    className={`flex items-center px-12 py-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform 
    ${selected === 2 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg'} 
    w-full sm:w-auto sm:max-w-xs`}
    onClick={() => handleClick(2)}
  >
    <FontAwesomeIcon icon={faBuilding} className="mr-3 text-xl text-green-500" />
    <span className="text-lg tracking-wide">Properties</span>
  </button>

  {/* Academics Button */}
  <button
    className={`flex items-center px-12 py-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform 
    ${selected === 3 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105 shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg'} 
    w-full sm:w-auto sm:max-w-xs`}
    onClick={() => handleClick(3)}
  >
    <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-xl text-green-500" />
    <span className="text-lg tracking-wide">Academics</span>
  </button>
</div>



    <div className="text-center mb-6 mt-6">

        <h2 className="text-[34px] font-bold font-helveticaLight text-gray-800">Featured Ads</h2>
        <a href="#" className="text-green-700 font-sans mx-7 font-semibold hover:underline">Explore Whats New</a>

      </div>
      <div className="w-full mx-auto p-4 xl:px-8 md:translate-y-[-20px] translate-y-[-0px]">
  {/* Header Section */}
  <div className="md:flex justify-between items-center flex-auto mb-6 max-w-7xl mx-auto">
    <h1 className="font-roboto font-bold text-2xl my-2 py-7 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black tracking-wide">
      Mobiles for Sale
    </h1>

    <button className="font-sans font-bold text-base bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md">
      See More
    </button>
  </div>

  <div className="relative max-w-7xl mx-auto">
    {/* Left Scroll Button */}
    {!isLeftDisabled && (
      <button
        className="absolute left-4 top-40 transform -translate-y-1/2 z-10 
                   text-black bg-white rounded-full shadow-lg 
                   w-12 h-12 flex items-center justify-center 
                   hover:bg-gray-200 transition-all duration-300 ease-in-out"
        onClick={() => scroll("left")}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
      </button>
    )}

    {/* Products Section */}
    <div
      ref={carouselRef}
      className="flex overflow-x-hidden snap-x snap-mandatory justify-center"
    >
      {products.map((property, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-3 snap-center"
        >
          <div className="bg-gradient-to-r from-gray-100 to-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative">
            <img
              src={property.image}
              className="object-cover w-full h-80 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              alt="Property"
            />
            <div className="p-6">
              <div className="font-sans font-semibold my-3">
                <h1 className="text-lg text-green-700">{property.name}</h1>
                <h3 className="text-sm text-gray-600">{property.company}</h3>
              </div>
              <div className="location flex items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[14px] text-gray-500"
                />
                <h3 className="ml-2 text-gray-700">{property.location}</h3>
              </div>
              <div className="details font-montserrat text-[14px] text-gray-500 mt-2">
                {property.details}
              </div>

              <div className="h-[1px] w-full bg-gray-200"></div>

              {/* Price and Heart Icon */}
              <div className="flex justify-between items-center mt-6">
                <div className="price-location flex items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <h4 className="font-helveticaLight text-sm text-gray-500">
                      {property.discountPrice}
                    </h4>
                  </div>

                  <h3 className="font-semibold font-helveticaLight text-lg">
                    {property.price}
                  </h3>

                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full group cursor-pointer ml-20 
                                ${
                                  favorites[index]
                                    ? "bg-red-500"
                                    : "bg-gray-300"
                                } transition-all duration-300`}
                  >
                    <FontAwesomeIcon
                      icon={faHeartCirclePlus}
                      className={`text-${
                        favorites[index] ? "white" : "red-500"
                      } text-[18px] group-hover:text-white`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="font-bold text-base bg-green-800 text-white px-6 py-3 rounded-lg font-raleway hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md w-full">
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
      className="absolute right-4 top-40 transform -translate-y-1/2 z-10 
                 text-black bg-white rounded-full shadow-lg 
                 w-12 h-12 flex items-center justify-center 
                 hover:bg-gray-200 transition-all duration-300 ease-in-out"
      onClick={() => scroll("right")}
    >
      <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
    </button>
  </div>
</div>












<div className='w-full mx-auto p-4 xl:px-8 md:translate-y-[-50px] translate-y-[-0px]'>
  <div className='md:flex justify-between items-center flex-auto mb-6 max-w-7xl mx-auto'>
    <h1 className='font-roboto font-bold text-2xl my-2 py-7 text-gray-800'>Properties for Sale</h1>
   
    <button className='font-sans font-bold text-base bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md'>
      See More
    </button>
  </div>

  <div className='relative max-w-7xl mx-auto'>
    {/* Left Scroll Button */}
    {!isLeftDisabledproperty && (
      <button
        className='absolute left-4 top-40 transform -translate-y-1/2 z-10 
                   text-black bg-gradient-to-r from-gray-100 to-gray-100 rounded-full shadow-lg 
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
          <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative'>
            <img
              src={property.image}
              className='object-cover w-full h-80 cursor-pointer transition-transform duration-300 transform hover:scale-105' // Image scaling on hover
              alt='Property'
            />
            {/* "For Rent" or "For Sale" Label */}
            <div className='absolute top-2 left-2 bg-green-600 bg-opacity-80 text-white font-bold text-sm p-1 rounded'>
              {property.forSale ? 'For Sale' : 'For Rent'}
            </div>
            {/* Favorite Icon on top of the image */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full group cursor-pointer transition-colors duration-300 
                          ${favoritesproperty[index] ? 'bg-red-500' : 'bg-slate-200'} absolute top-2 right-2 shadow hover:bg-red-600`}
              onClick={() => toggleFavoriteproperty(index)}
            >
              <FontAwesomeIcon icon={faHeartCirclePlus} className={`text-${favoritesproperty[index] ? 'white' : 'red-500'} text-[17px] group-hover:text-white`} />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-center mb-2'>
           
              
              </div>
              <div className='font-sans font-semibold my-2'>
                <h1 className='text-lg text-green-700'>{property.name}</h1>
              </div>
              <div className='location flex items-center'>
                <FontAwesomeIcon icon={faLocationDot} className='text-[14px] text-gray-500' />
                <h3 className='ml-1 text-gray-700'>{property.location}</h3>
              </div>
              <div className='details font-montserrat text-[14px] text-gray-500'>
                {property.details}
              </div>
              <div className="h-[1px] w-full bg-gray-200 mt-3"></div>
              <div className='price-location flex items-center justify-between w-full mt-6'>
                
                {/* Smaller Price */}
                <div className='flex flex-col items-start '>
                  <h4 className='font-helveticaLight text-sm text-gray-500'>{property.discountPrice}</h4> {/* Smaller price */}
                </div>
              
                {/* Main Price */}
                <h3 className='font-semibold font-helveticaLight text-lg'>{property.price}</h3>
              
                {/* Heart icon next to the price */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full group cursor-pointer ml-20 
                              ${favorites[index] ? 'bg-red-500' : 'bg-gray-300'} transition-all duration-300`}>
                  <FontAwesomeIcon icon={faHeartCirclePlus} className={`text-${favorites[index] ? 'white' : 'red-500'} text-[18px] group-hover:text-white`} />
                </div>
              </div>
              <div className="mt-4">
              <button className='font-bold text-base bg-green-800 text-white px-6 py-3 rounded-lg font-raleway hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md w-full'>
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
                 text-black bg-gradient-to-r from-gray-100 to-gray-100 rounded-full shadow-lg 
                 w-10 h-10 flex items-center justify-center 
                 hover:bg-gray-200 transition duration-300 ease-in-out'
      onClick={() => scrollproperty('right')}>
      <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
    </button>
  </div>
</div>





<div className='w-full mx-auto p-4 xl:px-8 md:translate-y-[-50px] translate-y-[-0px]'>
  <div className='md:flex justify-between items-center flex-auto mb-6 max-w-7xl mx-auto'>
    <h1 className='font-roboto font-bold text-2xl my-2 py-7 text-gray-800'>Cars for Sale</h1>
   
    <button className='font-sans font-bold text-base bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md'>
      See More
    </button>
  </div>

  <div className='relative max-w-7xl mx-auto'>
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
          <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative'>
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
              <FontAwesomeIcon icon={faHeartCirclePlus} className={`text-${favoritescars[index] ? 'white' : 'red-500'} text-[17px] group-hover:text-white`} />
            </div>
            <div className='p-4'>
              <div className='flex justify-between items-center mb-2'>
             
              </div>
              <div className='font-sans font-semibold my-2'>
                <h1 className='text-lg text-green-700'>{property.name}</h1>
              </div>
              <div className='location flex items-center'>
                <FontAwesomeIcon icon={faLocationDot} className='text-[14px] text-gray-500' />
                <h3 className='ml-1 text-gray-700'>{property.location}</h3>
              </div>
              <div className='details font-montserrat text-[14px] text-gray-500'>
                {property.details}
              </div>

              <div className="h-[1px] w-full bg-gray-200 mt-3"></div>

              <div className='price-location flex items-center justify-between w-full mt-6'>
                
                {/* Smaller Price */}
                <div className='flex flex-col items-start '>
                  <h4 className='font-helveticaLight text-sm text-gray-500'>{property.discountPrice}</h4> {/* Smaller price */}
                </div>
              
                {/* Main Price */}
                <h3 className='font-semibold font-helveticaLight text-lg'>{property.price}</h3>
              
                {/* Heart icon next to the price */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full group cursor-pointer ml-20 
                              ${favorites[index] ? 'bg-red-5800' : 'bg-gray-300'} transition-all duration-300`}>
                  <FontAwesomeIcon icon={faHeartCirclePlus} className={`text-${favorites[index] ? 'white' : 'red-500'} text-[18px] group-hover:text-white`} />
                </div>
              </div>
              <div className="mt-4">
              <button className='font-bold text-base bg-green-800 text-white px-6 py-3 rounded-lg font-raleway hover:bg-green-600 transition-all duration-300 ease-in-out shadow-md w-full'>
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

<Popular/>
</div>
<Footer/>
    </div>
  )
}

export default Home
