// fetch the categories-list
export const fetchCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/category-list");
  const data = await res.json();
  
  // Check the structure of the response before returning
  console.log(data);  // This will show the response structure
  
  return data;
};

//fetch the categories by id
export const fetchProducts = async (categoryId) => {
  const res = await fetch(`https://dummyjson.com/products/category/${categoryId}`);
  const data = await res.json();
  return data;
};


//fetch the products by id
export const fetchProductById = async (productId) => {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await res.json();
  return data; 
};

//-----------------slug------------------------------------------------
// export const fetchProductBySlug = async (slug) => {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();
//   const product = data.products.find((product) => generateSlug(product.title) === slug);
//   return product;
// };
//---------------------------------------------------------------------


export const fetchCart = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/carts`);
    
    // Check if the response is OK (status 200-299)
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return [];  // Return an empty array or appropriate fallback value
  }
};

