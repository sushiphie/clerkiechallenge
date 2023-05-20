import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto bg-white text-black">
      <div className="shadow-md px-[40px] py-[29px] justify-start">
        <p className="text-[18px] font-bold">Home</p>
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-2">
        <p className="text-[26px] font-semibold">
          Welcome to the Clerkie Challenge!
        </p>
      </div>
    </div>
  );
}
