import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaArrowLeft } from 'react-icons/fa';  // Import FontAwesome Chevron Left icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  
  
  
  
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg font-raleway">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Post Your Ad</h1>
      <p className="text-gray-700 text-lg font-raleway">Choose a category to get started</p>
    </div>
  
    {/* Categories */}
    <div className="flex flex-wrap justify-center gap-6 mb-10">
    {categories.map((category) => (
      <button
        key={category.name}
        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg w-40 transition-all duration-300 transform 
        ${selectedCategory === category.name ? 'border-blue-500 bg-blue-100 scale-105 shadow-xl' : 'border-gray-200 hover:bg-gray-100 hover:scale-105'}`}
        onClick={() => setSelectedCategory(category.name)}
      >
        <div className="text-4xl mb-3 text-blue-600 transition-all duration-300 transform hover:text-blue-700">{category.icon}</div>
        <span className="font-semibold text-gray-800 text-lg transition-all duration-300 transform hover:text-blue-600">{category.name}</span>
      </button>
    ))}
  </div>
  
  
    {/* Form */}
    <Card className="shadow-xl bg-white">
      <CardContent>
        <form className="space-y-8">
          {/* Upload Images */}
    
          {selectedCategory === "Mobiles" && (
              <>
                {/* Mobile Brand */}
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
                <div className="font-raleway">
                <div className="mb-4">
                  <label htmlFor="brand" className="block text-lg font-helveticaLight text-black mb-2">Mobile Brand</label>
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

                {/* Mobile Model */}
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

                {/* Storage */}
                <div className="mb-4 relative">
                  <label htmlFor="storage" className="block text-lg font-roboto mb-2">Storage</label>
                  <select
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
                  >
                    <option value="" disabled>Select Storage</option>
                    <option value="32GB">32GB</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                  </select>
                </div>
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
    <label htmlFor="price" className="block text-lg font-roboto mb-2">Price</label>
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleInputChange}
      className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
    />
  </div>
  </div>

  <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 p-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
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

{selectedCategory === "Properties" && (
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
    <div className="property-form">
      
      {/* Property Type */}
      <div className="mb-4">
        <label htmlFor="property-type" className="block text-lg font-roboto mb-2">Property Type</label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleInputChange}
          className="input-style w-full font-roboto cursor-pointer p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        >
          <option value="" disabled>Select Property Type</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      {/* Area Size */}
      <div className="mb-4">
        <label htmlFor="area-size" className="block text-lg font-roboto mb-2">Area Size (in sq. ft.)</label>
        <input
          type="number"
          id="area-size"
          name="areaSize"
          value={formData.areaSize}
          onChange={handleInputChange}
          placeholder="Enter area size"
          className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        />
      </div>

      {/* Number of Bedrooms */}
      <div className="mb-4">
        <label htmlFor="bedrooms" className="block text-lg font-roboto mb-2">Number of Bedrooms</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleInputChange}
          placeholder="Enter number of bedrooms"
          className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        />
      </div>

      {/* Number of Bathrooms */}
      <div className="mb-4">
        <label htmlFor="bathrooms" className="block text-lg font-roboto mb-2">Number of Bathrooms</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleInputChange}
          placeholder="Enter number of bathrooms"
          className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        />
      </div>

      {/* Property Size in Marla */}
      <div className="mb-4">
        <label htmlFor="marla" className="block text-lg font-roboto mb-2">Property Size (in Marla)</label>
        <input
          type="number"
          id="marla"
          name="marla"
          value={formData.marla}
          onChange={handleInputChange}
          placeholder="Enter size in Marla"
          className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        />
      </div>

      {/* Features */}
      <div className="mb-4">
        <label htmlFor="features" className="block text-lg font-roboto mb-2">Features (comma separated)</label>
        <input
          type="text"
          id="features"
          name="features"
          value={formData.features}
          onChange={handleInputChange}
          placeholder="Enter features like garden, pool, etc."
          className="input-style w-full font-roboto p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-purple-600 transition duration-300 transform focus:scale-105 shadow-md"
        />
      </div>
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
   
      
    </div>
    <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 p-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
  Post Ad
</Button> 
  </>
)}



        </form>
      </CardContent>
    </Card>
  </div>
  </>
  );
};

export default PostAdPage;
