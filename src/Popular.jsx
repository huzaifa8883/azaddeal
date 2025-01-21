import React from 'react';

const PopularLocations = () => {
  const locations = [
    { city: 'Karachi', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Karachi_sky_line.jpg/800px-Karachi_sky_line.jpg' },
    { city: 'Lahore', imageUrl: 'https://akm-img-a-in.tosshub.com/sites/rd/resources/201908/lahore_1566551840_1200x675.png?size=684:384' },
    { city: 'Faisalabad', imageUrl: 'https://www.flydubai.com/en/media/faisalabad_tcm8-6235.jpg' },
    { city: 'Quetta', imageUrl: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/2188/production/_99048580_quetta.gif.webp' },
    { city: 'Peshawar', imageUrl: 'https://t3.ftcdn.net/jpg/00/65/73/78/360_F_65737837_SlDu3wZemsMV1LkBcrEoiFq4hkWMewfx.jpg' },
    { city: 'Multan', imageUrl: 'https://t3.ftcdn.net/jpg/02/81/96/32/360_F_281963253_wFvrOlr5L6rNvTuxnIEsYY67NHO4KDu7.jpg' },
    { city: 'Dubai', imageUrl: 'https://example.com/dubai.jpg' },
    { city: 'Sydney', imageUrl: 'https://example.com/sydney.jpg' },
  ];

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-3xl font-semibold font-roboto text-center mb-10">Popular Locations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {locations.slice(0, 6).map((location, index) => (
          <div key={index} className="relative rounded-2xl overflow-hidden shadow-lg w-[90%] mx-auto"> {/* Increased width to 90% */}
            <img
              src={location.imageUrl}
              alt={location.city}
              className="w-full h-80 object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-left py-2 px-4">
              <span className="text-lg font-semibold">{location.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularLocations;
