import {
  faArrowDown,
  faArrowDownWideShort,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FilterMenu(props) {
  const [showList, setShowList] = React.useState(false);
  const { options, selected, onSelect } = props; //getting info
  function selectOption(value) {
    setShowList(false);
    onSelect(value);
  }

  return (
    <div
      className="flex flex-col relative justify-center rounded-md items-center pl-5 ml-5"
      props={props}
    >
      {" "}
      <button
        className="shadow-lg border-[1px] rounded-md p-2  mt-8 font-bold"
        onClick={() => setShowList(!showList)}
      >
        {!!selected ? (
          <>
            {selected}{" "}
            <FontAwesomeIcon icon={faClose} onClick={() => selectOption("")} />
          </> //bs 23moll click btbyn hayde w b3abi values al onSelect w List Bt5tfi okito
        ) : (
          //hun hyde btbyn by default l2n btkun false already
          <>
            Filter{" "}
            <FontAwesomeIcon className="px-1" icon={faArrowDownWideShort} />
          </>
        )}
      </button>
      {showList && (
        <div className="flex rounded-md flex-col absolute  top-[110%]">
          {options.map(({ label, value }) => (
            <button
              key={value}
              className="border-[1px] p-2 hover:bg-gray-200 bg-white z-10 shadow-md"
              onClick={() => selectOption(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
