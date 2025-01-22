


import React, { useState, useEffect,useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload, faMobileAlt, faHome, faCar, faGraduationCap,faMapMarkerAlt,faLocationDot,faAngleDown,faEnvelope,faPhone,faBriefcase,faUser,faAd,faUsers,faStar } from '@fortawesome/free-solid-svg-icons';
import cities from '../cites';
import { faHouse, faBuilding, faLandmark, faTags,  faWarehouse,faShower } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from 'axios';
import Footer from "../Footer"
// Leaflet marker icon fix for React Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });


import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useRef } from 'react';

// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
 
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });
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

const uniqueCities = Array.from(new Set(cities));
const PlaceAdd = () => {
  const [category, setCategory] = useState('Mobiles');
  const [filteredCities, setFilteredCities] = useState(uniqueCities);
  const [toggleform, settoggleform] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [showCities, setshowCities] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
const [isAdPosted, setIsAdPosted] = useState(false);
const [currentStep, setCurrentStep] = useState(1);


  
    const [propertyPurpose, setPropertyPurpose] = useState('');
    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09])
    const [media, setMedia] = useState(Array(10).fill(null));
    const [titleImage, setTitleImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const [selectedCity, setSelectedCity] = useState("");


  
 
  const [propertyType, setPropertyType] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setVideoFile(URL.createObjectURL(file)); // Generate preview URL
  }
};
const handlePostAd = () => {
  setIsFormVisible(false);  // Hide the form
  setIsAdPosted(true);      // Show the confirmation message
};

const goToNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
const handleStateChange = (event) => {
  const state = event.target.value;
  setSelectedState(state);
  setSelectedCity(""); // Reset city when state changes
  setCities(statesWithCities[state] || []);
};
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    // Find the selected city's coordinates
    const cityData = statesWithCities[selectedState]?.find((item) => item.city === city);
    if (cityData) {
      setMarkerPosition(cityData.coords); // Update marker position
    }
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    titleImage: null,
    additionalImages: [],
    brand: '',
    model: '',
    storage: '',
    condition: 'New',
    propertyType: '',
    carMake: '',
    carYear: '',
    subject: '',
    propertyPurpose: '',
    propertyType: '',
      areaSize: '',
          areaUnit: 'marla'
  });

  const mobileBrands = ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Nokia', 'Others'];
  const defaultImage = 'https://via.placeholder.com/360x240?text=Default+Image';
  const categories = [
    { name: 'Mobiles', icon: faMobileAlt },
    { name: 'Property', icon: faHome },
    { name: 'Cars', icon: faCar },
    // { name: 'Academics', icon: faGraduationCap },
  ];

  const propertyTypes = {
    Home: ['House', 'Flat', 'Upper Portion', 'Lower Portion', 'Farm House', 'Room', 'Penthouse'],
    Plots: ['Residential Plot', 'Commercial Plot', 'Agricultural Plot',
      'Industrial Land','Plot File','Plot Form'
    ],
    Commercial: ['Office', 'Shop', 'Warehouse','Factory','Building','Other'],
 
  };

  useEffect(() => {
    resetForm();
  }, [category]);

  useEffect(() => {
    console.log("Mounting component, setting filteredCities to uniqueCities");
    setFilteredCities(uniqueCities); // Set default cities
    console.log("Filtered Cities after set: ", uniqueCities);
  }, [uniqueCities]);

  const handleInputClick = () => {
    setshowCities((prev) => !prev);  };

    const handleTitleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        // Update both titleImage and formData with the blob URL
        setTitleImage(objectUrl);
        setFormData({
          ...formData,
          titleImage: objectUrl, // Store blob URL in formData
        });
      }
    };
    
  // Handle search input change
 // Handle search input change
 const handleSearchChange = useCallback((e) => {
  const term = e.target.value;
  setSearchTerm(term);
  
  if (term) {
    const filtered = uniqueCities.filter((city) =>
      city.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCities(filtered);
    setshowCities(true);
  } else {
    setFilteredCities(uniqueCities);
    setshowCities(false);
  }
}, [uniqueCities]);

// City select karne ke baad filteredCities reset kar dete hain
const handleCityClick = (city) => {
  setSearchTerm(city);
  setFilteredCities(uniqueCities); 
  setshowCities(false);
};

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      titleImage: null,
      additionalImages: [],
      brand: '',
      model: '',
      storage: '',
      condition: 'New',
     propertyPurpose: '',
      propertyType: '',

      carMake: '',
      carYear: '',
      subject: '',
        areaSize: '',
          areaUnit: 'marla'
    });
  };

  const handleCategorySelect = (cat) => {
    if (cat !== category) {
      // Optional: Confirm reset if there's existing data
      resetForm();
    }
    setCategory(cat);
  };
  const provider = new OpenStreetMapProvider();

  // Handle input click to fetch live location using Geosearch API
  const handleInputClickss = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update marker position
          setMarkerPosition([latitude, longitude]);

          // OpenStreetMap Reverse Geocoding API URL
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

          // Fetch address from OpenStreetMap
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.address) {
                const {
                  city,
                  state,
                  country,
                  suburb,
                  neighbourhood,
                  road,
                  town,
                  village,
                } = data.address;

                const area =
                  road || suburb || neighbourhood || town || village || "Area not available";
                const address = `${area}, ${city}, ${state}, ${country}`;

                // Update location in formData
                setFormData((prevData) => ({
                  ...prevData,
                  location: `Registered Location: ${address}`,
                }));
              } else {
                alert("Unable to fetch the address.");
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              alert("An error occurred while fetching the address.");
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  const LocationUpdater = () => {
    const map = useMap();
    if (isLocationSet && markerPosition) {
      // Fly to the new location with a smooth zoom effect
      map.flyTo(markerPosition, map.getZoom());
    }
    return null;
  };

 
  
  // JSX for Input Field:

  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleInputChanging = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      location: e.target.value, // Allow manual entry of location
    }));
    setIsLocationSet(false); // Reset flag if the user edits the location manually
  };
  useEffect(() => {
    setFilteredCities(uniqueCities);
  }, [uniqueCities]);
  
  const handleInputClicking = () => {
    setShowCities((prev) => !prev);
  };
  
  const handleSearchChanging = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCities(term ? uniqueCities.filter(city => city.toLowerCase().includes(term.toLowerCase())) : uniqueCities);
    setShowCities(!!term);
  }, [uniqueCities]);
  
  const handleCityClicki = (city) => {
    setSearchTerm(city);
    setShowCities(false);
  }

  const handleMediaChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedMedia = [...media];
      updatedMedia[index] = URL.createObjectURL(file);
      setMedia(updatedMedia);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPreview(true);
  };

  const handlePropertyPurposeChange = (e) => {
    const { value } = e.target;
    setPropertyPurpose(value);
    setPropertyType(''); // Reset property type when purpose changes
  };

 
  const renderCategoryFields = () => {
    switch (category) {
      case 'Mobiles':
        return (
          <>
            <form onSubmit={handleSubmit} className="space-y-8 font-roboto">
  {/* Brand Select */}
  <div className="mb-4">
    <label htmlFor="brand" className="block text-lg font-roboto mb-2">Mobile Brand</label>
    <select
      name="brand"
      value={formData.brand}
      onChange={handleInputChange}
      className="input-style font-roboto cursor-pointer w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="">Select Mobile Brand</option>
      {mobileBrands.map(brand => (
        <option key={brand} value={brand}>{brand}</option>
      ))}
    </select>
  </div>

  {/* Mobile Model Input */}
  <div className="mb-4">
    <label htmlFor="model" className="block text-lg font-roboto mb-2">Mobile Model</label>
    <input
      type="text"
      name="model"
      value={formData.model}
      onChange={handleInputChange}
      placeholder="Mobile Model"
      className="input-style font-roboto cursor-pointer w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Storage Select */}
  <div className="mb-4 relative">
    <label htmlFor="storage" className="block text-lg font-roboto mb-2">Storage</label>
    <select
      name="storage"
      value={formData.storage}
      onChange={handleInputChange} // Handle changes when an option is selected
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Storage</option>
      <option value="32GB">32GB</option>
      <option value="64GB">64GB</option>
      <option value="128GB">128GB</option>
      <option value="256GB">256GB</option>
      <option value="512GB">512GB</option>
      <option value="1TB">1TB</option>
    </select>
  </div>

  {/* Condition Select */}
  <div className="mb-4">
    <label htmlFor="condition" className="block text-lg font-roboto mb-2">Condition</label>
    <select
      name="condition"
      value={formData.condition}
      onChange={handleInputChange}
      className="input-style font-roboto cursor-pointer w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="New">New</option>
      <option value="Old">Used</option>
    </select>
  </div>
  <div className="mb-4">
    <label htmlFor="ram" className="block text-lg font-roboto mb-2">RAM</label>
    <select
      name="ram"
      value={formData.ram}
      onChange={handleInputChange}
      className="input-style font-roboto cursor-pointer w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select RAM</option>
      <option value="2GB">2GB</option>
      <option value="4GB">4GB</option>
      <option value="6GB">6GB</option>
      <option value="8GB">8GB</option>
      <option value="12GB">12GB</option>
      <option value="16GB">16GB</option>
    </select>
  </div>
</form>

          </>
        );
    
      
        case 'Property':

    if (!formData.purpose) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        purpose: 'Sell',
        propertyCategory: 'Home',
        propertyType: propertyTypes['Home'][0], // Default to first type in 'Home' category
      }));
    }


  return (
    <div className="property-form">
    {/* Purpose Selection */}
    <label className="section-label">Purpose:</label>
    <div className="button-group">
      <button
        type="button"
        className={`button-style ${formData.purpose === 'Sell' ? 'selected' : ''} default-sell`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, purpose: 'Sell' }))}
      >
        <FontAwesomeIcon icon={faTags} /> Sell
      </button>
      <button
        type="button"
        className={`button-style ${formData.purpose === 'Rent' ? 'selected' : ''}`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, purpose: 'Rent' }))}
      >
        <FontAwesomeIcon icon={faWarehouse} /> Rent
      </button>
    </div>
  
    {/* Property Category Selection */}
    <label className="section-label">Property Category:</label>
    <div className="button-group">
      <button
        type="button"
        className={`button-style ${formData.propertyCategory === 'Home' ? 'selected' : ''} default-home`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, propertyCategory: 'Home' }))}
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </button>
      <button
        type="button"
        className={`button-style ${formData.propertyCategory === 'Plots' ? 'selected' : ''}`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, propertyCategory: 'Plots' }))}
      >
        <FontAwesomeIcon icon={faLandmark} /> Plots
      </button>
      <button
        type="button"
        className={`button-style ${formData.propertyCategory === 'Commercial' ? 'selected' : ''}`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, propertyCategory: 'Commercial' }))}
      >
        <FontAwesomeIcon icon={faBuilding} /> Commercial
      </button>
    </div>
  
    {/* Property Type Selection */}
    <label className="section-label">Property Type:</label>
    <div className="button-group">
      {(propertyTypes[formData.propertyCategory || 'Home'] || []).map((type) => (
        <button
          key={type}
          type="button"
          className={`button-style ${formData.propertyType === type ? 'selected' : ''}`}
          onClick={() => setFormData((prevFormData) => ({ ...prevFormData, propertyType: type }))}
        >
          <FontAwesomeIcon icon={faHouse} /> {type}
        </button>
      ))}
    </div>
  
    {/* Area Size and Unit Selector */}
    <label className="section-label">Enter Area Size:</label>
    <div className="area-size-group">
      <input
        type="number"
        placeholder="Enter units"
        value={formData.areaSize || ''}
        onChange={(e) => setFormData((prevFormData) => ({
          ...prevFormData,
          areaSize: e.target.value,
        }))}
        className="area-input"
      />
      <select
        value={formData.areaUnit || 'marla'}
        onChange={(e) => setFormData((prevFormData) => ({
          ...prevFormData,
          areaUnit: e.target.value,
        }))}
        className="unit-select"
      >
        <option value="marla">Marla</option>
        <option value="sq.ft">Sq. Ft.</option>
        <option value="sq.m">Sq. M</option>
        <option value="sq.yd">Sq. Yd</option>
        <option value="kanal">Kanal</option>
      </select>
    </div>
  
    {/* Features and Amenities Section */}
    <h1 className="section-label">Features and Amenities</h1>
    <div className="button-group">
  {/* Bedroom Section */}
  <div className="button-section">
    <div className="button-section-title font-helveticaLight font-semibold">Bedrooms</div>
    <div className="button-row">
      {[...Array(10)].map((_, index) => (
        <button
          key={index}
          className={`button-style ${formData.bedrooms === (index + 1) ? 'selected' : ''}`}
          onClick={() => setFormData((prevFormData) => ({ ...prevFormData, bedrooms: index + 1 }))}
        >
          {index === 9 ? '🔟+' : index + 1}
        </button>
      ))}
    </div>
  </div>

  {/* Bathroom Section */}
  <div className="button-section">
    <div className="button-section-title font-helveticaLight font-semibold">Bathrooms</div>
    <div className="button-row">
      {[...Array(7)].map((_, index) => (
        <button
          key={index}
          className={`button-style ${formData.bathrooms === (index + 1) ? 'selected' : ''}`}
          onClick={() => setFormData((prevFormData) => ({ ...prevFormData, bathrooms: index + 1 }))}
        >
          <FontAwesomeIcon icon={faShower} /> {index + 1}
        </button>
      ))}
      <button
        className={`button-style ${formData.bathrooms === '6+' ? 'selected' : ''}`}
        onClick={() => setFormData((prevFormData) => ({ ...prevFormData, bathrooms: '6+' }))}
      >
        <FontAwesomeIcon icon={faShower} /> 6+
      </button>
    </div>
  </div>
</div>

  </div>
  
  
  );


        
  case 'Cars':
    return (
      <>
       <form onSubmit={handleSubmit} className="space-y-8 font-roboto">
  {/* Car Make Select */}
  <div className="mb-4">
    <label htmlFor="carMake" className="block text-lg font-roboto mb-2">Car Make</label>
    <select
      name="carMake"
      value={formData.carMake}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Car Make</option>
      <option value="Toyota">Toyota</option>
      <option value="Honda">Honda</option>
      <option value="Suzuki">Suzuki</option>
      <option value="Nissan">Nissan</option>
      <option value="BMW">BMW</option>
      <option value="Mercedes">Mercedes</option>
      <option value="Audi">Audi</option>
      <option value="Ford">Ford</option>
      <option value="Chevrolet">Chevrolet</option>
      <option value="Hyundai">Hyundai</option>
      <option value="Kia">Kia</option>
      <option value="Volkswagen">Volkswagen</option>
      <option value="Mazda">Mazda</option>
    </select>
  </div>

  {/* Car Model Select */}
  <div className="mb-4">
    <label htmlFor="carModel" className="block text-lg font-roboto mb-2">Car Model</label>
    <select
      name="carModel"
      value={formData.carModel}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Car Model</option>
      {formData.carMake === "Toyota" && (
        <>
          <option value="Corolla">Corolla</option>
          <option value="Yaris">Yaris</option>
          <option value="Fortuner">Fortuner</option>
          <option value="Land Cruiser">Land Cruiser</option>
          <option value="Hilux">Hilux</option>
          <option value="Camry">Camry</option>
        </>
      )}
      {formData.carMake === "Honda" && (
        <>
          <option value="Civic">Civic</option>
          <option value="City">City</option>
          <option value="BR-V">BR-V</option>
          <option value="Jazz">Jazz</option>
          <option value="CR-V">CR-V</option>
        </>
      )}
      {formData.carMake === "Suzuki" && (
        <>
          <option value="Mehran">Mehran</option>
          <option value="Cultus">Cultus</option>
          <option value="Swift">Swift</option>
          <option value="Wagon R">Wagon R</option>
          <option value="Vitara">Vitara</option>
        </>
      )}
      {formData.carMake === "Nissan" && (
        <>
          <option value="Altima">Altima</option>
          <option value="Sunny">Sunny</option>
          <option value="350Z">350Z</option>
          <option value="Micra">Micra</option>
          <option value="X-Trail">X-Trail</option>
        </>
      )}
      {formData.carMake === "BMW" && (
        <>
          <option value="3 Series">3 Series</option>
          <option value="5 Series">5 Series</option>
          <option value="X5">X5</option>
          <option value="M4">M4</option>
        </>
      )}
      {formData.carMake === "Mercedes" && (
        <>
          <option value="C-Class">C-Class</option>
          <option value="E-Class">E-Class</option>
          <option value="S-Class">S-Class</option>
          <option value="GLA">GLA</option>
        </>
      )}
      {formData.carMake === "Audi" && (
        <>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="Q5">Q5</option>
          <option value="A6">A6</option>
        </>
      )}
      {formData.carMake === "Ford" && (
        <>
          <option value="Fiesta">Fiesta</option>
          <option value="Focus">Focus</option>
          <option value="Mustang">Mustang</option>
          <option value="Explorer">Explorer</option>
        </>
      )}
      {formData.carMake === "Chevrolet" && (
        <>
          <option value="Cruze">Cruze</option>
          <option value="Malibu">Malibu</option>
          <option value="Tahoe">Tahoe</option>
          <option value="Camaro">Camaro</option>
        </>
      )}
      {formData.carMake === "Hyundai" && (
        <>
          <option value="Elantra">Elantra</option>
          <option value="Sonata">Sonata</option>
          <option value="Tucson">Tucson</option>
        </>
      )}
      {formData.carMake === "Kia" && (
        <>
          <option value="Seltos">Seltos</option>
          <option value="Sportage">Sportage</option>
          <option value="Forte">Forte</option>
        </>
      )}
      {formData.carMake === "Volkswagen" && (
        <>
          <option value="Golf">Golf</option>
          <option value="Passat">Passat</option>
          <option value="Tiguan">Tiguan</option>
        </>
      )}
      {formData.carMake === "Mazda" && (
        <>
          <option value="Mazda 3">Mazda 3</option>
          <option value="Mazda 6">Mazda 6</option>
          <option value="CX-5">CX-5</option>
        </>
      )}
    </select>
  </div>

  {/* Car Year Select */}
  <div className="mb-4">
    <label htmlFor="carYear" className="block text-lg font-roboto mb-2">Car Year</label>
    <select
      name="carYear"
      value={formData.carYear}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Car Year</option>
      {[...Array(20)].map((_, index) => {
        const year = 2024 - index;
        return (
          <option key={year} value={year}>{year}</option>
        );
      })}
    </select>
  </div>

  {/* Car Color Select */}
  <div className="mb-4">
    <label htmlFor="carColor" className="block text-lg font-roboto mb-2">Car Color</label>
    <select
      name="carColor"
      value={formData.carColor}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Car Color</option>
      <option value="Black">Black</option>
      <option value="White">White</option>
      <option value="Silver">Silver</option>
      <option value="Red">Red</option>
      <option value="Blue">Blue</option>
      <option value="Green">Green</option>
    </select>
  </div>

  {/* Transmission Select */}
  <div className="mb-4">
    <label htmlFor="transmission" className="block text-lg font-roboto mb-2">Transmission</label>
    <select
      name="transmission"
      value={formData.transmission}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Transmission</option>
      <option value="Manual">Manual</option>
      <option value="Automatic">Automatic</option>
      <option value="Semi-Automatic">Semi-Automatic</option>
    </select>
  </div>

  {/* Price Input */}
  <div className="mb-4">
    <label htmlFor="price" className="block text-lg font-roboto mb-2">Price</label>
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Submit Button */}

</form>

          </>
        );
      case 'Academics':
        return (
<form onSubmit={handleSubmit} className="space-y-8 font-roboto">
  {/* Subject Select */}
  <div className="mb-4">
    <label htmlFor="subject" className="block text-lg font-roboto mb-2">Subject</label>
    <select
      name="subject"
      value={formData.subject}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Subject</option>
      {/* Add various common subjects/courses offered in an academy */}
      <option value="Mathematics">Mathematics</option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
      <option value="Biology">Biology</option>
      <option value="Computer Science">Computer Science</option>
      <option value="English">English</option>
      <option value="History">History</option>
      <option value="Geography">Geography</option>
      <option value="Economics">Economics</option>
      <option value="Business Studies">Business Studies</option>
      <option value="Psychology">Psychology</option>
      <option value="Law">Law</option>
      <option value="Arts">Arts</option>
      <option value="Music">Music</option>
      <option value="Physical Education">Physical Education</option>
      <option value="Languages">Languages</option>
      <option value="Photography">Photography</option>
      <option value="Engineering">Engineering</option>
      <option value="Architecture">Architecture</option>
      <option value="Design">Design</option>
      <option value="Social Studies">Social Studies</option>
    </select>
  </div>

  {/* Instructor Name */}
  <div className="mb-4">
    <label htmlFor="instructorName" className="block text-lg font-roboto mb-2">Instructor Name</label>
    <input
      type="text"
      name="instructorName"
      value={formData.instructorName}
      onChange={handleInputChange}
      placeholder="Enter instructor name"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Class Timings */}
  <div className="mb-4">
    <label htmlFor="classTimings" className="block text-lg font-roboto mb-2">Class Timings</label>
    <input
      type="text"
      name="classTimings"
      value={formData.classTimings}
      onChange={handleInputChange}
      placeholder="e.g., Monday and Wednesday, 10:00 AM - 12:00 PM"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Course Level */}
  <div className="mb-4">
    <label htmlFor="courseLevel" className="block text-lg font-roboto mb-2">Course Level</label>
    <select
      name="courseLevel"
      value={formData.courseLevel}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>

  {/* Course Type */}
  <div className="mb-4">
    <label htmlFor="courseType" className="block text-lg font-roboto mb-2">Course Type</label>
    <select
      name="courseType"
      value={formData.courseType}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    >
      <option value="" disabled>Select Course Type</option>
      <option value="Online">Online</option>
      <option value="In-Person">In-Person</option>
      <option value="Hybrid">Hybrid</option>
    </select>
  </div>

  {/* Course Material Upload */}
  {/* <div className="mb-4">
    <label htmlFor="courseMaterial" className="block text-lg font-roboto mb-2">Course Material</label>
    <input
      type="file"
      name="courseMaterial"
      onChange={handleFileChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div> */}

  {/* Max Capacity */}
  <div className="mb-4">
    <label htmlFor="maxCapacity" className="block text-lg font-roboto mb-2">Max Capacity</label>
    <input
      type="number"
      name="maxCapacity"
      value={formData.maxCapacity}
      onChange={handleInputChange}
      placeholder="Enter maximum number of students"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Prerequisites */}
  <div className="mb-4">
    <label htmlFor="prerequisites" className="block text-lg font-roboto mb-2">Prerequisites</label>
    <textarea
      name="prerequisites"
      value={formData.prerequisites}
      onChange={handleInputChange}
      placeholder="Enter prerequisites for the course (if any)"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Discount / Offer */}
  <div className="mb-4">
    <label htmlFor="discount" className="block text-lg font-roboto mb-2">Discount / Offer</label>
    <input
      type="text"
      name="discount"
      value={formData.discount}
      onChange={handleInputChange}
      placeholder="Enter discount or offer details"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Enrollment Deadline */}
  <div className="mb-4">
    <label htmlFor="enrollmentDeadline" className="block text-lg font-roboto mb-2">Enrollment Deadline</label>
    <input
      type="date"
      name="enrollmentDeadline"
      value={formData.enrollmentDeadline}
      onChange={handleInputChange}
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Course Objectives */}
  <div className="mb-4">
    <label htmlFor="courseObjectives" className="block text-lg font-roboto mb-2">Course Objectives</label>
    <textarea
      name="courseObjectives"
      value={formData.courseObjectives}
      onChange={handleInputChange}
      placeholder="List the main objectives of the course"
      className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>

  {/* Submit Button */}
 
</form>


        );
      default:
        return null;
    }
  };

  return (
    <>
<div className="relative w-full h-[600px] font-raleway">
  {/* Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg opacity-80"></div>

  {/* Background Image */}
  <img 
    src="https://i.pinimg.com/originals/72/2e/68/722e68a922506c1d6d1f3b00c3d783d5.jpg"
    className="h-full w-full object-cover opacity-60" 
  />

  {/* Profile and Stats Section */}
  <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-10 mt-[400px] sm:mt-[600px]">
  <div className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 w-full max-w-[1200px] p-6 sm:p-14 rounded-2xl shadow-2xl flex flex-col sm:flex-row justify-between items-center relative overflow-hidden">

    {/* Background Overlay for Texture */}
    <div className="absolute inset-0 bg-white opacity-20 rounded-2xl"></div>

    {/* User Profile Details */}
    <div className="flex flex-col items-center sm:flex-row sm:items-center sm:w-1/2 relative z-10">
      {/* Profile Picture */}
      <img 
        src="https://mironcoder-classicads.netlify.app/assets/ltr/images/avatar/01.jpg" 
        alt="Profile" 
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
      />
      
      {/* User Info */}
      <div className="mt-6 sm:mt-0 sm:ml-8 text-gray-800 space-y-4 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <FontAwesomeIcon icon={faUser} className="text-purple-500" /> Gackon Honson
        </h2>
        <p className="text-lg sm:text-xl text-gray-500 flex items-center gap-3">
          <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" /> New Seller
        </p>
        <p className="text-lg sm:text-xl flex items-center gap-3">
          <FontAwesomeIcon icon={faPhone} className="text-green-500" /> (123) 000-1234
        </p>
        <p className="text-lg sm:text-xl flex items-center gap-3">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-500" /> gackon@gmail.com
        </p>
        <p className="text-lg sm:text-xl flex items-center gap-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-500" /> Los Angeles, West America
        </p>
      </div>
    </div>

    {/* Statistics Section */}
    <div className="flex flex-wrap gap-6 sm:gap-10 justify-center mt-10 sm:mt-0 w-full sm:w-auto relative z-10">
      {/* Listing Ads */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-500 p-6 sm:p-8 rounded-2xl shadow-lg text-center w-40 sm:w-52 h-40 sm:h-52 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <FontAwesomeIcon icon={faAd} /> 2433
        </h3>
        <p className="text-base sm:text-lg text-white mt-2">Listing Ads</p>
      </div>

      {/* Total Followers */}
      <div className="bg-gradient-to-br from-pink-700 to-pink-500 p-6 sm:p-8 rounded-2xl shadow-lg text-center w-40 sm:w-52 h-40 sm:h-52 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <FontAwesomeIcon icon={faUsers} /> 2433
        </h3>
        <p className="text-base sm:text-lg text-white mt-2">Total Followers</p>
      </div>

      {/* Total Reviews */}
      <div className="bg-gradient-to-br from-red-700 to-red-500 p-6 sm:p-8 rounded-2xl shadow-lg text-center w-40 sm:w-52 h-40 sm:h-52 flex flex-col items-center justify-center hover:scale-105 transition-transform">
        <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <FontAwesomeIcon icon={faStar} /> 2433
        </h3>
        <p className="text-base sm:text-lg text-white mt-2">Total Reviews</p>
      </div>
    </div>
  </div>
</div>

</div>






    {/* Left Side: Ad Form */}

   
    <div className="min-h-screen mt-60 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-5 sm:p-10">
    <div className="w-full flex flex-col md:flex-grow  shadow-2xl rounded-3xl overflow-hidden md:px-40 px-4">
    {/* Left Side: Ad Form */}
    {!isPreview ? (
<div className="w-full p-8 sm:p-12 text-gray-800 flex flex-col rounded-3xl shadow-xl border border-gray-200 transition duration-300 transform bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
      <h2 className="text-4xl font-montserrat font-extrabold text-center mb-8 text-indigo-900 tracking-wide uppercase shadow-lg transform hover:scale-105 transition-all">
       Ad Information
      </h2>

      {/* Step 1: Category Selection and Title/Description */}
      {currentStep === 1 && (
        <>
          {/* Category selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleCategorySelect(name)}
                className={`flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform
                  ${category === name
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl scale-105 hover:scale-110"
                    : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl hover:scale-105"}`}
                title={`Select ${name}`}
              >
                <FontAwesomeIcon icon={icon} className="mr-3 text-xl" />
                {name}
              </button>
            ))}
          </div>

          {/* Title and Description Fields */}
          <form onSubmit={handleSubmit} className="space-y-8 font-helveticaLight">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg mb-2 font-semibold text-gray-700">Ad Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ad Title"
                className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-lg hover:shadow-2xl"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg mb-2 font-semibold text-gray-700">Ad Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ad Description"
                rows="4"
                className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-lg hover:shadow-2xl"
              />
            </div>
          </form>
        </>
      )}

      {/* Step 2: Title Image Upload */}
     {currentStep === 2 && (
     
  <div className="mb-6 flex flex-col items-center relative group">
  <h1 className='font-manrope font-bold text-[20px] text-center mb-4'>Title Image</h1>
    {/* Title Image Upload Section */}
   <input
  type="file"
  onChange={handleTitleImageChange}
  className="hidden"
  id="title-image-upload"
  accept="image/*"
/>
<label
  htmlFor="title-image-upload"
  className="cursor-pointer flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
>
  {formData.titleImage ? (
    <img
      src={formData.titleImage}
      alt="Title preview"
      className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
    />
  ) : (
    <>
      <FontAwesomeIcon
        icon={faUpload}
        className="text-white text-4xl mb-2 transition-transform duration-300 group-hover:rotate-180"
      />
      <span className="text-white font-semibold text-sm sm:text-base text-center">
        Upload Image
      </span>
    </>
  )}
</label>


    {/* Additional Images Upload Section */}
    <h1 className="font-manrope font-bold text-[20px] text-center mb-4">Additional Images</h1>
 <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  {media.map((item, index) => (
    <div key={index} className="relative group">
      <input
        type="file"
        onChange={(e) => handleMediaChange(e, index)}
        className="hidden"
        id={`media-upload-${index}`}
        accept="image/*,video/*"
      />
      <label
        htmlFor={`media-upload-${index}`}
        className="flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative overflow-hidden group"
      >
        {item ? (
          item.includes("video") ? (
            <video
              src={item}
              controls
              className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          ) : (
            <img
              src={item}
              alt="Selected media"
              className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          )
        ) : (
          <FontAwesomeIcon icon={faUpload} className="text-white text-2xl sm:text-3xl" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </label>
    </div>
  ))}
</div>



    {/* Video Upload Section */}
   <div className="mb-6 flex flex-col items-center">
  <h1 className="font-manrope font-semibold text-[22px] sm:text-[24px] md:text-[26px] text-center text-gray-900 mb-4">
    Video Upload
  </h1>
  <input
    type="file"
    onChange={handleVideoChange}
    className="hidden"
    id="video-upload"
    accept="video/*"
  />
  <label
    htmlFor="video-upload"
    className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 relative overflow-hidden group"
  >
    {videoFile ? (
      <video
        src={videoFile}
        controls
        className="h-full w-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <>
        <FontAwesomeIcon
          icon={faUpload}
          className="text-white text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-white font-medium text-xs sm:text-sm md:text-base text-center mt-3 group-hover:opacity-90">
          Upload Video
        </span>
      </>
    )}
    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
  </label>
</div>

  </div>
)}


      {/* Step 3: Price and Location */}
      {currentStep === 3 && (
        <>
          {renderCategoryFields()}
 
          <div className="flex flex-col mb-6">
            <label htmlFor="price" className="text-lg font-light mb-2">Price (in Rs)</label>
            <input
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price (in Rs)"
              className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
            />
          </div>

          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-800">Select State and City</label>

            <label htmlFor="state" className="block mt-4 text-gray-600">State</label>
            <select
              id="state"
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
            >
              <option value="">Select a State</option>
              {/* Add your states here */}
            </select>

            <label htmlFor="city" className="block mt-4 text-gray-600">City</label>
            <select
              id="city"
              value={formData.city}
              onChange={handleCityChange}
              className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
              disabled={!formData.state}
            >
              <option value="">Select a City</option>
              {/* Add your city options here */}
            </select>
          </div>
          <div className="mt-6">
    <MapContainer
      center={markerPosition}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={markerPosition}
        icon={new L.Icon({
          iconUrl: "/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    </MapContainer>
  </div>
 {/* </div>   */}









  {/* Location Input */}
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
        </>
      )}

      {/* Step Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            onClick={goToPreviousStep}
            className="px-6 py-3 bg-gray-600 text-white rounded-full transition-all duration-300 hover:bg-gray-700"
          >
            Previous
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={goToNextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-full transition-all duration-300 hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>

  
  
) : (


  <div className="h-[650px] relative mt-4 w-full md:max-w-[500px] bg-gradient-to-r from-gray-600 to-gray-900 p-6 sm:p-8 rounded-2xl shadow-3xl border border-gray-300 transform transition-transform duration-300 ease-out hover:shadow-2xl md:mt-20 hover:border-gray-500 md:mx-4 lg:mx-auto">

  {/* Live Preview Badge with Pulse Effect */}
  <span className="absolute top-2 left-1/2 transform -translate-x-1/2 font-helveticaLight text-white font-bold bg-gradient-to-r from-orange-500 to-purple-700 rounded-full px-4 py-2 shadow-lg z-20 transition-transform duration-200 hover:scale-110 animate-pulse">
    Live Preview
  </span>

  {/* Frosted Glass Effect for Content Wrapper */}
  <div className="border border-transparent rounded-xl p-1 animate-gradient backdrop-blur-lg">
    <div className="border border-gray-300 rounded-xl p-6 bg-white bg-opacity-90 shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">

      {/* Image with Overlay and 3D Hover Effect */}
      <div className="relative mb-6 transform transition-transform duration-300 ease-in-out hover:rotate-2 hover:scale-110">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="bg-gray-900 opacity-50 h-full"></div>
        </div>
        <img
          src={formData.titleImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE789NtlOwrGK3Tuby_0mYilvCEZVUmwjfCg&s"}
          alt="Title Preview"
          className="relative w-full h-48 rounded-xl shadow-xl border border-gray-400 transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
        />
      </div>

      {/* Title */}
      <h4 className="text-3xl font-bold font-roboto mb-2 text-center text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text tracking-wide shadow-md">
        {formData.title || 'Your Title'}
      </h4>

      {/* Description */}
      <p className="text-gray-700 font-helveticaLight text-center mb-4 text-lg italic leading-relaxed">
        {formData.description || 'Your Description'}
      </p>

      {/* Price with Gradient and Shadow */}
      <p className="text-xl font-semibold text-center font-montserrat text-transparent bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text shadow-lg">
        {formData.price ? `Price: Rs. ${formData.price}` : 'Price: Rs. 0'}
      </p>

      {/* Location */}
      <p className="text-lg text-gray-600 text-center font-montserrat flex items-center justify-center space-x-2 mt-4">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-xl text-purple-500" />
        <span className="text-lg font-medium">{formData.location || 'Your Location'}</span>
      </p>

    </div>
  </div>

  {/* Confirm and Post Button */}
  <div className="flex justify-center mt-6">
    <button
      onClick={handlePostAd}
      className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
      Confirm and Post
    </button>
  </div>
  
</div>

  
)}


  </div>


  







</div>

<Footer/>


</>

  

  );
};

export default PlaceAdd;