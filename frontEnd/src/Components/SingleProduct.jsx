import Cookies from "js-cookie";
import axios from "axios";
export function SingleProduct(props) {
   const { product } = props;
   const storeToken = Cookies.get("accessToken");

   const handleProduct = (id) => {
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
         .post(
            `https://odd-elk-baseball-cap.cyclic.app/api/v1/cart/add/${id}`,
            {}
         )
         .then((response) => {
            alert("Added to cart successfully");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div key={product._id} className="rounded-md border">
         <img
            src={product.image}
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
         />
         <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
               {product.name}
            </h1>
            <p className="mt-3 text-sm text-gray-600">{product.description}</p>
            <div className="mt-4">
               <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  {product.category.name}
               </span>
            </div>
            <div className="mt-3 flex items-center space-x-2">
               <span className="block text-sm font-semibold">Colors : </span>
               <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
               <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
               <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
            </div>
            <div className="mt-5 flex items-center space-x-2">
               <span className="block text-sm font-semibold">Price : </span>
               <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                  {"₹ "}
                  {product.price}
               </span>
            </div>
            <button
               onClick={() => {
                  handleProduct(product._id);
               }}
               type="button"
               className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
               Add to Cart
            </button>
         </div>
      </div>
   );
}
