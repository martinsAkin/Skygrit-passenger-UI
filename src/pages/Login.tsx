/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/arikLogo.svg"
import DatePickerField from "../components/DatePicker/DatepickerField";
// import { loginAdmin } from "../api/adminService";

const Login = () => {
 const [pnr, setPnr] = useState("");
 const [lastname, setLastname] = useState("");
 const [bookingDate, setBookingDate] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);
 const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!pnr) {
   alert("PNR is required");
   console.error("PNR is required");
   return;
  }

  setIsSubmitting(true);
  try {
//    await loginAdmin({ email, password });
   console.log("Login Successful!");
   alert("Login Successful");
   navigate("/dashboard");
  } catch (error: any) {
   setIsSubmitting(false);
   alert("Invalid Credentials, check your details and try again!");
   console.error("Login failed:", error.response?.data || error.message);
  }
 };
 return (
  <div className="flex justify-center items-center h-screen relative">
   <div className="px-4 pt-10 max-w-150 w-full h-max flex flex-col gap-6 ml-12">
     <img src={logo} alt="logo" className="w-50 h-20 mx-auto" />
     
     <div className="flex flex-col gap-1 items-center">
         <span className="text-[32px] font-bold text-[#303030]">Post-Booking Management Portal</span>
         <span className="text-[16px] text-[#303030] text-center mt-0">Access your booking information.</span>
     </div>
    <form action="#" className="flex flex-col gap-4" onSubmit={handleLogin}>
     
     
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="pnr" className="text-[16px] text-[#303030]">
      Passenger Name Record (PNR) *
      </label>
      <input
       id="pnr"
       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12 cursor-pointer"
       type="text"
       name="pnr"
       value={pnr}
       placeholder="Enter PNR"
       required
       onChange={(e) => setPnr(e.target.value)}
      />
     </div>

     <div className="flex flex-col gap-2 w-full">
      <label htmlFor="lastname" className="text-[16px] text-[#303030]">
      Last Name *
      </label>
      <input
       id="lastname"
       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12 cursor-pointer"
       type="text"
       name="lastname"
       value={lastname}
       placeholder="Enter last name"
       required
       onChange={(e) => setLastname(e.target.value)}
      />
     </div>

     <div className="flex flex-col gap-2 w-full">
      <label htmlFor="password" className="text-[16px] text-[#303030]">
      Booking Date (Optional)
      </label>
      <DatePickerField 
        id="bookingDate"
        value={bookingDate}
        onChange={setBookingDate}
        placeholder="Select booking date"
        maxDate={new Date()}
      />
     </div>

      <button
       type="submit"
       disabled={isSubmitting}
       className="w-full px-3 h-10 bg-[#0D47A1] rounded-xl text-white text-[14px] font-medium hover:bg-[#1565C0] transition"
      >
       {isSubmitting ? "Validating Info..." : "Access Booking"}
      </button>

      <p className="text-[14px] text-[#303030] text-center">
        Need help? Contact our support team
      </p>

      <footer className="absolute bottom-5 right-0 left-0">
        <div className="text-[#3D3D3D] opacity-50 text-sm text-center flex flex-col items-center gap-1">
            <span>You acknowledge that you read, and agree to our</span>
            <ol className="flex gap-2">
                <li>Terms of Service</li>
                <li> and our </li>
                <li>Privacy Policy</li>
            </ol>
        </div>
      </footer>

    </form>

   </div>

  </div>
 );
};

export default Login;