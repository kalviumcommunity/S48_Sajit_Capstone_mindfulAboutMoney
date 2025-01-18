import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export const Auth = () => {
  return (
    <div className='sign-in-container flex flex-col items-center justify-center space-y-4 p-8'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Welcome to Mindful Money</h2>
        <p className='mb-6'>Please sign in or create an account to continue</p>

        <div className='space-x-4'>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </div>
      </div>
    </div>
  );
};
