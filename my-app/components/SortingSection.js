export default function SortingSection({ onPriceSortChange, onRatingSortChange, onPriceFilterChange, priceRange }) {
  // Handle price range input
  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    const updatedPriceRange = [...priceRange];

    if (name === "minPrice") {
      updatedPriceRange[0] = value === "" ? updatedPriceRange[0] : Math.max(0, parseInt(value, 10) || 0);
    } else if (name === "maxPrice") {
      updatedPriceRange[1] = value === "" ? updatedPriceRange[1] : Math.max(0, parseInt(value, 10) || 50000);
    }

    onPriceFilterChange(updatedPriceRange[0], updatedPriceRange[1]);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between md:justify-start">
      {/* Price range input */}
      <div className="flex items-center gap-2">
        <label>Min</label>
        <input
          type="number"
          name="minPrice"
          value={priceRange[0]}
          onChange={handlePriceInputChange}
          className="border p-1 rounded w-20"
          placeholder="Min Price"
        />
        <span>-</span>
        <label>Max</label>
        <input
          type="number"
          name="maxPrice"
          value={priceRange[1]}
          onChange={handlePriceInputChange}
          className="border p-1 rounded w-20"
          placeholder="Max Price"
        />
      </div>

      {/* Sorting options */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          onChange={(e) => onPriceSortChange(e.target.value)}
          className="p-1 text-sm border rounded"
        >
          <option value="none">Price Sorting</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        <select
          onChange={(e) => onRatingSortChange(e.target.value)}
          className="p-1 text-sm border rounded"
        >
          <option value="none">Rating Sorting</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
          <option value="ratingLowToHigh">Rating: Low to High</option>
        </select>
      </div>
    </div>
  );
}
