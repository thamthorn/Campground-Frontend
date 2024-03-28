// import React from 'react';

// function Loading() {
//     return (
//         <div className='min-h-screen'>
//             <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
//                 <button className="btn bg-white">
//                     <span className="loading loading-spinner"></span>
//                     Loading...
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Loading;

import React from 'react';

function Loading() {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="flex flex-col items-center">
                <p className="text-lg mb-4 text-gray-500">Loading...</p>
                <div className="w-[300px] md:w-[500px] h-3 bg-gray-300 rounded-full">
                    <div className="h-full bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;