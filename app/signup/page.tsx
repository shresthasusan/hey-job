import Image from "next/image";
import Link from "next/link";
import SignupForm from "../ui/login-signup-component/signup-form";

const SignUppage = () => {
  return (
    <div className="flex justify-center p-10 items-center h-screen relative ">
      <Image
        src="/logo/login-logo.png"
        alt="logo"
        width="100"
        height="100"
        className="absolute top-5 left-5"
      />
      <div className="relative md:-translate-x-[50px] border-2 border-primary-600 rounded-3xl items-center justify-center flex w-full sm:w-[500px] flex-col  p-6">
        <h1 className="text-2xl font-bold text-gray-700 ">
          {" "}
          Sign Up to HeyJob
        </h1>
        <SignupForm />
        <div className="flex justify-center  w-full items-center mt-5">
          <div className="before-line"></div>
          <p className="text-gray-500 text-center text-sm ">
            Already have an account?{" "}
          </p>
          <div className="after-line"></div>
        </div>
        <Link
          href="/login"
          className="w-2/3 bg-white  justify-center border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-gray-50 mt-5 text-center p-2"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default SignUppage;
