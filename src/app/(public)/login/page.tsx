"use client";

import LoginForm from "@/components/form/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        {/* <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center">
            Dont have an account?{" "}
            <a
              href="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Register
            </a>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
