
import React, { useState, useEffect, useCallback,useRef } from 'react';
import cities from '../cites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faAngleDown ,faPhone,faComments,faHeart,faTimes,faSearch,faHeartCirclePlus,faFilter} from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer';
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons'

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



      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:mx-10 mx-0 my-10 w-full overflow-x-hidden'>
        {/* Filter Section */}
        <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-2xl transition-transform duration-500 hover:shadow-3xl border border-gray-200 border-t-2 border-l-2 md:col-span-1">
  <h2 className="font-sans text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
    Filters
  </h2>
  <div className="mb-6">
    <label className="text-lg font-semibold text-gray-800">Category</label>
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="mt-3 p-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 hover:bg-blue-50/90 hover:border-blue-400 hover:shadow-lg"
    >
      <option value="mobiles">Mobiles</option>
      <option value="cars">Cars</option>
      <option value="properties">Properties</option>
   
    </select>
  </div>

  {/* Sort Options */}
  <div className="mb-6">
    <label className="text-lg font-semibold text-gray-800">Sort By</label>
    <select
      value={sortOption}
      onChange={handleSortChange}
      className="mt-3 p-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 hover:bg-blue-50/90 hover:border-blue-400 hover:shadow-lg"
    >
      <option value="default" disabled>Select</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
      <option value="popular">Most Popular</option>
    </select>
  </div>


  {/* State Selection */}
  <div className="mb-6 ">
      <h2 className="text-xl font-semibold text-gray-700">Select State and City</h2>
      
      {/* State Selector */}
      <label htmlFor="state" className="block mt-4 text-gray-600">State</label>
      <select
        id="state"
        value={selectedState}
        onChange={handleStateChange}
        className="mt-3 p-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 hover:bg-blue-50/90 hover:border-blue-400 hover:shadow-lg"
      >
        <option value="">Select a State</option>
        {Object.keys(statesWithCities).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* City Selector */}
      <label htmlFor="city" className="block mt-4 text-gray-600">City</label>
      <select
        id="city"
        className="mt-3 p-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 hover:bg-blue-50/90 hover:border-blue-400 hover:shadow-lg"
        disabled={!selectedState}
      >
        <option value="">Select a City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  <div className="mt-4 flex items-center space-x-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            // checked={isFeatured}
            // onChange={() => setIsFeatured(!isFeatured)}
            id="featured"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-lg font-bold text-gray-700">
            Featured
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            // checked={isUrgent}
            // onChange={() => setIsUrgent(!isUrgent)}
            id="urgent"
            className="h-4 w-4 text-red-600 focus:ring-red-500"
          />
          <label htmlFor="urgent" className="ml-2 text-lg font-bold text-gray-700">
            Urgent
          </label>
        </div>
        </div>
        <div className="mt-4">
        <label className="text-lg font-semibold text-gray-800">Is Deliverable</label>
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="deliverable"
              // checked={isDeliverable === "yes"}
              // onChange={() => setIsDeliverable("yes")}
              className="h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="yes" className="ml-2 text-sm text-gray-700">
              Yes
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="deliverable"
              // checked={isDeliverable === "no"}
              // onChange={() => setIsDeliverable("no")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="no" className="ml-2 text-sm text-gray-700">
              No
            </label>
          </div>
        </div>
        </div>
  {/* Price Range */}
  <div className='mt-4'>
      <label className="text-lg font-semibold  text-gray-800">Price Range</label>
      <div className="flex items-center justify-between mt-4">
        {/* Min Price Input */}
        <input
          type="number"
          min="0"
          max={maxPrice}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-l-md"
        />

        <span className="mx-2 text-lg font-semibold text-gray-800">-</span>

        {/* Max Price Input */}
        <input
          type="number"
          min={minPrice}
          max="400000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-r-md"
        />
      </div>

      {/* Price Range Labels */}
      <div className="flex justify-between font-semibold text-sm text-gray-500 mt-2">
        <span>From ₨{minPrice}</span>
        <span>To ₨{maxPrice}</span>
      </div>

      {/* Range Slider */}
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max="400000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            backgroundSize: `${(maxPrice / 400000) * 100}% 100%`,
            transition: "background-size 0.5s ease-in-out",
          }}
        />
        <span className="ml-4 text-lg font-semibold text-blue-600">₨{maxPrice}</span>
      </div>

      {/* Range Labels */}
      <div className="flex justify-between font-semibold text-sm text-gray-500 mt-2">
        <span>From pkr 0</span>
        <span>Max pkr 400,000</span>
      </div>
    </div>
    </div>

   
<div className="bg-white rounded-lg p-8 shadow-xl transition-transform duration-300 hover:shadow-2xl md:col-span-3">
<div className="flex items-center space-x-4">
      {/* Grid View Button - Hidden on Mobile */}
  

      <button
        onClick={() => setIsGridView(true)}
        className={`hidden md:block p-3 rounded-full transition-all duration-200 ${isGridView ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        <FontAwesomeIcon icon={faTh} size="lg" />
      </button>
      {/* List View Button - Hidden on Mobile */}
      <button
        onClick={() => setIsGridView(false)}
        className={`hidden md:block p-3 rounded-full transition-all duration-200 ${!isGridView ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
   
      <h2 className="text-4xl font-bold font-roboto text-gray-800 hover:text-green-600 transition duration-300 ml-4">Searched Products</h2>
    </div>


  {/* Sort By dropdown */}
  <div className="relative mb-6 mt-6">
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="p-3 border rounded-md font-roboto shadow-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
    >
      <option value="newlyListed">Sort By: Newly Listed</option>
      <option value="mostRelevant">Most Relevant</option>
      <option value="lowestPrice">Lowest Price</option>
      <option value="highestPrice">Highest Price</option>
    </select>
  </div>

  {/* Product Display */}
  <div className={`grid ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'grid-cols-1'}`}>
  {products.map((product, index) => {
    const isLastElement = index === products.length - 1;
    return (
      <div
        ref={isLastElement ? lastProductElementRef : null}
        key={product.title || product.name}
        className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl border border-gray-100 ${isGridView ? 'flex flex-col' : 'flex items-center'} `}
      >
        {/* Product Image */}
        <div className="relative">
          {/* Featured Button */}
          <div className="absolute top-4 h-8 left-4 bg-green-800 text-gray-200 font-roboto text-sm font-semibold px-4 py-1 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center">
  Featured
</div>

<div className="relative">
  <img
    src={product.image}
    alt={product.title || product.name}
    className={`object-cover ${isGridView ? 'h-80 w-full' : 'h-72 w-72'} transition-transform duration-300`}
  />
  <div className="absolute inset-0 bg-black bg-opacity-15"></div> {/* Dark overlay */}
</div>

        </div>

        {/* Product Content */}
        <div className={`${isGridView ? 'p-6' : 'p-4 text-center'} space-y-5`}>
          <h3 className="font-bold text-xl text-gray-800 hover:text-green-600 font-raleway transition duration-300">
            {product.category === 'Academics' ? product.title : product.name}
          </h3>
          <p className="text-black font-semibold font-roboto">
            {product.price}{' '}
            <span className="line-through text-gray-400 font-sansing">{product.originalPrice}</span>
          </p>
          {product.category === 'Academics' && (
            <p className="text-gray-500">{product.university} - {product.duration}</p>
          )}
          <p className="text-gray-500 font-roboto">{product.description || product.details}</p>
          {product.location && (
            <p className="text-gray-500 flex items-center font-raleway justify-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-green-500" />
              {product.location}
            </p>
          )}

          {/* Heart Icon */}
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faHeartCirclePlus}
              className="text-green-500 text-2xl hover:text-green-600 transition duration-300 cursor-pointer"
            />
          </div>

          {/* Contact Button */}
          <div className="flex justify-center">
  <button className="bg-gradient-to-r from-green-700 to-green-800 w-64 font-roboto text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-800 transition duration-300 flex items-center justify-center">
    <FontAwesomeIcon icon={faPhone} className="mr-2" />
    Contact
  </button>
</div>

        </div>
      </div>
    );
  })}
</div>



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
      <Footer/>
    </>
  );
};

export default Listingpage;