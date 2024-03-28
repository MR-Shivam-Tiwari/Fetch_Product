import React, { useEffect, useState } from 'react'

function Home() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fetch-product-mu.vercel.app/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const sortProducts = (type) => {
    let sortedProducts = [...products];
    if (type === 'priceLowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'priceHighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (type === 'title') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    setProducts(sortedProducts);
  };

  return (
    <div className=''>
      <div className="flex flex-col min-h-screen">
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
        <main className=" ">
          <div className="w-full max-w-6xl mx-auto grid items-start gap-4 p-4">
            <div className="grid items-center mb-4 gap-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pr-2">
                <h1 className="font-semibold text-3xl">Products</h1>
                <div className='flex items-center  gap-3'>
                  <span className='w-full font-semibold text-1xl'>

                    Sort By:
                  </span>
                  <button
                    className="h-10 w-[100%] border border-input bg-background px-3 py-2 text-sm rounded-md    focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    id="d14gqsfgulq"
                    onClick={() => sortProducts('priceLowToHigh')}
                  >
                    <p className='' style={{ width: "130px" }}>

                      Price Low To High
                    </p>
                  </button>
                  <button
                    className="h-10 w-[100%] border border-input bg-background px-3 py-2 text-sm rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    id="d14gqsfgulq"
                    onClick={() => sortProducts('priceHighToLow')}
                  >
                    <p className='' style={{ width: "130px" }}>

                      Price High To Low
                    </p>
                  </button>
                  <button
                    className="h-10 w-full border border-input bg-background px-3 py-2 text-sm rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    id="d14gqsfgulq"
                    onClick={() => sortProducts('title')}
                  >
                    <p className='' style={{ width: "100px" }}>

                      Sort By Title
                    </p>
                  </button>
                </div>




              </div>
            </div>
            <div className="grid gap-4">
              {products.map(product => (
                <div className="grid grid-cols-3 border p-2 rounded-lg items-center gap-4" key={product.id}>
                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-video rounded-lg object-cover"
                    width="300"
                    height="200"
                  />
                  {/* Product details */}
                  <div className="grid gap-1.5">
                    <h2 className="font-semibold text-lg">{product.title}</h2>
                    <p className="text-sm">${product.price}</p>
                  </div>
                  {/* View product details button */}
                  <a className="flex items-center justify-end text-sm underline" href={`/details/${product.id}`}>
                    View
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 ml-2.5"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              ))}


            </div>
          </div>
        </main>
      </div >


    </div >


  )
}

export default Home
