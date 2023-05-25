"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import FilterModal from "../components/FilterModal";
import Badge from "../components/FriendBadge";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Loading from "./loading";

// define the type of the filter data
type FilterData = {
  closeFriends: boolean;
  superCloseFriends: boolean;
};

// checking number of true values avoids issues with undefined values
const countTrueValues = (filterState: {
  closeFriends: boolean;
  superCloseFriends: boolean;
}) => {
  if (filterState.closeFriends && filterState.superCloseFriends) {
    return 2;
  } else if (filterState.closeFriends || filterState.superCloseFriends) {
    return 1;
  } else {
    return 0;
  }
};

export default function Friends() {
  const [data, setData] = useState([]);
  const [filterState, setFilterState] = useState<any | boolean[]>([
    false,
    false,
  ]);

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setDisplayModal(!displayModal); // toggle the 'show' state value
    setIsClicked(!isClicked);
  };

  const handleFilterData = (data: FilterData) => {
    // console.log(data);
    if (data.closeFriends !== null && data.superCloseFriends !== null) {
      setFilterState(data); // update the state when the callback function is invoked
    }
    setDisplayModal(!displayModal);
    setIsClicked(!isClicked);
  };

  const handleClear = () => {
    setFilterState([false, false]);
  };

  const handleCancel = () => {
    setDisplayModal(!displayModal);
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    // Fetching Data
    setLoading(true);
    const fetchDataWithDelay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      axios
        .get("http://localhost:5000/users")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    };

    fetchDataWithDelay();
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-white text-black">
      <div className="shadow-md px-[40px] py-[29px] justify-start">
        <p className="text-[18px] font-bold">Friends</p>
      </div>

      {/* if no filter applied */}
      {!filterState.closeFriends && !filterState.superCloseFriends && (
        <div className="flex flex-row pl-[311px]">
          {/* Filter Button */}
          <div className="relative flex flex-col w-[59px] h-[42px] px-[20px] py-[8px]">
            <TbAdjustmentsHorizontal
              onClick={handleClick}
              className={`w-[36px] h-[36px] border rounded-2xl shadow ${
                isClicked
                  ? "text-white bg-filter-grey"
                  : "text-filter-grey border-details-grey"
              }`}
            />
          </div>
          &nbsp;&nbsp;
          <button
            onClick={handleClear}
            className="text-[14px] font-semibold text-border-grey"
          >
            | &nbsp;Clear all
          </button>
        </div>
      )}

      {/* if more than 1 filter applied */}
      {(filterState.closeFriends || filterState.superCloseFriends) && (
        <div className="flex flex-row pl-[311px]">
          {/* Filter Button */}
          <div className="flex flex-row border rounded-2xl shadow text-white bg-filter-grey">
            <TbAdjustmentsHorizontal
              onClick={handleClick}
              className="w-[36px] h-[36px]"
            />
            {countTrueValues(filterState)}
          </div>
          &nbsp;&nbsp;
          <button
            onClick={handleClear}
            className="text-[14px] font-semibold text-icon-blue"
          >
            | &nbsp;Clear all
          </button>
        </div>
      )}

      <div className="flex flex-col px-[20px] pl-[311px]">
        {displayModal && (
          <FilterModal
            onFormSubmit={handleFilterData}
            onCancelFilter={handleCancel}
            initialValues={filterState}
          />
        )}
      </div>

      {loading && <Loading />}
      <div className="flex flex-col items-center justify-center mt-[20px] px-2">
        {!loading &&
          data &&
          data
            .filter((item) => {
              return (
                (item["state"] === "close" &&
                  filterState &&
                  filterState.closeFriends) ||
                (item["state"] === "superclose" &&
                  filterState &&
                  filterState.superCloseFriends) ||
                (filterState &&
                  !filterState.closeFriends &&
                  !filterState.superCloseFriends)
              );
            })
            .map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-center px-[30px] border border-border-grey rounded shadow mb-[15px] w-[1050px] h-[114px]"
              >
                <div className="flex flex-row space-x-1">
                  <p className="text-[16px] font-bold">{item["name"]}</p>
                  {item["state"] === "superclose" && (
                    <Badge
                      label="Super Close Friends"
                      textColorClass="text-positive"
                      bgColorClass="bg-positive-light"
                    />
                  )}
                  {item["state"] === "close" && (
                    <Badge
                      label="Close Friends"
                      textColorClass="text-theme"
                      bgColorClass="bg-theme-light"
                    />
                  )}
                </div>

                <div className="text-[14px] font-medium text-details-grey flex flex-row space-x-1">
                  <p>{item["email"]}</p>
                  <BsDot className="h-[20px] w-[20px]" />
                  <p>{item["phone"]}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
