import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 lg:w-9/12 mx-auto">
            <div className="w-full bg-white rounded-xl p-10 border border-gray-300">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Get in Touch</h2>
                
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold">Name</label>
                                <input type="text" className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-500 hover:ring-2 transition" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">Email</label>
                                <input type="email" className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-500 hover:ring-2 transition" placeholder="Your Email" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">Message</label>
                                <textarea className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-500 hover:ring-2 transition" rows="4" placeholder="Your Message"></textarea>
                            </div>
                            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition">Send Message</button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col space-y-6 bg-gray-50 p-6 rounded-xl ">
                        <div className="flex items-center">
                            <Mail className="text-blue-600" />
                            <span className="text-gray-800 font-medium">support@swiftship.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="text-blue-600" />
                            <span className="text-gray-800 font-medium">+1 (800) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <MapPin className="text-blue-600" />
                            <span className="text-gray-800 font-medium">123 SwiftShip Street, Dhaka, Bangladesh</span>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg border-2 border-blue-400">
                            <iframe
                                title="Google Map"
                                className="w-full h-80"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9022183999625!2d90.39945291538583!3d23.75086899465973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAyLjIiTiA5MMKwMjQnMDkuOSJF!5e0!3m2!1sen!2sbd!4v1614415541061!5m2!1sen!2sbd"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
