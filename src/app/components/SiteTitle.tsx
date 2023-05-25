import React from "react";
import Image from "next/image";

function SiteTitle() {
  return (
    <div className="sideRow pl-[25px] py-[29px]">
      <Image src="logo.svg" alt="logo" height={20} width={20} />
      <p className="font-semibold">Clerkie Challenge</p>
    </div>
  );
}

export default SiteTitle;
