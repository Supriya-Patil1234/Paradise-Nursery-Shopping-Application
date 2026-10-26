import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (name, color) =>
  `https://placehold.co/300x200/${color}/ffffff?text=${encodeURIComponent(name)}`; // swap for real photos

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 15, description: 'Produces oxygen at night.' },
      { name: 'Spider Plant', cost: 12, description: 'Filters formaldehyde and xylene.' },
      { name: 'Peace Lily', cost: 18, description: 'Removes mold spores and toxins.' },
      { name: 'Boston Fern', cost: 20, description: 'Humidifies and cleans the air.' },
      { name: 'Rubber Plant', cost: 17, description: 'Absorbs airborne chemicals.' },
      { name: 'Aloe Vera', cost: 14, description: 'Purifies air and soothes burns.' },
    ].map((p) => ({ ...p, image: img(p.name, '4caf50') })),
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', cost: 20, description: 'Calming scent that aids sleep.' },
      { name: 'Jasmine', cost: 18, description: 'Sweet floral fragrance.' },
      { name: 'Rosemary', cost: 15, description: 'Woody scent, great in cooking.' },
      { name: 'Mint', cost: 12, description: 'Refreshing and easy to grow.' },
      { name: 'Lemon Balm', cost: 14, description: 'Citrus aroma that relieves stress.' },
      { name: 'Hyacinth', cost: 22, description: 'Rich, spring-like perfume.' },
    ].map((p) => ({ ...p, image: img(p.name, '8e6bbf') })),
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', cost: 25, description: 'Thrives on neglect and low light.' },
      { name: 'Pothos', cost: 10, description: 'Trailing vine, very forgiving.' },
      { name: 'Cast Iron Plant', cost: 19, description: 'Nearly indestructible.' },
      { name: 'Chinese Evergreen', cost: 21, description: 'Patterned leaves, shade tolerant.' },
      { name: 'Dracaena', cost: 23, description: 'Tall and elegant indoors.' },
      { name: 'Philodendron', cost: 16, description: 'Heart-shaped leaves, easy care.' },
    ].map((p) => ({ ...p, image: img(p.name, '2f7f8f') })),
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={onHomeClick}>🌿 Paradise Nursery</div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#cart" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 Cart <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p className="description">{plant.description}</p>
                    <p className="price">${plant.cost}</p>
                    <button
                      className="add-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
