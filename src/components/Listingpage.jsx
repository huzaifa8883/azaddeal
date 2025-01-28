
import React, { useState, useEffect, useCallback,useRef } from 'react';
import cities from '../cites';

import Userprofile from "./Userprofile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faAngleDown ,faPhone,faComments,faHeart,faTimes,faSearch,faHeartCirclePlus,faFilter} from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer';
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons'
import { FaCar, FaMobileAlt, FaHome,FaSearch, FaCommentDots, FaBell, FaPlus,FaMapMarkerAlt  } from 'react-icons/fa'; // Importing icons
// Unique and popular cities
const uniqueCities = Array.from(new Set(cities));
const popularCities = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan'];
const statesWithCities = {
  Punjab: [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur",
    "Sargodha", "Sheikhupura", "Jhang", "Gujrat", "Kasur", "Rahim Yar Khan", "Sahiwal",
    "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Chiniot", "Kamoke", "Hafizabad",
    "Mandi Bahauddin", "Toba Tek Singh", "Jhelum", "Sadiqabad", "Muzaffargarh", "Vehari",
    "Khushab", "Pakpattan", "Narowal", "Khanewal", "Mianwali", "Bhakkar", "Bahawalnagar"
  ],
  Sindh: [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", "Shaheed Benazirabad",
    "Jacobabad", "Shikarpur", "Dadu", "Thatta", "Badin", "Khairpur", "Umerkot", "Naushero Feroze",
    "Ghotki", "Sanghar", "Mithi", "Kandhkot", "Tando Allahyar", "Tando Muhammad Khan",
    "Moro", "Kotri", "Hala", "Kunri", "Sehwan", "Sakrand"
  ],
  Balochistan: [
    "Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi", "Zhob", "Loralai", "Chaman",
    "Pishin", "Kalat", "Dera Murad Jamali", "Hub", "Musakhel", "Jafarabad", "Nushki",
    "Panjgur", "Surab", "Barkhan", "Dera Allah Yar", "Usta Muhammad", "Lasbela",
    "Kharan", "Washuk", "Awaran", "Kohlu", "Qila Saifullah", "Qila Abdullah", "Mastung"
  ],
  KhyberPakhtunkhwa: [
    "Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat", "Dera Ismail Khan", "Bannu",
    "Charsadda", "Nowshera", "Swabi", "Haripur", "Mansehra", "Karak", "Lakki Marwat",
    "Buner", "Dir", "Shangla", "Tank", "Battagram", "Lower Dir", "Upper Dir", "Hangu",
    "Mingora", "Timergara", "Parachinar", "Mardan", "Malakand"
  ],
  Islamabad: ["Islamabad"],
  GilgitBaltistan: [
    "Gilgit", "Skardu", "Hunza", "Chilas", "Ghanche", "Ghizer", "Astore", "Kharmang",
    "Shigar", "Nagar"
  ],
  AzadKashmir: [
    "Muzaffarabad", "Mirpur", "Rawalakot", "Bagh", "Kotli", "Bhimber", "Pallandri",
    "Hajira", "Dadyal", "Athmuqam", "Barnala"
  ]
};

const initialProducts = [
  // Mobiles
  {
    category: 'Mobiles',
    image: 'https://i.ytimg.com/vi/bE_3r_Eu7SU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCU6jEwJ6TB8hqIZ36Lx3AwNYheMg',
    price: 'Rs 3,00,000',
    originalPrice: 'Rs 3,40,000',
    details: "Experience vibrant visuals on the expansive 6.8-inch Quad HD+",
    name: 'Iphone 14 Pro Max',
    location: 'Faisalabad',
  },
  {
    category: 'Mobiles',
    image: 'https://cdn.mos.cms.futurecdn.net/BHiwWkpNWGCUmuA5g66Dgi.jpg',
    price: 'Rs 2,00,000',
    originalPrice: 'Rs 2,40,000',
    details: "The iPhone 13 Pro Max delivers top-tier performance.",
    name: 'Iphone 13 Pro Max',
    location: 'Lahore',
  },
  {
    category: 'Mobiles',
    image: 'https://cdn.mos.cms.futurecdn.net/oNrqmEW2Y5HN8ixWPxLweP.jpg',
    price: 'Rs 4,00,000',
    originalPrice: 'Rs 3,40,000',
    details: "The Samsung S20 Ultra features an impressive camera system.",
    name: 'Samsung S20 Ultra',
    location: 'Faisalabad',
  },
  {
    category: 'Mobiles',
    image: 'https://www.screenfixed.com.au/wp-content/uploads/2020/10/samsung-galaxy-s20-ultra-vs-iphone-12-pro-max.jpg',
    price: 'Rs 2,00,000',
    originalPrice: 'Rs 2,20,000',
    details: "Samsung S21 Ultra offers a stunning display and great battery life.",
    name: 'Samsung S21 Ultra',
    location: 'Jhang',
  },
  {
    category: 'Mobiles',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7K-HLmf3U9-cr8EOXZ2En0QsOb26nJbAqPg&s',
    price: 'Rs 2,50,000',
    originalPrice: 'Rs 2,80,000',
    details: "The iPhone 14 combines performance with sleek design.",
    name: 'Iphone 14',
    location: 'Karachi',
  },
  {
    category: 'Mobiles',
    image: 'https://cdn.mos.cms.futurecdn.net/W5nsEqQhWmX3MKgUc8Y4Af.jpg',
    price: 'Rs 1,80,000',
    originalPrice: 'Rs 2,00,000',
    details: "OnePlus 9 offers high performance at an affordable price.",
    name: 'OnePlus 9',
    location: 'Islamabad',
  },
  {
    category: 'Mobiles',
    image: 'https://www.androidauthority.com/wp-content/uploads/2021/02/Xiaomi-Mi-11-blue-and-pink-hues.jpg',
    price: 'Rs 1,00,000',
    originalPrice: 'Rs 1,20,000',
    details: "Xiaomi Mi 11 features a stunning display and powerful camera.",
    name: 'Xiaomi Mi 11',
    location: 'Karachi',
  },

  // Cars
  {
    category: 'Cars',
    image: 'https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/loqpsjfvmcu4bbqnh4vl',
    price: 'Rs 3,000,000',
    originalPrice: 'Rs 3,500,000',
    name: 'Luxury Sedan',
    location: 'Karachi',
    details: '4 Doors, 5 Seats, Automatic Transmission',
},
{
  category: 'Cars',
    image: 'https://static.pakwheels.com/2020/07/2f58da326bf5c5b42e33e9b6b531e324.jpg',
    price: 'Rs 4,500,000',
    originalPrice: 'Rs 5,000,000',
    name: 'Sporty Coupe',
    location: 'Lahore',
    details: '2 Doors, 4 Seats, Manual Transmission',
},
{
  category: 'Cars',
    image: 'https://media.ed.edmunds-media.com/audi/q7/2025/oem/2025_audi_q7_4dr-suv_prestige_fq_oem_1_1600.jpg',
    price: 'Rs 2,500,000',
    originalPrice: 'Rs 3,000,000',
    name: 'Compact Hatchback',
    location: 'Islamabad',
    details: '5 Doors, 5 Seats, Automatic Transmission',
},
{
  category: 'Cars',
    image: 'https://global.toyota/pages/news/images/2021/08/02/1330/001.jpg',
    price: 'Rs 7,000,000',
    originalPrice: 'Rs 7,500,000',
    name: 'Luxury SUV',
    location: 'Faisalabad',
    details: '4 Doors, 7 Seats, All Wheel Drive',
},
{
  category: 'Cars',
    image: 'https://www.topgear.com/sites/default/files/news-listicle/image/2023/12/Mustang%20GTD%20on%20Track%204.jpg',
    price: 'Rs 6,000,000',
    originalPrice: 'Rs 6,500,000',
    name: 'Family Minivan',
    location: 'Peshawar',
    details: '4 Doors, 8 Seats, Automatic Transmission',
},
  // Academics
  {
    category: 'Academics',
    image: 'https://nwc.edu/academics/photos/program-photos/computer-science.jpg',
    title: 'Bachelor of Science in Computer Science',
    university: 'University of California',
    duration: '4 Years',
    location: 'Los Angeles, CA',
    price: '$50,000',
    description: 'Advanced computing.'
},
{
  category: 'Academics',
    image: 'https://reti.edu.my/wp-content/uploads/2021/04/17.jpg',
    title: 'Master of Business Administration',
    university: 'Harvard Business School',
    duration: '2 Years',
    location: 'Boston, MA',
    price: '$70,000',
    description: 'Leadership and strategy.'
},
{
  category: 'Academics',
    image: 'https://focusme.com/wp-content/uploads/2020/07/shutterstock_610111481-600-x-400-jpg-1.jpeg',
    title: 'Bachelor  of Arts in Science of Psychology',
    university: 'Stanford University',
    duration: '4 Years',
    location: 'Stanford, CA',
    price: '$45,000',
    description: 'Study human behavior.'
},
{
  category: 'Academics',
    image: 'https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg',
    title: 'Master of Science in Data Science',
    university: 'Columbia University',
    duration: '2 Years',
    location: 'New York, NY',
    price: '$60,000',
    description: 'Data analysis and AI.'
},
{
  category: 'Academics',
    image: 'https://www.nsu.edu/NSU/media/Photos/2017/06/Fine%20Arts/TMC-2479-B15-Fine-Arts-005.jpg',
    title: 'Bachelor of Fine Arts',
    university: 'Rhode Island School of Design',
    duration: '4 Years',
    location: 'Providence, RI',
    price: '$40,000',
    description: 'Creative arts and design.'
},

  // Properties
  {
    category: 'Properties',
    image: 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fcrtzsmmyfhja41ejt4v18vmza4i215&option=N&h=472&permitphotoenlargement=false',
    price: 'Rs 5,000,000',
    originalPrice: 'Rs 5,500,000',
    name: 'Luxury 3-Bedroom Apartment',
    location: 'Karachi',
    details: '3 Bedrooms, 2 Bathrooms, 1 Living Room, 1 Kitchen',
},
{
  category: 'Properties',
    image: 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F977i215%2F0ppj3ftfj8xkmvyyqhfgzqnda4i215&option=N&h=472&permitphotoenlargement=false',
    price: 'Rs 3,500,000',
    originalPrice: 'Rs 4,000,000',
    name: 'Cozy 2-Bedroom House',
    location: 'Lahore',
    details: '2 Bedrooms, 1 Bathroom, 1 Living Room, 1 Kitchen',
},
{
  category: 'Properties',
    image: 'https://img.jamesedition.com/listing_images/2023/11/21/16/27/19/296cf528-d5a8-4c49-87bd-3b3ccf83c501/je/507x312xc.jpg',
    price: 'Rs 8,000,000',
    originalPrice: 'Rs 8,500,000',
    name: 'Spacious Villa with Garden',
    location: 'Islamabad',
    details: '4 Bedrooms, 3 Bathrooms, 2 Living Rooms, 1 Kitchen',
},
{
  category: 'Properties',
    image: 'https://www.sothebysrealty-france.com/datas/biens/images/36471/36471_19-2023-07-25-1751.jpg',
    price: 'Rs 7,000,000',
    originalPrice: 'Rs 7,500,000',
    name: 'Modern Studio Apartment',
    location: 'Faisalabad',
    details: '1 Bedroom, 1 Bathroom, 1 Living Room, 1 Kitchen',
},
{
  category: 'Properties',
    image: 'https://psgroup.in/blog/wp-content/uploads/2020/12/photo-1591247378418-c77f1532d2f8.jpeg',
    price: 'Rs 6,000,000',
    originalPrice: 'Rs 6,500,000',
    name: 'Stylish Townhouse',
    location: 'Peshawar',
    details: '3 Bedrooms, 2 Bathrooms, 1 Living Room, 2 Kitchens',
},
{
  category: 'Properties',
    image: 'https://mljdb885ttsd.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/id:552066c333774db816a1db7a24104c60/https://www.7thheavenproperties.com/homes-for-sale-hambani-estates-kingston-jamaica-9.jpg',
    price: 'Rs 4,500,000',
    originalPrice: 'Rs 5,000,000',
    name: 'Charming Bungalow',
    location: 'Quetta',
    details: '2 Bedrooms, 1 Bathroom, 1 Living Room, 1 Kitchen',
},
];


const Listingpage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400000);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCities, setShowCities] = useState(false);
  const [filteredCities, setFilteredCities] = useState(uniqueCities);
  const [sortOption, setSortOption] = useState('default');
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 visible products
  const [products, setProducts] = useState([])// Track number of visible products
  const [isGridView, setIsGridView] = useState(true);
  const [likedProducts, setLikedProducts] = useState({});

  const [selectedCategory, setSelectedCategory] = useState("mobiles");
  const [featured, setFeatured] = useState(false);  // State for Featured checkbox
  const [urgent, setUrgent] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const observerRef = useRef(null);
  const stateOptions = ['Punjab', 'Sindh', 'Balochistan', 'KPK', 'Gilgit-Baltistan'];

  // Handle state selection

  const handleStateChange = (event) => {
    const selected = event.target.value;
    setSelectedState(selected);
    setCities(statesWithCities[selected] || []);
  };
  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setVisibleCount(6); // Reset visible count on category change
    filterProducts(6); // Filter products for the new category immediately
};

  useEffect(() => {
    filterProducts(initialProducts.length); // Only call filterProducts with initial count when category changes
  }, [selectedCategory]);
  
  
  
  // Function to sort products based on selected option
  const sortedProducts = () => {
    let sortedArray = [...products];
  
    switch (sortOption) {
      case 'newlyListed':
        // Assuming there is a listedDate field in the products, sort by that
        return sortedArray.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
      case 'mostRelevant':
        return sortedArray; // Assuming products are already relevant, sort logic can be added
      case 'lowestPrice':
        return sortedArray.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
      case 'highestPrice':
        return sortedArray.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
      default:
        return sortedArray;
    }
  };
  
  const toggleHeart = (productName) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productName]: !prev[productName],
    }));
  };
  
  useEffect(() => {
    setFilteredCities(uniqueCities);
  }, [uniqueCities]);
  
  const handleInputClick = () => {
    setShowCities((prev) => !prev);
  };
  
  const handleSearchChange = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCities(term ? uniqueCities.filter(city => city.toLowerCase().includes(term.toLowerCase())) : uniqueCities);
    setShowCities(!!term);
  }, [uniqueCities]);
  
  const handleCityClick = (city) => {
    setSearchTerm(city);
    setShowCities(false);
  };
  const handleFeaturedChange = () => setFeatured(!featured); // Toggle Featured checkbox state
  const handleUrgentChange = () => setUrgent(!urgent); 
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(400000);
    setSearchTerm('');
    setSortOption('default');
    setFilteredCities(uniqueCities);
    setShowCities(false);
    setVisibleCount(initialProducts.length); // Reset to show 6 products
  };
  useEffect(() => {
    setVisibleCount(6); // Reset visible count on category change
    filterProducts(6); // Filter products for the new category
  }, [selectedCategory, initialProducts]);

  // Effect to handle loading more products
  const filterProducts = (count) => {
    const filtered = initialProducts.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setProducts(filtered.slice(0, count)); // Set products based on filtered results
};

  
   // Function to load more products
  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 6; // Increment visible count
      const filteredProducts = initialProducts.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      return Math.min(newCount, filteredProducts.length); // Prevent exceeding total number of filtered products
    });
  };

  useEffect(() => {
    setProducts(initialProducts.slice(0, visibleCount)); // Update displayed products
  }, [visibleCount]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200; // Check if near bottom
        if (nearBottom) {
            loadMoreProducts(); // Load more products when near the bottom
        }
    };

    window.addEventListener('scroll', handleScroll); // Attach scroll event listener

    return () => {
        window.removeEventListener('scroll', handleScroll); // Clean up on unmount
    };
}, [selectedCategory]); 

useEffect(() => {
  filterProducts(visibleCount); // Filter products based on the currently visible count
}, [visibleCount, selectedCategory]);


  const handleFilterClick = () => {
    filterProducts(visibleCount); // Call filterProducts with the current count
  };
  
 
  
  
  // Intersection observer for lazy loading more products
  const lastProductElementRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (node) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      });
      observerRef.current.observe(node);
    }
  }, []);
  const categoryFilters = {
    mobiles: [
      { label: "Brand", options: ["Apple", "Samsung", "Xiaomi", "Oppo", "OnePlus"] },
      { label: "Condition", options: ["New", "Used"] },
      { label: "Storage", options: ["64GB", "128GB", "256GB"] },
    ],
    cars: [
      { label: "Manufacturer", options: ["Toyota", "Honda", "BMW", "Mercedes"] },
      { label: "Fuel Type", options: ["Petrol", "Diesel", "Electric"] },
      { label: "Transmission", options: ["Automatic", "Manual"] },
      { label: "Color", options: ["Red", "Black", "White", "Blue"] },
    ],
    properties: [
      { label: "Type", options: ["Apartment", "Villa", "Commercial"] },
      { label: "Bedrooms", options: ["1 BHK", "2 BHK", "3 BHK"] },
      { label: "Furnished", options: ["Fully Furnished", "Semi-Furnished", "Unfurnished"] },
    ],
  };
  
  const renderCategorySpecificFilters = () => {
    const selectClass =
      "p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm hover:bg-gray-200 transition-all duration-200 w-full sm:w-auto";
  
    return (
      <div>
        {selectedCategory === "cars" && (
          <>
            <label className="text-lg font-semibold font-helveticaLight text-gray-800 mb-5 mt-6 block">
              <FaCar className="inline-block mr-2 text-blue-500" />
              Car Specifications
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-roboto ">
              <div className="flex flex-col">
                <label htmlFor="car-manufacture-year" className="text-sm font-sans text-gray-700 mb-1">
                  Manufacture Year
                </label>
                <select id="car-manufacture-year" className={selectClass}>
                  <option value="">Select Manufacture Year</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-engine-type" className="text-sm font-sans text-gray-700 mb-1">
                  Engine Type
                </label>
                <select id="car-engine-type" className={selectClass}>
                  <option value="">Select Engine Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-fuel-type" className="text-sm font-sans text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select id="car-fuel-type" className={selectClass}>
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-drive-type" className="text-sm font-sans text-gray-700 mb-1">
                  Drive Type
                </label>
                <select id="car-drive-type" className={selectClass}>
                  <option value="">Select Drive Type</option>
                  <option value="fwd">FWD</option>
                  <option value="rwd">RWD</option>
                  <option value="awd">AWD</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-transmission" className="text-sm font-sans text-gray-700 mb-1">
                  Transmission
                </label>
                <select id="car-transmission" className={selectClass}>
                  <option value="">Select Transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-color" className="text-sm font-sans text-gray-700 mb-1">
                  Color
                </label>
                <select id="car-color" className={selectClass}>
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="car-seating" className="text-sm font-sans text-gray-700 mb-1">
                  Seating Capacity
                </label>
                <select id="car-seating" className={selectClass}>
                  <option value="">Select Seating Capacity</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
          </>
        )}
  
        {selectedCategory === "mobiles" && (
          <>
            <label className="text-lg font-semibold font-roboto text-gray-800 mb-6 mt-5 block">
              <FaMobileAlt className="inline-block mr-2 text-blue-500" />
              Mobile Specifications
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-roboto">
              <div className="flex flex-col">
                <label htmlFor="mobile-brand" className="text-sm font-sans text-gray-700 mb-1">
                  Brand
                </label>
                <select id="mobile-brand" className={selectClass}>
                  <option value="">Select Brand</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="xiaomi">Xiaomi</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile-ram" className="text-sm font-sans text-gray-700 mb-1">
                  RAM
                </label>
                <select id="mobile-ram" className={selectClass}>
                  <option value="">Select RAM</option>
                  <option value="4gb">4GB</option>
                  <option value="6gb">6GB</option>
                  <option value="8gb">8GB</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile-storage" className="text-sm font-sans text-gray-700 mb-1">
                  Storage
                </label>
                <select id="mobile-storage" className={selectClass}>
                  <option value="">Select Storage</option>
                  <option value="64gb">64GB</option>
                  <option value="128gb">128GB</option>
                  <option value="256gb">256GB</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile-camera" className="text-sm font-sans text-gray-700 mb-1">
                  Camera Quality
                </label>
                <select id="mobile-camera" className={selectClass}>
                  <option value="">Select Camera Quality</option>
                  <option value="12mp">12 MP</option>
                  <option value="48mp">48 MP</option>
                  <option value="108mp">108 MP</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile-battery" className="text-sm font-sans text-gray-700 mb-1">
                  Battery Life
                </label>
                <select id="mobile-battery" className={selectClass}>
                  <option value="">Select Battery Life</option>
                  <option value="3000mah">3000 mAh</option>
                  <option value="4000mah">4000 mAh</option>
                  <option value="5000mah">5000 mAh</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile-color" className="text-sm font-sans text-gray-700 mb-1">
                  Color
                </label>
                <select id="mobile-color" className={selectClass}>
                  <option value="">Select Color</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
            </div>
          </>
        )}
  
        {selectedCategory === "properties" && (
          <>
            <label className="text-lg font-semibold font-roboto text-gray-800 mb-6 mt-5 block">
              <FaHome className="inline-block mr-2 text-blue-500" />
              Property Specifications
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-roboto">
              <div className="flex flex-col">
                <label htmlFor="property-type" className="text-sm font-sans text-gray-700 mb-1">
                  Property Type
                </label>
                <select id="property-type" className={selectClass}>
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="property-size" className="text-sm font-sans text-gray-700 mb-1">
                  Size (sq ft)
                </label>
                <select id="property-size" className={selectClass}>
                  <option value="">Select Size (sq ft)</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="property-bedrooms" className="text-sm font-sans text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select id="property-bedrooms" className={selectClass}>
                  <option value="">Select Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="property-bathrooms" className="text-sm font-sans text-gray-700 mb-1">
                  Bathrooms
                </label>
                <select id="property-bathrooms" className={selectClass}>
                  <option value="">Select Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="property-location" className="text-sm font-sans text-gray-700 mb-1">
                  Location
                </label>
                <select id="property-location" className={selectClass}>
                  <option value="">Select Location</option>
                  <option value="city">City</option>
                  <option value="suburb">Suburb</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  
  
  

  return (
    <>
    {/* <div className="h-64 w-full px-4 py-2 md:h-80 lg:h-72 lg:px-96">
  <img
    className="object-cover h-full rounded w-full"
    src="https://www.lg.com/levant_en/images/plp-b2c/levanten-mobilephones-hero-1-d.jpg"
    alt="Mobile Image"
  />
</div> */}

{/* <div className="relative p-10 sm:p-12 md:p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-2xl transition-all duration-300  hover:shadow-3xl mt-8 sm:mt-12 overflow-hidden">
  <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-indigo-700 to-purple-600 blur-2xl animate-gradient-motion"></div>
  <div className="absolute -top-12 -left-12 w-44 h-44 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 rounded-full opacity-30 blur-2xl "></div>
  <div className="absolute bottom-6 right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-green-300 rounded-full opacity-25 blur-2xl "></div>

  <div className="relative z-10 flex items-center space-x-4 sm:space-x-6">
    <span className="text-white bg-indigo-700 rounded-full p-4 shadow-lg">
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    </span>
    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg ">Mobile Listings in Pakistan</h1>
  </div>

  <p className="relative z-10 mt-5 sm:mt-6 text-sm sm:text-lg text-gray-200 max-w-md sm:max-w-lg leading-relaxed tracking-wide">
    Discover the latest mobiles with tailored search options to find your perfect match!
  </p>

  <button className="relative z-10 mt-8 sm:mt-10 inline-flex items-center bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-indigo-600 transition duration-300">
    <span>Explore Now</span>
    <svg className="ml-2 w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</div> */}
 {/* <div className="bg-gray-50 py-1.5 px-4 text-xs text-gray-600 hidden md:block border-b">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span>{new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false 
          })}</span>
          <span>Welcome, huzaifa8883</span>
        </div>
      </div> */}

      {/* Main Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg sticky top-0 z-50 font-roboto">
  <div className="max-w-7xl mx-auto px-4 h-20">
    <div className="flex items-center justify-between h-full gap-4">
      {/* Logo */}
     

      {/* Location Dropdown */}
      <div className="relative min-w-[180px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaMapMarkerAlt size={16} />
        </div>
        <select className="w-full h-12 pl-9 pr-8 appearance-none bg-slate-700/50 border border-slate-600 
                         rounded-md text-sm text-gray-200 font-medium focus:outline-none 
                         focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer">
          <option value="">Select Province</option>
          <option value="punjab">Punjab</option>
          <option value="sindh">Sindh</option>
          <option value="kpk">Khyber Pakhtunkhwa</option>
          <option value="balochistan">Balochistan</option>
          <option value="gilgit">Gilgit-Baltistan</option>
          <option value="ajk">Azad Kashmir</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex max-w-2xl">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-4 rounded-l-md border border-slate-600 
                     bg-slate-700/50 text-gray-200 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                     focus:border-blue-400 text-sm"
          />
        </div>
        <button className="px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md
                         transition-all duration-200 flex items-center justify-center">
          <FaSearch size={18} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <select className="text-sm text-gray-300 bg-transparent border-none 
                         focus:ring-0 cursor-pointer hidden md:block">
          <option value="en">English</option>
          <option value="ur">اردو</option>
        </select>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 text-gray-300 hover:text-blue-400 transition-colors relative">
            <FaCommentDots size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full 
                           text-white text-xs flex items-center justify-center animate-pulse">3</span>
          </button>

          <button className="p-2.5 text-gray-300 hover:text-blue-400 transition-colors relative">
            <FaBell size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full 
                           text-white text-xs flex items-center justify-center animate-pulse">5</span>
          </button>

          <Userprofile
            userImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PIqzX1p7ueIQSi5p29gEtEf165sYb_DhWw&s"
            userName={`${new Date().toLocaleDateString()} - huzaifa8883`}
          />

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white 
                           rounded-md hover:bg-blue-600 transition-all duration-200 
                           shadow-lg hover:shadow-blue-500/20">
            <FaPlus size={16} />
            <span className="font-medium text-sm">SELL</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
<div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8"> {/* Added container with max-width */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto my-10  overflow-x-hidden">
  {/* Filter Section */}
  <div className="relative font-roboto bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
  {/* Header with Icon */}
  <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
    <div className="p-3 bg-gradient-to-tr from-blue-600 to-blue-800 rounded-xl shadow-blue-500/30 shadow-lg mr-4">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      Filters
      <span className="block text-sm font-normal text-gray-500 mt-1">Customize your search</span>
    </h2>
  </div>

  {/* Filter Groups */}
  <div className="space-y-6">
    {/* Category Selection */}
    <div className="filter-group">
      <label className="inline-block text-sm font-medium text-gray-700 mb-2 bg-gray-50 px-3 py-1 rounded-full">
        Category
      </label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-white cursor-pointer hover:border-blue-400 text-gray-600"
      >
        <option value="mobiles">📱 Mobiles</option>
        <option value="cars">🚗 Cars</option>
        <option value="properties">🏠 Properties</option>
      </select>
    </div>

    {/* Sort Options */}
    <div className="filter-group">
      <label className="inline-block text-sm font-medium text-gray-700 mb-2 bg-gray-50 px-3 py-1 rounded-full">
        Sort By
      </label>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-white cursor-pointer hover:border-blue-400 text-gray-600"
      >
        <option value="default" disabled>Select sorting option</option>
        <option value="asc">💰 Price: Low to High</option>
        <option value="desc">💎 Price: High to Low</option>
        <option value="popular">🔥 Most Popular</option>
      </select>
    </div>

    {/* Location Selection */}
    <div className="filter-group bg-gray-50 p-4 rounded-2xl">
      <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </h3>
      
      {/* State Selector */}
      <div className="mb-3">
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-white cursor-pointer hover:border-blue-400 text-gray-600"
        >
          <option value="">Select State</option>
          {Object.keys(statesWithCities).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* City Selector */}
      <select
        id="city"
        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-white cursor-pointer hover:border-blue-400 text-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>

    {/* Quick Filters */}
    <div className="filter-group">
      <label className="inline-block text-sm font-medium text-gray-700 mb-3 bg-gray-50 px-3 py-1 rounded-full">
        Quick Filters
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200">
          <input
            type="checkbox"
            id="featured"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">✨ Featured</span>
        </label>

        <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200">
          <input
            type="checkbox"
            id="urgent"
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">🔥 Urgent</span>
        </label>
      </div>
    </div>

    {/* Delivery Option */}
    <div className="filter-group bg-gray-50 p-4 rounded-2xl">
      <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Options</label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-green-400 transition-all duration-200">
          <input
            type="radio"
            id="yes"
            name="deliverable"
            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">✅ Available</span>
        </label>

        <label className="flex items-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-red-400 transition-all duration-200">
          <input
            type="radio"
            id="no"
            name="deliverable"
            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">❌ Not Available</span>
        </label>
      </div>
    </div>

    {/* Price Range */}
    <div className="filter-group">
      <label className="inline-block text-sm font-medium text-gray-700 mb-3 bg-gray-50 px-3 py-1 rounded-full">
        Price Range
      </label>
      
      <div className="bg-gray-50 p-4 rounded-2xl">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₨</span>
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Min"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₨</span>
            <input
              type="number"
              min={minPrice}
              max="400000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Max"
            />
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="400000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>₨0</span>
          <span>₨400,000</span>
        </div>
      </div>
    </div>
  </div>

  {/* Apply Filters Button */}
  <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200">
    Apply Filters
  </button>
</div>

  {/* Product Section */}
  <div className="bg-white font-raleway md:col-span-3 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
  {/* Header Section */}
  <div className="flex flex-col space-y-6 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Title with Subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 rounded-lg mr-3">
              <FontAwesomeIcon icon={faSearch} className="text-xl" />
            </span>
            Search Results
            <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {products.length} items found
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Showing results for your search</p>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setIsGridView(true)}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            isGridView 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FontAwesomeIcon icon={faTh} size="lg" />
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            !isGridView 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
    </div>

    {/* Filters and Sort */}
    <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl">
      <div className="flex flex-wrap gap-2">
        {renderCategorySpecificFilters()}
      </div>
      
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer hover:border-blue-500/50 transition-all duration-200"
      >
        <option value="default">Sort By: Default</option>
        <option value="asc">💰 Price: Low to High</option>
        <option value="desc">💎 Price: High to Low</option>
        <option value="featured">⭐ Featured First</option>
      </select>
    </div>
  </div>

  {/* Products Grid */}
  <div className={`grid ${
    isGridView 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
      : 'grid-cols-1 gap-4'
  }`}>
    {products.length > 0 ? (
      products.map((product, index) => {
        const isLastElement = index === products.length - 1;
        return (
          <div
            ref={isLastElement ? lastProductElementRef : null}
            key={product.id || product.title || product.name}
            className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
              isGridView ? 'flex flex-col' : 'flex items-center gap-6'
            }`}
          >
            {/* Product Image */}
            <div className="relative">
              {product.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-lg">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </span>
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title || product.name}
                  className={`object-cover transform group-hover:scale-105 transition-transform duration-700 ${
                    isGridView ? 'h-64 w-full' : 'h-48 w-48 rounded-xl'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Product Content */}
            <div className={`flex-1 p-6 ${isGridView ? '' : 'w-full'}`}>
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {product.category === 'Academics' ? product.title : product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {product.category === 'Academics' && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{product.university}</span> • {product.duration}
                  </p>
                )}

                <p className="text-sm text-gray-500 line-clamp-2">{product.description || product.details}</p>

                {product.location && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-blue-500" />
                    {product.location}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Contact Seller
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faHeartCirclePlus} size="lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center py-12 px-4">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    )}
  </div>
  
  {/* Load More */}
  {products.length > 0 && (
    <div className="mt-8 flex justify-center">
      <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-200">
        Load More Results
      </button>
    </div>
  )}
</div>
    {/* Product Display */}
      


  {/* Load More Button */}
  <div className="flex justify-center mt-8">
    {/* Uncomment to use Load More Button */}
    {/* <button
      onClick={loadMoreProducts}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg"
    >
      Load More
    </button> */}
  </div>
</div>

</div>











{/* </div> */}

      <Footer/>
    </>
  );
};

export default Listingpage;