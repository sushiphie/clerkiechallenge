"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

export default function Friends() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="h-screen overflow-y-auto bg-white text-black">
      <div className="shadow-md px-[40px] py-[29px] justify-start">
        <p className="text-[18px] font-bold">Friends</p>
      </div>

      <div className="flex flex-col items-start justify-center px-[331px] mt-[36px] w-[28px] h-6 border border-border-grey rounded shadow">
        <TbAdjustmentsHorizontal className="w-[26px] h-[26px" />
      </div>

      <div className="flex flex-col items-center justify-center mt-[20px] px-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center px-[30px] border border-border-grey rounded shadow mb-[15px] w-[1050px] h-[114px]"
          >
            <p className="text-[16px] font-bold">{item.name}</p>
            <div className="text-[14px] font-medium text-details-grey flex flex-row space-x-1">
              <p>{item.email}</p>
              <BsDot className="h-[20px] w-[20px]" />
              <p>{item.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
