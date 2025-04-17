// src/components/auth/SignOut.tsx
'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/signIn');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
      Sign Out
    </button>
  );
};

export default SignOut;