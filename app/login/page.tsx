import LoginForm from "@/app/ui/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <header className="flex flex-col md:flex-row items-start h-screen p-4">
        <Image src="/logo/login-logo.png" alt="logo" width={100} height={100} />
        <main className="flex items-center mx-auto justify-center h-screen">
          <div className="relative md:-translate-x-[50px] border-2 border-primary-600 rounded-3xl items-center justify-center flex w-full sm:w-[500px] flex-col space-y-2.5 p-4">
            <LoginForm />
          </div>
        </main>
      </header>
    </>
  );
}
