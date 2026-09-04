import { getStockStatus, calculateTotalInventoryValue, countLowStockProducts, countOutOfStockProducts } from './inventoryUtils.js';

export function displayProducts(products) {
  const productList = document.getElementById('productList');
  const noResultsMessage = document.getElementById('noResultsMessage');
  
  productList.innerHTML = '';
  
  if (products.length === 0) {
    noResultsMessage.style.display = 'block';
    noResultsMessage.textContent = 'No products found';
  } else {
    noResultsMessage.style.display = 'none';
    
    products.forEach(product => {
      const { id, name, category, price, stock } = product;
      
      const stockStatus = getStockStatus(stock);
      
      const card = document.createElement('div');
      card.className = 'product-card';
      
      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Price:</strong> ₱${price.toLocaleString()}</p>
        <p><strong>Stock:</strong> ${stock}</p>
        <p><strong>Status:</strong> <span class="status-${stockStatus.replace(/\s/g, '-').toLowerCase()}">${stockStatus}</span></p>
      `;
      
      productList.appendChild(card);
    });
  }
  
  updateSummary(products);
}

function updateSummary(products) {
  const totalInventoryValue = document.getElementById('totalInventoryValue');
  const lowStockCount = document.getElementById('lowStockCount');
  const outOfStockCount = document.getElementById('outOfStockCount');
  
  const totalValue = calculateTotalInventoryValue(products);
  const lowStock = countLowStockProducts(products);
  const outOfStock = countOutOfStockProducts(products);
  
  totalInventoryValue.textContent = `₱${totalValue.toLocaleString()}`;
  lowStockCount.textContent = lowStock;
  outOfStockCount.textContent = outOfStock;
}
