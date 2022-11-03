import { images } from "./img/config";

import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import useSWR from "swr";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { fetcher } from "./config";

function App() {
   const [search, setSearch] = useState("");
   let [inputValue, setInputValue] = useState("");

   const handleSearch = (e) => {
      setInputValue(e.target.value);
   };

   const handleClick = () => {
      console.log(inputValue);
      setSearch(inputValue);
   };

   const { data, error } = useSWR(`http://ipwho.is/${search}`, fetcher);

   console.log(data);

   function MyMapComponent({ center, zoom }) {
      return (
         <Wrapper
            apiKey={"AIzaSyAq06l5RUVfib62IYRQacLc-KAy0XIWAVs"}
            center={center}
            zoom={zoom}>
            <Status />
         </Wrapper>
      );
   }

   return (
      <div className="App">
         <header className="header w-screen relative">
            <img src={images.background} alt="" className="w-full" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2">
               <h1 className="font-semibold text-3xl text-white text-center mb-8">
                  IP Address Tracker
               </h1>
               <div className="w-[600px] flex">
                  <input
                     type="text"
                     className="py-4 px-6 rounded-tl-2xl rounded-bl-2xl w-full outline-none border-none"
                     placeholder="Search for any IP address or domain"
                     onChange={handleSearch}
                  />
                  <button
                     className="bg-black text-white p-4 rounded-tr-2xl rounded-br-2xl text-2xl"
                     onClick={handleClick}>
                     <IoIosArrowForward />
                  </button>
               </div>
            </div>
            <div className="flex bg-white rounded-2xl shadow-lg absolute -bottom-[65px] left-1/2 -translate-x-1/2">
               <div className="px-8 py-9 max-w-[250px]">
                  <h4 className="uppercase text-[#2C2C2C] font-bold text-xs text-opacity-50 mb-4">
                     IP Address
                  </h4>
                  <p className="font-medium text-2xl text-[#2C2C2C]">
                     {data?.ip}
                  </p>
               </div>
               <div className="px-8 py-9 max-w-[250px]">
                  <h4 className="uppercase text-[#2C2C2C] font-bold text-xs text-opacity-50 mb-4">
                     Location
                  </h4>
                  <p className="font-medium text-2xl text-[#2C2C2C]">
                     {data?.region}
                  </p>
               </div>
               <div className="px-8 py-9 max-w-[250px]">
                  <h4 className="uppercase text-[#2C2C2C] font-bold text-xs text-opacity-50 mb-4">
                     Timezone
                  </h4>
                  <p className="font-medium text-2xl text-[#2C2C2C]">
                     {data?.timezone.utc}
                  </p>
               </div>
               <div className="px-8 py-9 max-w-[250px]">
                  <h4 className="uppercase text-[#2C2C2C] font-bold text-xs text-opacity-50 mb-4">
                     ISP
                  </h4>
                  <p className="font-medium text-2xl text-[#2C2C2C]">
                     {data?.connection.isp}
                  </p>
               </div>
            </div>
         </header>
         <div className="">
            <MyMapComponent
               center={{ lat: `${data?.latitude}`, lng: `${data?.longitude}` }}
               zoom={13}
            />
         </div>
      </div>
   );
}

export default App;
