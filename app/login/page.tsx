import LoginForm from "@/app/ui/login-signup-component/login-form";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/"); //might be version error also error after callback
  //   return <p>error</p>;
  // }

  return (
    <div className="flex justify-center p-10 items-center align-middle   h-screen relative ">
      <Image
        src="/logo/login-logo.png"
        alt="logo"
        width={50}
        height={50}
        style={{ minBlockSize: "50px" }}
        className="absolute top-5 left-5"
      />
      <div className="relative md:-translate-x-[50px] border-2 border-primary-600 rounded-3xl items-center justify-center flex w-full sm:w-[500px] flex-col  p-6">
        <h1 className="text-2xl font-bold text-gray-700 ">Log In to HeyJob</h1>
        <LoginForm />
        <div className="flex justify-center  w-full items-center mt-20">
          <div className="before-line"></div>
          <p className="text-gray-500 text-center text-sm ">
            Don&apos;t have an account?{" "}
          </p>
          <div className="after-line"></div>
        </div>
        <Link
          href="/signup"
          className="w-2/3 bg-white  justify-center border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-gray-50 mt-5 text-center p-2"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
