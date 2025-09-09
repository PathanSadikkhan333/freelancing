

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient">
      {/* Animated circles */}
      <div className="absolute w-72 h-72 bg-white opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-black opacity-10 rounded-full blur-3xl bottom-10 right-10 animate-bounce"></div>

      {/* Clerk Sign-in card */}
      <div className="z-10 bg-white/80 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}