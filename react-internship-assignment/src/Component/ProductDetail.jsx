import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make a GET request to your backend API with the 'id' parameter
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        // Set the fetched product data to the state
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetchProduct function when the component mounts
    fetchProduct();
  }, [id]); // Fetch data whenever 'id' changes

  // Render loading state while fetching data
  if (loading) return <div>Loading...</div>;

  // Render error message if there's an error
  if (error) return <div>Error: {error.message}</div>;

  // Render if no product data is found
  if (!product) return <div>No product found</div>;
  const rating = product.rating.rate;

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    const stars = [];

    // Filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg
          key={`star-filled-${i}`}
          className="w-4 h-4 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    // Remaining stars
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg
          key={`star-empty-${i}`}
          className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div>
      <header className="border-b p-4">
        <div className="w-full max-w-6xl mx-auto grid items-center h-14 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-2 font-semibold" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="m7.5 4.27 9 5.15"></path>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
              <span className="">Products</span>
            </a>
          </div>
        </div>
      </header>
      <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
        <div className="grid gap-4 items-start p-4">
          <div className=" md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl">{product?.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {renderStars(rating)}
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {rating}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold ml-auto">${product?.price}</div>
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="flex items-center  gap-4 md:gap-10">
              <div className="grid gap-2">
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                  for="color"
                >
                  Category
                </label>
                <div
                  role="radiogroup"
                  aria-required="false"
                  dir="ltr"
                  className="flex items-center gap-2"
                  id="color"
                  tabindex="0"
                  // style="outline: none;"
                  style={{ outline: "none" }}
                >
                  <label
                    className="text-sm capitalize  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border cursor-pointer rounded-md p-2 flex items-center gap-2 [&amp;:has(:checked)]:bg-gray-100 dark:[&amp;:has(:checked)]:bg-gray-800"
                    for="color-black"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked="true"
                      data-state="checked"
                      value="black"
                      className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="color-black"
                      tabindex="-1"
                      data-radix-collection-item=""
                    >
                      <span
                        data-state="checked"
                        className="flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-2.5 w-2.5 fill-current text-current"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                      </span>
                    </button>
                    <input
                      aria-hidden="true"
                      tabIndex="-1"
                      type="radio"
                      value="black"
                      defaultChecked
                      style={{
                        transform: "translateX(-100%)",
                        position: "absolute",
                        pointerEvents: "none",
                        opacity: 0,
                        margin: "0px",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    {product?.category}
                  </label>
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                  for="quantity"
                >
                  Quantity
                </label>
                <button
                  type="button"
                  role="combobox"
                  aria-controls="radix-:raf:"
                  aria-expanded="false"
                  aria-autocomplete="none"
                  dir="ltr"
                  data-state="closed"
                  className="flex h-10  items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-24"
                >
                  <span style={{ pointerEvents: "none" }}>
                    {product?.rating?.count}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">
                Add to cart
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                Add to wishlist
              </button>
            </div>
          </form>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-gray-100 h-[1px] w-full"
          ></div>
          <div className="grid gap-4 text-sm leading-loose">
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="grid gap-4">
          <img
            alt="ProductImage"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src={product?.image}
            width={600}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
