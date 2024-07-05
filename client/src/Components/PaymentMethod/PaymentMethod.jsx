import omt from "../../../public/omtt.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function PaymentMethod() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  return (
    <div id="payment" className="mt-5">
      {" "}
      <div className="main-title flex flex-wrap justify-center align-middle">
        <h2 className=" font-serif mb-3 text-3xl font-bold">
          Payment <span className="checknoww pt-5 "> Method</span>
        </h2>
      </div>{" "}
      <div
        className="flex flex-col shadow-xl mb-7 mt-5 p-4 w-fit mx-auto"
        data-aos="fade-right"
      >
        {" "}
        <div>
          <p className="text-center italic mx-auto text-lg pt-3 mb-7 border-dotted border-b-[2px] w-fit">
            You have to Pay by OMT to the Number <b>+961 78653981</b>
          </p>
        </div>
        <div className="flex justify-center sm:flex-nowrap flex-wrap align-middle gap-[50px] mb-6 mt-4">
          {" "}
          <div>
            <img src={omt} alt="" className="rounded-md" />
          </div>
          <div className="flex flex-col border-[2px] p-3 w-fit shadow-lg">
            <p> Don't Know What to Say? Here is an Example</p>
            <input
              type="text"
              disabled
              className="p-2 border-[1px] text-gray-800 mt-2 border-black  mx-auto   w-[150px] sm:w-[300px] rounded-lg"
              placeholder="First, Our Website Name(Lebanon Paradise Tours)"
            />
            <input
              type="text"
              disabled
              placeholder=" Second, Trip Name.. ex(Adventure)"
              className="p-2 border-[1px] text-gray-800 mt-2  mx-auto  w-[150px] sm:w-[300px] border-black  rounded-lg"
            />
            <input
              type="text"
              disabled
              placeholder=" Last, Transfer them to Number Above"
              className="p-2 border-[1px] text-gray-800 mt-2 border-black  mx-auto  w-[150px] sm:w-[300px] rounded-lg"
            />
          </div>
        </div>
        <p className="flex font-bold justify-center text-md">
          Feel free to Ask any Question! Our Contact Information is Down Below
        </p>
      </div>
    </div>
  );
}

export default PaymentMethod;
