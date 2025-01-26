const Footer = () => {
    return (
      <div className="bg-gray-900">
        <footer className=" lg:w-7/12 mx-auto text-gray-300 py-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
  <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
  <p className="text-sm">
    SwiftShip is your go-to parcel management system, designed to streamline
    the delivery process. From assigning delivery personnel to tracking parcel
    statuses, SwiftShip ensures efficient and reliable logistics management.
  </p>
</div>
  
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-bold">Email:</span> support@SwifShip.com
                </li>
                <li>
                  <span className="font-bold">Phone:</span> +123 456 7890
                </li>
                <li>
                  <span className="font-bold">Address:</span> 123 SwifShip Lane, Tech
                  City
                </li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2025 SwifShip. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  