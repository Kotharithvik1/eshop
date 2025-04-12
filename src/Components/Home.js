import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { FaShoppingCart, FaUser, FaSearch, FaFilter } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

// Ensure proper export by making it a named export
export const productsData = [
  { id: 1, name: "Premium Wireless Headphones", price: 2099, category: "Electronics", description: "High-quality wireless headphones with noise cancellation", imageurl: "https://i.ibb.co/ZV95Zrb/image.png", expiryDate: new Date(2028, 5, 15), availability: true },
  { id: 3, name: "Smart Fitness Tracker", price: 3500, category: "Wearables", description: "Advanced fitness tracking with heart rate monitoring", imageurl: "https://i.ibb.co/pjdn1Kd/image.png", expiryDate: new Date(2029, 7, 20), availability: true },
  { id: 4, name: "Gaming Mouse", price: 799, category: "Electronics", description: "Ergonomic gaming mouse with customizable buttons", imageurl: "https://i.ibb.co/rmTMfv1/image.png", expiryDate: new Date(2028, 2, 10), availability: false },
  { id: 5, name: "Leather Wallet", price: 500, category: "Accessories", description: "Classic leather wallet with multiple compartments", imageurl: "https://i.ibb.co/sC5v028/image.png", expiryDate: new Date(2030, 1, 5), availability: true },
  { id: 6, name: "Bluetooth Speaker", price: 1500, category: "Electronics", description: "Portable Bluetooth speaker with deep bass", imageurl: "https://i.ibb.co/rdJxvbG/image.png", expiryDate: new Date(2028, 8, 18), availability: true },
  { id: 7, name: "Stylish Sunglasses", price: 300, category: "Accessories", description: "UV-protection stylish sunglasses", imageurl: "https://i.ibb.co/SDjhhP1/image.png", expiryDate: new Date(2029, 3, 25), availability: true },
  { id: 8, name: "Noise Cancelling Earbuds", price:1499, category: "Electronics", description: "Compact earbuds with noise-cancellation technology", imageurl: "https://i.ibb.co/R66B5Gd/image.png", expiryDate: new Date(2028, 4, 12), availability: false },
  { id: 9, name: "Fitness Yoga Mat", price: 199, category: "Fitness", description: "High-density yoga mat for fitness exercises", imageurl: "https://i.ibb.co/NxFcZbH/image.png", expiryDate: new Date(2029, 10, 8), availability: true },
  { id: 10, name: "Laptop Stand", price: 149, category: "Accessories", description: "Ergonomic laptop stand for desk use", imageurl: "https://i.ibb.co/VgX356d/image.png", expiryDate: new Date(2030, 0, 15), availability: true },
  { id: 11, name: "Smartphone Pro", price: 149000, category: "Phones", description: "Flagship smartphone with advanced camera features", imageurl: "https://i.ibb.co/rFZW9my/image.pngg", expiryDate: new Date(2027, 11, 31), availability: true },
  { id: 12, name: "Organic Hand Soap", price: 49, category: "Soaps", description: "Natural and moisturizing hand soap", imageurl: "https://i.ibb.co/Pr3QCVP/image.png", expiryDate: new Date(2025, 6, 22), availability: true },
  { id: 13, name: "Chocolate Chip Cookies", price: 20, category: "Foods", description: "Freshly baked cookies with chocolate chips", imageurl: "https://i.ibb.co/gTMpcLh/image.png", expiryDate: new Date(2025, 1, 14), availability: false },
  { id: 14, name: "Ballpoint Pen Set", price: 99, category: "Pens", description: "Pack of 5 smooth-writing pens", imageurl: "https://i.ibb.co/gFsB8h9/image.png", expiryDate: new Date(2025, 5, 30), availability: true },
  { id: 15, name: "Leather Backpack", price: 800, category: "Bags", description: "Durable and spacious leather backpack", imageurl: "https://i.ibb.co/2Pt1mtK/image.png", expiryDate: new Date(2029, 8, 5), availability: true },
  { id: 16, name: "Bestseller Novel", price: 200, category: "Books", description: "Top-rated fiction novel", imageurl: "https://i.ibb.co/vLM4CnY/image.png", expiryDate: new Date(2028, 7, 19), availability: true },
  { id: 17, name: "Wooden Building Blocks", price: 300, category: "Toys", description: "Colorful wooden blocks for kids", imageurl: "https://i.ibb.co/L8fxpWB/image.png", expiryDate: new Date(2029, 2, 28), availability: true },
  { id: 18, name: "Wireless Charging Pad", price: 500, category: "Electronics", description: "Fast wireless charger for smartphones", imageurl: "https://i.ibb.co/71rp0Sr/image.png", expiryDate: new Date(2028, 11, 7), availability: false },
  { id: 19, name: "Running Shoes", price: 1900, category: "Fitness", description: "Lightweight and comfortable running shoes", imageurl: "https://i.ibb.co/kccQBNn/image.png", expiryDate: new Date(2029, 9, 10), availability: true },
  { id: 20, name: "Reusable Water Bottle", price: 100, category: "Fitness", description: "Eco-friendly water bottle with straw lid", imageurl: "https://i.ibb.co/tzSTQ3p/image.png", expiryDate: new Date(2028, 3, 22), availability: true },
  { id: 21, name: "Tablet", price: 32999, category: "Electronics", description: "High-resolution tablet with stylus support", imageurl: "https://i.ibb.co/80RLdmq/image.png", expiryDate: new Date(2027, 8, 29), availability: true },
  { id: 22, name: "Luxury Body Wash", price: 25, category: "Soaps", description: "Moisturizing body wash with a fresh scent", imageurl: "https://i.ibb.co/5n2y8Sm/image.png", expiryDate: new Date(2025, 3, 18), availability: true },
  { id: 23, name: "Granola Bars", price: 20, category: "Foods", description: "Healthy and tasty snack bars", imageurl: "https://i.ibb.co/JmsGsX9/image.png", expiryDate: new Date(2025, 2, 5), availability: true },
  { id: 24, name: "Gel Ink Pen", price: 19, category: "Pens", description: "Smooth-flowing gel ink pen", imageurl: "https://i.ibb.co/WKqF8b3/image.png", expiryDate: new Date(2025, 7, 15), availability: false },
  { id: 25, name: "Canvas Tote Bag", price: 600, category: "Bags", description: "Stylish and eco-friendly canvas bag", imageurl: "https://i.ibb.co/YB3j0G3/image.png", expiryDate: new Date(2030, 0, 20), availability: true },
  { id: 26, name: "Cookbook", price: 299, category: "Books", description: "Easy recipes for beginners", imageurl: "https://i.ibb.co/sykZZB1/image.png", expiryDate: new Date(2028, 5, 12), availability: true },
  { id: 27, name: "RC Car", price: 799, category: "Toys", description: "Remote-controlled car for kids", imageurl: "https://i.ibb.co/9rjg0nD/image.png", expiryDate: new Date(2029, 6, 7), availability: false },
  { id: 28, name: "Noise-Cancelling Headphones", price: 2500, category: "Electronics", description: "Over-ear headphones with active noise cancellation", imageurl: "https://i.ibb.co/sFVq326/image.png", expiryDate: new Date(2028, 4, 28), availability: true },
  { id: 29, name: "Yoga Pants", price: 566, category: "Fitness", description: "Comfortable and stretchable yoga pants", imageurl: "https://i.ibb.co/3SMthMt/image.png", expiryDate: new Date(2029, 11, 15), availability: true },
  { id: 30, name: "Fitness Dumbbells", price: 1000, category: "Fitness", description: "Adjustable dumbbell set for strength training", imageurl: "https://i.ibb.co/CWSCGGm/image.png", expiryDate: new Date(2030, 2, 19), availability: true },
  { id: 31, name: "Multipurpose Pencil Pouch", price: 90, category: "Pouches", description: "Durable and spacious pouch for stationery items", imageurl: "https://i.ibb.co/jMp7fzm/image.png", expiryDate: new Date(2029, 1, 25), availability: false },
  { id: 32, name: "Kids' Action Figure", price: 1200, category: "Toys", description: "Exciting superhero action figure for kids", imageurl: "https://i.ibb.co/jg2cc6n/image.png", expiryDate: new Date(2028, 10, 18), availability: true },
  { id: 33, name: "Stainless Steel Cooking Bowl", price: 450, category: "Cooking Bowls", description: "Durable and heat-resistant stainless steel bowl", imageurl: "https://i.ibb.co/L0V12ht/image.png", expiryDate: new Date(2029, 5, 8), availability: true },
  { id: 34, name: "Handstick Umbrella", price: 650, category: "Handsticks", description: "Elegant and sturdy handstick umbrella", imageurl: "https://i.ibb.co/k9XH40t/image.png", expiryDate: new Date(2028, 9, 30), availability: true },
  { id: 35, name: "Luxury Glossary Notebook", price: 700, category: "Glossaries", description: "Hardcover notebook with premium-quality pages", imageurl: "https://i.ibb.co/fpf4PZV/image.png", expiryDate: new Date(2029, 4, 14), availability: true },
  { id: 36, name: "Silicone Cooking Bowl Set", price: 500, category: "Cooking Bowls", description: "Set of 3 non-slip silicone bowls for mixing and serving", imageurl: "https://i.ibb.co/P146d25/image.png", expiryDate: new Date(2028, 3, 17), availability: false },
  { id: 37, name: "Colorful Kids' Toy Car", price: 550, category: "Toys", description: "Bright and durable toy car for toddlers", imageurl: "https://i.ibb.co/DkhFZ47/image.png", expiryDate: new Date(2029, 7, 3), availability: true },
  { id: 38, name: "Transparent Zipper Pouch", price: 97, category: "Pouches", description: "Clear pouch ideal for makeup or toiletries", imageurl: "https://i.ibb.co/ydFWjf9/image.png", expiryDate: new Date(2028, 6, 22), availability: true },
  { id: 39, name: "Wooden Handstick Cane", price: 550, category: "Handsticks", description: "Traditional handcrafted wooden cane with a polished finish", imageurl: "https://i.ibb.co/Vt24cNk/image.png", expiryDate: new Date(2030, 3, 11), availability: true },
  { id: 40, name: "Professional Glossary Binder", price: 790, category: "Glossaries", description: "Binder with dividers for organizing notes and documents", imageurl: "https://i.ibb.co/TvpZv2m/image.png", expiryDate: new Date(2028, 8, 9), availability: false },
  { id: 41, name: "Decorative Ceramic Bowl", price: 890, category: "Cooking Bowls", description: "Stylish ceramic bowl for serving and decoration", imageurl: "https://i.ibb.co/b2tnkFv/image.png", expiryDate: new Date(2029, 0, 28), availability: true },
  { id: 42, name: "Plush Stuffed Toy", price: 350, category: "Toys", description: "Soft and cuddly stuffed animal for kids", imageurl: "https://i.ibb.co/3sLWbcw/image.png", expiryDate: new Date(2028, 1, 15), availability: true },
  { id: 43, name: "Travel Organizer Pouch", price: 450, category: "Pouches", description: "Compact and lightweight pouch for travel essentials", imageurl: "https://i.ibb.co/k9y3dy8/image.png", expiryDate: new Date(2029, 10, 5), availability: true },
  { id: 44, name: "Adjustable Handstick Trekking Pole", price: 650, category: "Handsticks", description: "Lightweight and adjustable trekking pole for outdoor activities", imageurl: "https://i.ibb.co/3d1cdy9/image.png", expiryDate: new Date(2030, 2, 24), availability: true },
  { id: 45, name: "Kids' Learning Glossary", price: 450, category: "Glossaries", description: "Colorful glossary book for children's learning", imageurl: "https://i.ibb.co/4R6pcmT/image.png", expiryDate: new Date(2028, 11, 19), availability: false },
  { id: 46, name: "Microwave-Safe Cooking Bowl", price: 799, category: "Cooking Bowls", description: "BPA-free and microwave-safe plastic bowl", imageurl: "https://i.ibb.co/mHD7GYs/image.png", expiryDate: new Date(2029, 9, 7), availability: true },
  { id: 47, name: "Remote-Controlled Drone Toy", price: 4599, category: "Toys", description: "High-performance drone with remote control", imageurl: "https://i.ibb.co/BBzB5Tw/image.png", expiryDate: new Date(2028, 7, 28), availability: true },
  { id: 48, name: "Leather Pen Pouch", price: 85, category: "Pouches", description: "Premium leather pouch for pens and pencils", imageurl: "https://i.ibb.co/W6CPtYR/image.png", expiryDate: new Date(2029, 2, 16), availability: true },
  { id: 49, name: "Fashionable Handstick Umbrella", price: 500, category: "Handsticks", description: "Compact and fashionable umbrella with ergonomic handle", imageurl: "https://i.ibb.co/LgjSg8p/image.png", expiryDate: new Date(2028, 5, 9), availability: false },
  { id: 50, name: "Pocket Glossary Dictionary", price: 650, category: "Glossaries", description: "Portable glossary dictionary for quick references", imageurl: "https://i.ibb.co/0Jh3kym/image.png", expiryDate: new Date(2029, 8, 21), availability: true },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = productsData.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddToCart = (product) => {
    if (!product.availability) {
      toast.error(`${product.name} is currently out of stock!`, {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Increment quantity if product exists
      setCart(cart.map(item => 
        item.id === product.id 
        ? {...item, quantity: item.quantity + 1} 
        : item
      ));
    } else {
      // Add new product with quantity 1
      setCart([...cart, {...product, quantity: 1}]);
    }
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId 
      ? {...item, quantity: newQuantity} 
      : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const generateQRCode = () => {
    // Create bill data in text format
    let billText = "Smart Marts - Digital Bill\n\n";
    billText += "Items:\n";
    
    cart.forEach(item => {
      billText += `${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    billText += "\n-------------------------\n";
    billText += `Total Amount: ₹${calculateTotal().toFixed(2)}\n`;
    billText += `Date: ${new Date().toLocaleDateString()}\n`;
    billText += `Time: ${new Date().toLocaleTimeString()}\n`;
    billText += "\nThank you for shopping with Smart Marts!";
    
    setQrData(billText);
    setShowQR(true);
  };

  const handleAuthSubmit = () => {
    if (password === "~!@#$%^&*()_+") {
      setShowAuth(false);
      setPassword("");
      window.location.href = "/superadmin"; // Navigate to SuperAdmin page
    } else {
      setPasswordError("Invalid password");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="home">
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="favicon.ico"
            alt="Eshop Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <h1>Smart Marts</h1>
        </div>
        
        <div className="header-icons">
          <div className="user-icon" onClick={() => setShowAuth(true)}>
            <FaUser size={25} />
          </div>
          <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
            <FaShoppingCart size={30} />
            {cart.length > 0 && <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>}
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuth && (
        <div className="auth-modal">
          <div className="auth-content">
            <button className="close-btn" onClick={() => {setShowAuth(false); setPassword(""); setPasswordError("");}}>×</button>
            <h2>Admin Authentication</h2>
            <div className="auth-form">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setPasswordError("");}}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
              <button onClick={handleAuthSubmit}>Login</button>
            </div>
          </div>
        </div>
      )}

      <div className="filters-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <FaFilter className="filter-icon" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Wearables">Wearables</option>
            <option value="Fitness">Fitness</option>
            <option value="Phones">Phones</option>
            <option value="Soaps">Soaps</option>
            <option value="Foods">Foods</option>
            <option value="Pens">Pens</option>
            <option value="Bags">Bags</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Pouches">Pouches</option>
            <option value="Handsticks">Handsticks</option>
            <option value="Glossaries">Glossaries</option>
            <option value="Cooking Bowls">Cooking Bowls</option>
          </select>
        </div>
      </div>
      
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageurl}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-info">
              <span>₹{product.price.toFixed(2)}</span>
              <span className="expiry-date">Expires: {formatDate(product.expiryDate)}</span>
            </div>
            {product.availability ? (
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="out-of-stock"
                disabled
              >
                Out of Stock
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Cart Modal */}
      {showCart && (
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-btn" onClick={() => setShowCart(false)}>×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imageurl} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price.toFixed(2)}</p>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="item-total">
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Total: <span>₹{calculateTotal().toFixed(2)}</span></h3>
                </div>
                <button className="generate-qr-btn" onClick={generateQRCode}>
                  Generate QR Code
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* QR Code Modal */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <button className="close-btn" onClick={() => setShowQR(false)}>×</button>
            <h2>Scan this QR Code at checkout</h2>
            <div className="qr-container">
              <QRCodeSVG value={qrData} size={256} />
            </div>
            <div className="bill-preview">
              <h3>Bill Preview:</h3>
              <div className="bill-items">
                {cart.map((item) => (
                  <div key={item.id} className="bill-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="bill-total">
                <span>Total Amount:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <p className="instructions">Show this QR code to the cashier for faster checkout</p>
          </div>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default Home;