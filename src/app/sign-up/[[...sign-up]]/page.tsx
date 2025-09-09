
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 animate-gradient">
      {/* Animated circles */}
      <div className="absolute w-80 h-80 bg-white opacity-20 rounded-full blur-3xl top-20 right-20 animate-spin"></div>
      <div className="absolute w-96 h-96 bg-black opacity-10 rounded-full blur-3xl bottom-20 left-20 animate-bounce"></div>

      {/* Clerk Sign-up card */}
      <div className="z-10 bg-white/80 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}