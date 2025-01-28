import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaArrowLeft } from 'react-icons/fa';  // Import FontAwesome Chevron Left icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faWarehouse, faHome, faLandmark, faBuilding, faHouse, faShower } from '@fortawesome/free-solid-svg-icons';

// Card Component
const Card = ({ children, className }) => (
  <div className={`shadow-lg p-4 rounded-md ${className}`}>{children}</div>
);

// CardContent Component
const CardContent = ({ children }) => (
  <div className="space-y-6">{children}</div>
);

// Button Component
const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-lg ${className}`} {...props}>
    {children}
  </button>
);

// Select Component
const Select = ({ children }) => (
  <select className="w-full px-4 py-2 border rounded-md">{children}</select>
);

// Input Component
const Input = ({ type, placeholder, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full px-4 py-2 border rounded-md"
    {...props}
  />
);

// Textarea Component
const Textarea = ({ placeholder, ...props }) => (
  <textarea
    placeholder={placeholder}
    className="w-full px-4 py-2 border rounded-md"
    {...props}
  />
);

// PostAdPage Component
const PostAdPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    storage: "",
  });
  const navigate = useNavigate(); // Initialize navigate function

  const goToHomePage = () => {
    navigate("/"); // Navigate to the home page
  };

  const categories = [
    { name: "Mobiles", icon: "📱" },
    { name: "Cars", icon: "🚗" },
    { name: "Properties", icon: "🏠" },
  ];
  const mobileBrands = ["Apple", "Samsung", "Nokia", "OnePlus"];

  const cameraImages = [
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg", // Replace these with actual paths
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg",
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg",
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg",
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg", // Replace these with actual paths
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg",
    "https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg",
    
  ];

  // const handleImageSelect = (image) => {
  //   setImages((prevImages) => [...prevImages, image]);
  // };
  const propertyTypes = {
    Home: ['House', 'Flat', 'Upper Portion', 'Lower Portion', 'Farm House', 'Room', 'Penthouse'],
    Plots: ['Residential Plot', 'Commercial Plot', 'Agricultural Plot',
      'Industrial Land','Plot File','Plot Form'
    ],
    Commercial: ['Office', 'Shop', 'Warehouse','Factory','Building','Other'],
 
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...fileUrls]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };
  const handleImageSelect = (uploadedImage, index) => {
    setSelectedImageIndexes((prev) => ({
      ...prev,
      [index]: uploadedImage,
    }));
  };
  const handleFileUploadd = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setSelectedImages(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  return (
    <>
   
    <div className="mx-10 mt-6 cursor-pointer flex items-center" onClick={goToHomePage}>
    <FaArrowLeft className="text-3xl text-gray-700 hover:text-blue-600 transition duration-300" />
    <img
      src="https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg"
      alt="Logo"
      className="ml-2 h-8" 
    />
  </div>
  
  
  
  
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 rounded-xl shadow-lg font-raleway">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Post Your Ad</h1>
      <p className="text-gray-700 text-lg font-raleway">Choose a category to get started</p>
    </div>
  
    {/* Categories */}
    <div className="py-8 px-4">
  {/* Section Header */}
  <div className="text-center mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Browse Categories</h2>
    <p className="text-gray-500 text-sm">Select a category to explore products</p>
  </div>

  {/* Categories Grid */}
  <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
    {categories.map((category) => (
      <button
        key={category.name}
        onClick={() => setSelectedCategory(category.name)}
        className={`group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300
          ${
            selectedCategory === category.name
              ? 'bg-gradient-to-br from-blue-50 to-blue-100 shadow-blue-500/20'
              : 'bg-white hover:bg-gray-50'
          }
          w-48 h-48 border border-gray-100 shadow-lg hover:shadow-xl
          ${selectedCategory === category.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        `}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 rounded-2xl opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Icon Container */}
        <div className={`
          relative w-16 h-16 flex items-center justify-center rounded-xl mb-4
          ${
            selectedCategory === category.name
              ? 'bg-blue-500 text-white'
              : 'bg-gray-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white'
          }
          transition-all duration-300 transform group-hover:scale-110
        `}>
          <div className="text-3xl">{category.icon}</div>
          
          {/* Animated Rings Effect */}
          <div className={`
            absolute inset-0 rounded-xl border-2
            ${selectedCategory === category.name ? 'border-blue-500' : 'border-transparent'}
            animate-ping opacity-20
          `}></div>
        </div>

        {/* Category Name */}
        <span className={`
          font-medium text-base tracking-wide
          ${
            selectedCategory === category.name
              ? 'text-blue-700'
              : 'text-gray-700 group-hover:text-blue-600'
          }
          transition-colors duration-300
        `}>
          {category.name}
        </span>

        {/* Category Count */}
        <span className={`
          mt-2 text-sm
          ${
            selectedCategory === category.name
              ? 'text-blue-600'
              : 'text-gray-400 group-hover:text-blue-500'
          }
          transition-colors duration-300
        `}>
          {category.count || '150+'} items
        </span>

        {/* Selected Indicator */}
        {selectedCategory === category.name && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    ))}
  </div>
</div>

  
    {/* Form */}
    <Card className="shadow-xl bg-white">
      <CardContent>
        <form className="space-y-8">
          {/* Upload Images */}
    
          {selectedCategory === "Mobiles" && (
  <>
    {/* Title Image */}
    <div className="border p-6 rounded-md bg-white shadow-2xl">
      <label className="block mb-3 font-semibold text-gray-900">Title Image</label>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-700 p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FiUpload size={20} /> Upload Title Image
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image.preview}
                alt={`Uploaded ${index}`}
                className="w-full h-40 object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs shadow-md hover:bg-red-600 transition-all duration-300"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Camera Images */}
    <div className="mt-6 flex gap-4 overflow-x-auto">
      {cameraImages.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer border-2 border-gray-300 rounded-md overflow-hidden shadow-md"
          onClick={() => document.getElementById(`image-input-${index}`).click()}
        >
          <img
            src={image}
            alt={`Camera ${index + 1}`}
            className="md:h-16 md:w-16 h-8 w-8 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id={`image-input-${index}`}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const uploadedImage = URL.createObjectURL(e.target.files[0]);
                handleImageSelect(uploadedImage, index);
              }
            }}
          />
          {selectedImageIndexes[index] && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <img
                src={selectedImageIndexes[index]}
                alt="Selected Overlay"
                className="h-16 w-16 object-cover border-2 border-blue-500 rounded-md"
              />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Upload Video */}
    <div className="mt-6">
      <label className="block mb-3 font-semibold text-gray-900">Upload Video</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="hidden"
        id="video-upload"
      />
      <label
        htmlFor="video-upload"
        className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700 p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <FiUpload size={20} /> Upload Video
      </label>
      {video && (
        <div className="mt-4">
          <video
            src={URL.createObjectURL(video)}
            controls
            className="w-full h-64 rounded-md shadow-lg"
          />
        </div>
      )}
    </div>

    {/* Ad Title */}
    <div className="mt-6">
      <label className="block mb-3 font-semibold text-gray-900">Ad Title*</label>
      <Input
        type="text"
        placeholder="Mention the key features of your item"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Description */}
    <div className="mt-6">
      <label className="block mb-3 font-semibold text-gray-900">Description*</label>
      <Textarea
        placeholder="Describe the item you’re selling. Include condition, features, and reason for selling."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Location */}
    <div className="mt-6">
      <label className="block mb-3 font-semibold text-gray-900">Location*</label>
      <Select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select Location</option>
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
      </Select>
    </div>

    {/* Mobile Brand */}
    <div className="mt-6">
      <label htmlFor="brand" className="block mb-3 font-semibold text-gray-900">Mobile Brand</label>
      <select
        name="brand"
        value={formData.brand}
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 transition duration-300"
      >
        <option value="">Select Mobile Brand</option>
        {mobileBrands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>

    {/* Mobile Model */}
    <div className="mt-6">
      <label htmlFor="model" className="block mb-3 font-semibold text-gray-900">Mobile Model</label>
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleInputChange}
        placeholder="Mobile Model"
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 transition duration-300"
      />
    </div>

    {/* Storage */}
    <div className="mt-6">
      <label htmlFor="storage" className="block mb-3 font-semibold text-gray-900">Storage</label>
      <select
        name="storage"
        value={formData.storage}
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 transition duration-300"
      >
        <option value="" disabled>Select Storage</option>
        <option value="32GB">32GB</option>
        <option value="64GB">64GB</option>
        <option value="128GB">128GB</option>
        <option value="256GB">256GB</option>
        <option value="512GB">512GB</option>
      </select>
    </div>

    {/* Condition */}
    <div className="mt-6">
      <label htmlFor="condition" className="block mb-3 font-semibold text-gray-900">Condition</label>
      <select
        name="condition"
        value={formData.condition}
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 transition duration-300"
      >
        <option value="New">New</option>
        <option value="Old">Used</option>
      </select>
    </div>

    {/* Price */}
    <div className="mt-6">
      <label htmlFor="price" className="block mb-3 font-semibold text-gray-900">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 transition duration-300"
      />
    </div>

    {/* Post Ad Button */}
    <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 p-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
      Post Ad
    </Button>
  </>
)}
          {/* Submit */}
          {selectedCategory === "Cars" && (
<>
<div className="border p-6 rounded-md bg-gray-100">
            <label className="block mb-3 font-semibold text-gray-800">Title Image</label>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUploadd}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg shadow-md transition-all"
                >
                  <FiUpload size={20} /> Title Image
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={image.preview}
                      alt={`Uploaded ${index}`}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs shadow-md hover:bg-red-600"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto">
  {cameraImages.map((image, index) => (
    <div
      key={index}
      className="relative cursor-pointer border-2 border-gray-300 rounded-md overflow-hidden"
      onClick={() => document.getElementById(`image-input-${index}`).click()}
    >
      {/* Camera Image */}
      <img
        src={image}
        alt={`Camera ${index + 1}`}
        className="md:h-16 md:w-16 h-8 w-8 object-cover"
      />

      {/* File Input for Upload */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={`image-input-${index}`}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const uploadedImage = URL.createObjectURL(e.target.files[0]);
            handleImageSelect(uploadedImage, index); // Pass the uploaded image and index
          }
        }}
      />

      {/* Overlay Selected Image */}
      {selectedImageIndexes[index] && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <img
            src={selectedImageIndexes[index]}
            alt="Selected Overlay"
            className="h-16 w-16 object-cover border-2 border-blue-500 rounded-md"
          />
        </div>
      )}
    </div>
  ))}
</div>



          {/* Upload Video */}
          <div >
            <label className="block mb-3 font-semibold text-gray-800">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
              <FiUpload size={20} /> Upload Video
            </label>
            {video && (
              <div className="mt-4">
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="w-full h-64 rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
  
          {/* Ad Title */}
          <div>
            <label className="block mb-3 font-semibold text-gray-800">Ad Title*</label>
            <Input type="text" placeholder="Mention the key features of your item" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
  
          {/* Description */}
          <div>
            <label className="block mb-3 font-semibold text-gray-800">Description*</label>
            <Textarea placeholder="Describe the item you’re selling. Include condition, features, and reason for selling." className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
  
          {/* Location */}
          <div>
            <label className="block mb-3 font-semibold font-helveticaLight text-gray-800">Location*</label>
            <Select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Location</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
            </Select>
          </div>
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


  <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 p-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
  Post Ad
</Button> 
</>
          )}
{
selectedCategory === "Properties" && (
      <>
        <div className="border p-6 rounded-md bg-gray-100">
          <label className="block mb-3 font-semibold text-gray-800">Title Image</label>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUploadd}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg shadow-md transition-all"
              >
                <FiUpload size={20} /> Title Image
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={image.preview}
                    alt={`Uploaded ${index}`}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs shadow-md hover:bg-red-600"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto">
          {cameraImages.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer border-2 border-gray-300 rounded-md overflow-hidden"
              onClick={() => document.getElementById(`image-input-${index}`).click()}
            >
              <img
                src={image}
                alt={`Camera ${index + 1}`}
                className="md:h-16 md:w-16 h-8 w-8 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id={`image-input-${index}`}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const uploadedImage = URL.createObjectURL(e.target.files[0]);
                    handleImageSelect(uploadedImage, index);
                  }
                }}
              />
              {selectedImageIndexes[index] && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <img
                    src={selectedImageIndexes[index]}
                    alt="Selected Overlay"
                    className="h-16 w-16 object-cover border-2 border-blue-500 rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <label className="block mb-3 font-semibold text-gray-800">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FiUpload size={20} /> Upload Video
          </label>
          {video && (
            <div className="mt-4">
              <video
                src={URL.createObjectURL(video)}
                controls
                className="w-full h-64 rounded-md shadow-lg"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block mb-3 font-semibold text-gray-800">Ad Title*</label>
          <Input
            type="text"
            placeholder="Mention the key features of your item"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-3 font-semibold text-gray-800">Description*</label>
          <Textarea
            placeholder="Describe the item you’re selling. Include condition, features, and reason for selling."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-3 font-semibold text-gray-800">Location*</label>
          <Select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Location</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </Select>
        </div>
        <div className="property-form">
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
          <h1 className="section-label">Features and Amenities</h1>
          <div className="button-group">
            <div className="button-section">
              <div className="button-section-title">Bedrooms</div>
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
            <div className="button-section">
              <div className="button-section-title">Bathrooms</div>
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
        <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 p-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          Post Ad
        </Button>
        </>
    )
  // );
};

{/* }; */}




        </form>
      </CardContent>
    </Card>
  </div>
  </>
  );
};

export default PostAdPage;
