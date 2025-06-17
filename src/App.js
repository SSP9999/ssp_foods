import React, { useState } from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const foodItems = [
    // Vegetarian Items
    {
      id: 1,
      name: "Margherita Pizza",
      category: "veg",
      price: 299,
      image: "🍕",
      rating: 4.5,
      time: "25-30 min",
      description: "Classic pizza with fresh tomato sauce, mozzarella, and basil"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      category: "veg",
      price: 249,
      image: "🍛",
      rating: 4.3,
      time: "20-25 min",
      description: "Creamy tomato curry with soft paneer cubes"
    },
    {
      id: 3,
      name: "Veg Biryani",
      category: "veg",
      price: 199,
      image: "🍚",
      rating: 4.2,
      time: "30-35 min",
      description: "Aromatic basmati rice with mixed vegetables and spices"
    },
    {
      id: 4,
      name: "Masala Dosa",
      category: "veg",
      price: 149,
      image: "🥞",
      rating: 4.6,
      time: "15-20 min",
      description: "Crispy crepe with spiced potato filling"
    },
    {
      id: 5,
      name: "Veg Burger",
      category: "veg",
      price: 129,
      image: "🍔",
      rating: 4.1,
      time: "15-20 min",
      description: "Grilled veggie patty with fresh lettuce and tomato"
    },
    // Non-Vegetarian Items
    {
      id: 6,
      name: "Chicken Biryani",
      category: "non-veg",
      price: 349,
      image: "🍛",
      rating: 4.7,
      time: "35-40 min",
      description: "Aromatic basmati rice with tender chicken pieces"
    },
    {
      id: 7,
      name: "Butter Chicken",
      category: "non-veg",
      price: 299,
      image: "🍗",
      rating: 4.5,
      time: "25-30 min",
      description: "Creamy tomato curry with succulent chicken pieces"
    },
    {
      id: 8,
      name: "Fish Curry",
      category: "non-veg",
      price: 279,
      image: "🐟",
      rating: 4.4,
      time: "20-25 min",
      description: "Spicy coconut curry with fresh fish"
    },
    {
      id: 9,
      name: "Chicken Pizza",
      category: "non-veg",
      price: 399,
      image: "🍕",
      rating: 4.6,
      time: "25-30 min",
      description: "Pizza topped with grilled chicken and vegetables"
    },
    {
      id: 10,
      name: "Mutton Kebab",
      category: "non-veg",
      price: 449,
      image: "🍖",
      rating: 4.3,
      time: "30-35 min",
      description: "Succulent mutton pieces grilled to perfection"
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🚚</span>
            <h1 className="text-2xl font-bold text-gray-800">Pramodh Foods</h1>
          </div>
          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
          >
            <span className="text-2xl">🛒</span>
            <span>Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Delicious Food Delivered</h2>
          <p className="text-xl text-gray-600">Order your favorite meals from the comfort of your home</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-lg mr-2 transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            <button 
              onClick={() => setActiveCategory('veg')}
              className={`px-6 py-2 rounded-lg mr-2 transition-colors ${
                activeCategory === 'veg' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🌱 Vegetarian
            </button>
            <button 
              onClick={() => setActiveCategory('non-veg')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeCategory === 'non-veg' 
                  ? 'bg-red-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🍖 Non-Vegetarian
            </button>
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="text-6xl mb-4 text-center">{item.image}</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === 'veg' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.category === 'veg' ? '🌱 VEG' : '🍖 NON-VEG'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">🕐</span>
                      <span className="text-sm text-gray-600">{item.time}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  {cart.find(cartItem => cartItem.id === item.id) ? (
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <span className="text-sm">−</span>
                      </button>
                      <span className="text-lg font-semibold">
                        {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-sm">+</span>
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Your Cart</h3>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            <span className="text-xs">−</span>
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                          >
                            <span className="text-xs">+</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-gray-800">Total: ₹{getTotalPrice()}</span>
                      </div>
                      <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Pramodh Foods</h3>
          <p className="text-gray-400 mb-4">Delivering happiness to your doorstep</p>
          <p className="text-sm text-gray-500">© 2025 Pramodh Foods. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;