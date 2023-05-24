import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

// define the type of the filter data
type FilterData = {
  closeFriends: boolean;
  superCloseFriends: boolean;
};

// define the type of the props
type FilterComponentProps = {
  onFormSubmit: (data: FilterData) => void;
  onCancelFilter: () => void;
};

const FilterModal: React.FC<FilterComponentProps> = ({ onFormSubmit, onCancelFilter }) => {
  const [closeFriends, setCloseFriends] = useState(false);
  const [superCloseFriends, setSuperCloseFriends] = useState(false);

  const handleCloseChange = () => {
    setCloseFriends(!closeFriends);
  };

  const handleSuperChange = () => {
    setSuperCloseFriends(!superCloseFriends);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit({ closeFriends, superCloseFriends });
  };

  const handleClear = () => {
    setCloseFriends(false);
    setSuperCloseFriends(false);
  };

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    onCancelFilter();
  };

  return (
    <div className="absolute flex justify-center items-center">
      {showModal && (
        <div className="w-[320px] flex flex-col bg-white rounded shadow">
          <div className="flex justify-between p-[20px]">
            <button
              onClick={handleClear}
              className={`text-[14px] font-semibold ${closeFriends || superCloseFriends ? "text-icon-blue" : "text-border-grey"}`}
            >
              Clear all
            </button>
            <p className="text-[16px] font-semibold place-content-center text-filter-grey">
              Filter
            </p>
            <button onClick={closeModal}>
              <RxCross2 className="w-[17px] h-[17px] text-filter-grey font-bold" />
            </button>
          </div>
          <hr />
          <div className="flex flex-col p-[20px]">
            <p className="text-[14px] font-medium place-content-center text-filter-grey-2">
              Friend Status
            </p>
            <form>
              <label className="flex justify-between">
                <p className="text-[16px] font-semibold place-content-center text-filter-grey pt-[20px]">
                  Close Friends
                </p>
                <input
                  type="checkbox"
                  value="Close Friends"
                  checked={closeFriends}
                  onChange={handleCloseChange}
                />
              </label>

              <label className="flex justify-between">
                <p className="text-[16px] font-semibold place-content-center text-filter-grey py-[20px]">
                  Super Close Friends
                </p>
                <input
                  type="checkbox"
                  value="Super Close Friends"
                  checked={superCloseFriends}
                  onChange={handleSuperChange}
                />
              </label>

              <button
                onClick={handleFilter}
                className="bg-filter-grey text-white font-semibold px-[120px] py-[11px] rounded-md"
                type="submit"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
