// src/app/(auth)/signup/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 z-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Intaj</h1>
          <p className="mt-2 text-xl text-blue-100">
            Create your account
          </p>
        </div>

        <Card className="border-blue-100 shadow-xl bg-white/95 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-700">Sign Up</CardTitle>
            <CardDescription className="text-blue-600">
              Join Intaj to create your own AI assistants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <p className="text-sm text-blue-100">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-white hover:text-blue-200 transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )};
