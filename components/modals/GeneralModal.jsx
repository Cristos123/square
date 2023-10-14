"use client";
// import React from "react";

// const GeneralModal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg w-full sm:w-auto">
//         {children}
//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GeneralModal;

import React from "react";
import { CSSTransition } from "react-transition-group";
import { Close } from "@mui/icons-material";

const GeneralModal = ({ isOpen, onClose, heading, body, footer }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal-transition"
      unmountOnExit
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full sm:w-auto relative">
          <button
            className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <Close />
          </button>
          <div className="my-10 ">
            {heading && (
              <div className="mb-7 text-center font-semibold ">
                {heading}
              </div>
            )}
            {body && <div className="mb-4">{body}</div>}
            {footer && <div className="mt-4">{footer}</div>}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default GeneralModal;
