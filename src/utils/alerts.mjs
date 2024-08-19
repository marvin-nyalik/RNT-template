export const sendStockAlert = (product) => {
  const alertMessage = `Alert: Stock for ${product.name} 
    is below the required threshold of ${product.stockThreshold}. 
    Current quantity is ${product.quantity}.
    `;
  
};
