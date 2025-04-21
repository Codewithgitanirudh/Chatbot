"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { GoogleIcon, GithubIcon, FacebookIcon  } from "@/components/icons";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSignIn = pathname === "/signIn";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error) {
      setError(`Failed to ${isSignIn ? "sign in" : "sign up"}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: GoogleAuthProvider | GithubAuthProvider | FacebookAuthProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      setError(`Failed to sign in. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to Chatbot
          </h1>
          <p className="mt-2 text-gray-600">
            {isSignIn ? "Sign in to continue" : "Create an account to get started"}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
              required
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
              required
            />
          </div>
          {isSignIn && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-500 float-right"
            >
              Forgot Password?
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            <GoogleIcon className="mr-2" />
            <span>Continue with Google</span>
          </button>
          <button
            onClick={() => handleSocialSignIn(new GithubAuthProvider())}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            <GithubIcon className="mr-2" />
            <span>Continue with Github</span>
          </button>
          <button
            onClick={() => handleSocialSignIn(new FacebookAuthProvider())}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            <FacebookIcon className="h-5 w-5 mr-2" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          {isSignIn ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signUp")}
                className="font-medium cursor-pointer text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signIn")}
                className="font-medium cursor-pointer text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;