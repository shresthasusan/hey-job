import LoginForm from "@/app/ui/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <header className="flex items-start  pl-5 pt-2">
        <Image src="/logo/login-logo.png" alt="logo" width={100} height={100} />
      </header>
      <main className="flex items-center -translate-y-10 justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
