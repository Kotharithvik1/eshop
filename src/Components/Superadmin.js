import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle, FaBan } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./Superadmin.css";
// Fix the import to get productsData directly
import { productsData as products } from "./Home";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Superadmin = () => {
  const navigate = useNavigate();
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("expiring");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Use the correctly imported products array
    // Filter products expiring in 2025
    const expiring = products.filter(
      (product) => product.expiryDate.getFullYear() === 2025
    );
    setExpiringProducts(expiring);

    // Filter products that are out of stock
    const outOfStock = products.filter(
      (product) => product.availability === false
    );
    setOutOfStockProducts(outOfStock);
  }, []);

  // Prepare data for category-wise expiring products chart
  const expiringByCategory = expiringProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for category-wise out of stock products chart
  const outOfStockByCategory = outOfStockProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Chart data for expiring products
  const expiringChartData = {
    labels: Object.keys(expiringByCategory),
    datasets: [
      {
        label: "Expiring Products by Category",
        data: Object.values(expiringByCategory),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for out of stock products
  const outOfStockChartData = {
    labels: Object.keys(outOfStockByCategory),
    datasets: [
      {
        label: "Out of Stock Products by Category",
        data: Object.values(outOfStockByCategory),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: activeTab === "expiring" 
          ? "Products Expiring in 2025 by Category" 
          : "Out of Stock Products by Category",
      },
    },
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="superadmin-container">
      <div className="superadmin-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <FaArrowLeft /> Back to Store
        </button>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="dashboard-overview">
        <div className="stat-card warning">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-details">
            <h3>Expiring Soon</h3>
            <p>{expiringProducts.length} products</p>
          </div>
        </div>
        <div className="stat-card danger">
          <div className="stat-icon">
            <FaBan />
          </div>
          <div className="stat-details">
            <h3>Out of Stock</h3>
            <p>{outOfStockProducts.length} products</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "expiring" ? "active" : ""}
          onClick={() => setActiveTab("expiring")}
        >
          Expiring Products
        </button>
        <button
          className={activeTab === "outOfStock" ? "active" : ""}
          onClick={() => setActiveTab("outOfStock")}
        >
          Out of Stock Products
        </button>
      </div>

      <div className="dashboard-content">
        <div className="chart-container">
          {activeTab === "expiring" ? (
            <div className="chart">
              <h3>Expiring Products by Category in {2025}</h3>
              <Pie data={expiringChartData} options={chartOptions} />
            </div>
          ) : (
            <div className="chart">
              <h3>Out of Stock Products by Category</h3>
              <Bar data={outOfStockChartData} options={chartOptions} />
            </div>
          )}
        </div>

        <div className="products-list">
          <h2>
            {activeTab === "expiring"
              ? `Products Expiring in ${2025} (${expiringProducts.length})`
              : `Out of Stock Products (${outOfStockProducts.length})`}
          </h2>
          <div className="alert-products">
            {activeTab === "expiring"
              ? expiringProducts.map((product) => (
                  <div className="alert-product-card" key={product.id}>
                    <div className="alert-badge expiring">Expiring Soon</div>
                    <img
                      src={product.imageurl}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                    <p className="expiry-alert">
                      Expires: {formatDate(product.expiryDate)}
                    </p>
                  </div>
                ))
              : outOfStockProducts.map((product) => (
                  <div className="alert-product-card" key={product.id}>
                    <div className="alert-badge out-of-stock">Out of Stock</div>
                    <img
                      src={product.imageurl}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                    <p className="expiry-date">
                      Expires: {formatDate(product.expiryDate)}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Superadmin;
