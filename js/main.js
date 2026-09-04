import { products } from './products.js';
import { searchProducts, filterProductsByCategory } from './inventoryUtils.js';
import { displayProducts } from './display.js';

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

function applyFilters() {
  const searchQuery = searchInput.value.trim();
  const selectedCategory = categoryFilter.value;
  
  let filteredProducts = [...products];
  
  filteredProducts = filterProductsByCategory(filteredProducts, selectedCategory);
  
  if (searchQuery !== '') {
    filteredProducts = searchProducts(filteredProducts, searchQuery);
  }
  
  displayProducts(filteredProducts);
}

function resetFilters() {
  searchInput.value = '';
  categoryFilter.value = 'All';
  displayProducts(products);
}

searchBtn.addEventListener('click', applyFilters);
resetBtn.addEventListener('click', resetFilters);

searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    applyFilters();
  }
});

categoryFilter.addEventListener('change', applyFilters);

displayProducts(products);
