// "use client";
// import React, { useState } from "react";
// import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

// export default function SeeSellModalBtn() {
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleDelete = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowConfirmation(false);
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent event bubbling
//     setShowConfirmation(false);
//   };

//   const toggleConfirmation = (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent event bubbling
//     setShowConfirmation((prev) => !prev);
//   };

//   return (
//     <button
//       type="button"
//       onClick={toggleConfirmation}
//       className="relative inline-flex items-center justify-between px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transform transition-all duration-300 ease-in-out min-w-[140px] overflow-hidden shadow-lg hover:shadow-xl"
//     >
//       {/* Initial state */}
//       <div
//         className={`flex items-center transform transition-all duration-300 ease-in-out ${
//           showConfirmation
//             ? "translate-y-full opacity-0"
//             : "translate-y-0 opacity-100"
//         }`}
//       >
//         <FaRegTrashAlt className="w-4 h-4 mr-2" />
//         <span>Eliminar venta</span>
//       </div>

//       {/* Confirmation state */}
//       <div
//         className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out transform ${
//           showConfirmation
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >
//         <div
//           onClick={handleDelete}
//           className="h-full flex-1 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer"
//         >
//           <FaCheck className="w-4 h-4 transform hover:scale-110 transition-transform duration-200" />
//         </div>
//         <div className="h-full w-px bg-white/30"></div>
//         <div
//           onClick={handleCancel}
//           className="flex-1 h-full flex items-center justify-center bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer"
//         >
//           <FaTimes className="w-4 h-4 transform hover:scale-110 transition-transform duration-200" />
//         </div>
//       </div>
//     </button>
//   );
// }
"use client";
import React, { useState } from "react";
import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function SeeSellModalBtn() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setShowConfirmation(false);
    setIsDeleting(false);
  };

  const handleCancelDeleting = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsDeleting(false);
    setShowConfirmation(false);
  };

  const toggleConfirmation = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setShowConfirmation((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleConfirmation}
      className="relative inline-flex items-center justify-between px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transform transition-all duration-300 ease-in-out min-w-[140px] overflow-hidden shadow-lg hover:shadow-xl"
    >
      {/* Initial state */}
      <div
        className={`flex items-center transform transition-all duration-300 ease-in-out ${
          showConfirmation || isDeleting
            ? "translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <FaRegTrashAlt className="w-4 h-4 mr-2" />
        <span>Eliminar venta</span>
      </div>

      {/* Confirmation state */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out transform ${
          showConfirmation && !isDeleting
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div
          onClick={handleDelete}
          className="h-full flex-1 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <FaCheck className="w-4 h-4 transform hover:scale-110 transition-transform duration-200" />
        </div>
        <div className="h-full w-px bg-white/30"></div>
        <div
          onClick={handleCancel}
          className="flex-1 h-full flex items-center justify-center bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <FaTimes className="w-4 h-4 transform hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      {/* Deleting state */}
      <div
        className={`absolute inset-0 bg-slate-900 flex items-center justify-center transition-all duration-300 ease-in-out transform ${
          isDeleting ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div
          onClick={handleCancelDeleting}
          className="flex items-center cursor-pointer"
        >
          <div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
          <span>Cancelar</span>
        </div>
      </div>
    </button>
  );
}
