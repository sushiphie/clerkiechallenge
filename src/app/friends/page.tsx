"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import FilterModal from "../components/FilterModal";
import Badge from "../components/FriendBadge";
import Loading from "./loading";
import Filter from "filter.svg";

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

      <div className="flex justify-center">
        <div className="flex flex-col items-start justify-center mt-[46px]">
          {/* Filter Button */}

          {/* if no filter applied */}
          {!filterState.closeFriends && !filterState.superCloseFriends && (
            <div className="flex flex-row">
              <div
                className={`border px-5 py-2 inline-flex items-center justify-center rounded-3xl shadow ${
                  isClicked ? "bg-filter-grey" : "border-details-grey"
                }`}
              >
                {/* change variation of logo as unable to change colour in svg while using Image */}
                {!isClicked && (
                  <Image
                    src="filter.svg"
                    alt="filter"
                    height={19}
                    width={20}
                    onClick={handleClick}
                  />
                )}
                {isClicked && (
                  <Image
                    src="filterdarkbg.svg"
                    alt="filterdarkbg"
                    height={19}
                    width={20}
                    onClick={handleClick}
                  />
                )}
              </div>
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={handleClear}
                className="text-[14px] font-semibold text-border-grey border-l border-border-grey"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Clear all
              </button>
            </div>
          )}

          {/* if more than 1 filter applied */}
          {(filterState.closeFriends || filterState.superCloseFriends) && (
            <div className="flex flex-row">
              {/* Filter Button */}
              <div className="border px-5 py-2 inline-flex items-center justify-center rounded-3xl shadow text-white bg-filter-grey">
                <Image
                  src="filterdarkbg.svg"
                  alt="filterdarkbg"
                  height={19}
                  width={20}
                  onClick={handleClick}
                />
                &nbsp;&nbsp;{countTrueValues(filterState)}
              </div>
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={handleClear}
                className="text-[14px] font-semibold text-icon-blue border-l border-border-grey"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Clear all
              </button>
            </div>
          )}

          <div className="flex flex-col mt-[10px]">
            {displayModal && (
              <FilterModal
                onFormSubmit={handleFilterData}
                onCancelFilter={handleCancel}
                initialValues={filterState}
              />
            )}
          </div>

          {/* Actual Records */}
          {loading && <Loading />}
          <div className="flex flex-col items-center justify-center mt-[20px]">
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
                    <div className="flex flex-row space-x-1 mb-[12px]">
                      <p className="text-[16px] font-bold">{item["name"]}</p>
                      &nbsp;
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
      </div>
    </div>
  );
}
