import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import {  faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";



function Footer() {
  return (
    <footer className="bg-gray-900 w-full mx-auto text-white py-12 overflow-x-hidden">
      <div className="container max-w-7xl mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start w-full sm:w-1/4">
            <h2 className="text-3xl font-bold mb-3">Azad Deals</h2>
            <p className="text-gray-400 text-sm">
              Your trusted platform for amazing deals on mobiles, cars, properties, and academics. Discover and enjoy exclusive offers every day.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="mr-2">📱</span> Mobiles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="mr-2">🏠</span> Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="mr-2">📚</span> Academics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <span className="mr-2">🚗</span> Cars
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                contact@azaddeals.com
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                +123 456 7890
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                +123 456 7890 (WhatsApp)
              </li>
            </ul>
          </div>

          {/* App Download */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
            <a
              href="#"
              className="flex items-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faGooglePlay} className="text-2xl mr-3" />
              <div>
                <p className="text-sm">Get it on</p>
                <p className="text-lg font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faYoutube} className="text-xl" />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Support
            </a>
          </div>
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Azad Deals. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
