import { Trash, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Cart() {
   const [products, setProducts] = useState([]);
   const storeToken = Cookies.get("accessToken");
   const navigate = useNavigate();

   const getProducts = () => {
      axios.interceptors.request.use(
         (config) => {
            config.headers["Authorization"] = `Bearer ${storeToken}`;

            return config;
         },
         (error) => {
            return Promise.reject(error);
         }
      );

      axios
         .get(`http://localhost:8080/api/v1/cart`)
         .then((response) => {
            setProducts(response.data.data.items);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   useEffect(() => {
      getProducts();
   }, []);

   const removeFromCart = (id) => {
      console.log(`Removing ${id} from)...`);
      axios.interceptors.request.use(
         (config) => {
            config.headers["Authorization"] = `Bearer ${storeToken}`;

            return config;
         },
         (error) => {
            return Promise.reject(error);
         }
      );

      axios
         .post(`http://localhost:8080/api/v1/cart/remove/${id}`)
         .then((response) => {
            setProducts(response.data.data.items);
         })
         .then(() => {
            getProducts();
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
         <h2 className="text-3xl font-bold">Your cart</h2>
         {products.length === 0 ? (
            <h2 className="text-3xl font-bold">Your cart is Empty</h2>
         ) : (
            <p className="mt-2 text-sm text-gray-600">
               You have {products.length} items in your cart
            </p>
         )}
         <ul className="flex flex-col divide-y divide-gray-200">
            {products.map((product) => (
               <li
                  key={product._id}
                  className="flex flex-col py-6 sm:flex-row sm:justify-between"
               >
                  <div className="flex w-full space-x-2 sm:space-x-4">
                     <img
                        className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                        src={product.productId.image}
                        alt={product.productId.title}
                     />
                     <div className="flex w-full flex-col justify-between pb-4">
                        <div className="flex w-full justify-between space-x-2 pb-2">
                           <div className="space-y-1">
                              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                 {product.productId.title}
                              </h3>
                              <p className="text-sm">
                                 Quantity : {product.quantity}
                              </p>
                           </div>
                           <div className="text-right">
                              <p className="text-lg font-semibold">
                                 {product.productId.price}
                              </p>
                           </div>
                        </div>
                        <div className="flex divide-x text-sm">
                           <button
                              type="button"
                              className="flex items-center space-x-2 px-2 py-1 pl-0"
                              onClick={() => {
                                 removeFromCart(product.productId._id);
                              }}
                           >
                              <Trash size={16} />
                              <span>Remove</span>
                           </button>
                           <button
                              type="button"
                              className="flex items-center space-x-2 px-2 py-1"
                           >
                              <Heart size={16} />
                              <span>Add to favorites</span>
                           </button>
                        </div>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
         <div className="space-y-1 text-right">
            <p>
               Total amount:
               <span className="font-semibold">
                  {" "}
                  {products.reduce((price, item) => {
                     return price + item.productId.price * item.quantity;
                  }, 0) || 0}
               </span>
            </p>
         </div>
         <div className="flex justify-end space-x-4">
            <button
               onClick={() => {
                  navigate("/");
               }}
               type="button"
               className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
               Back to shop
            </button>
         </div>
      </div>
   );
}
