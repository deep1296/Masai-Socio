import { useState, useEffect } from "react";
import axios from "axios";
import { SingleProduct } from "./SingleProduct";

export const Products = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchProducts = () => {
      setLoading(true);
      axios
         .get("http://localhost:8080/api/v1/products")
         .then((res) => {
            setProducts(res.data.data);
            setLoading(false);
         })
         .catch((err) => {
            setError(err);
            setLoading(false);
         });
   };

   useEffect(() => {
      fetchProducts();
   }, []);
   return (
      <div>
         {loading ? (
            <h1 className="w-full inline-flex items-center text-lg font-semibold">
               ...Loading
            </h1>
         ) : error ? (
            <div>Error: {error.message}</div>
         ) : (
            <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
               {products.map((product) => (
                  <SingleProduct key={product._id} product={product} />
               ))}
            </div>
         )}
      </div>
   );
};
