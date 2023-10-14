// CategoryCard.js
// import React from "react";

// const CategoryCard = ({ title, description, products, addProduct }) => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <p className="text-gray-600">{description}</p>
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={addProduct}
//       >
//         Add Product
//       </button>
//       {products.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Products:</h3>
//           <ul className="list-disc pl-6">
//             {products.map((product, index) => (
//               <li key={index}>{product}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryCard;

// CategoriesPage.js
// import React from 'react';
// import CategoryCard from './CategoryCard';

// const CategoriesPage = () => {
//   const categories = [
//     { title: 'Electronics', description: 'Browse our latest gadgets and devices.' },
//     { title: 'Clothing', description: 'Discover the latest fashion trends.' },
//     { title: 'Home & Decor', description: 'Upgrade your living space with our home essentials.' },
//     // Add more categories here
//   ];

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-semibold mb-4">Product Categories</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} title={category.title} description={category.description} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesPage;

// CategoryCard.js
"use client";
import React from "react";

const CategoryCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between gap-3 space-y-4  ">
        <div className="flex  space-y-4 space-x-2">
          <img className="w-[100px] h-[100px]" src="/assets/imgaes.jpg" />
          <h2 className="md:text-xl font-semibold mb-2">{title}</h2>
        </div>

        <div className="text-green-600 px-3">
          <p>active</p>
        </div>
      </div>
      <div className=" flex  my-4 ">
        <div className=" flex-1 justify-start items-center flex-col ">
          <p className="">Products</p>
          <p className="">20</p>
        </div>{" "}
        <div className=" flex-1 items-center flex-col ">
          <p className="">Active</p>
          <p className="">20</p>
        </div>{" "}
        <div className=" flex-1 items-center flex-col ">
          <p className="">Inactive</p>
          <p className="">20</p>
        </div>{" "}
        <div className=" flex-1 items-center flex-col ">
          <p className="">Out of Stock</p>
          <p className="">20</p>
        </div>
      </div>
      {/* <p className="text-gray-600">{description}</p> */}
    </div>
  );
};

export default CategoryCard;
