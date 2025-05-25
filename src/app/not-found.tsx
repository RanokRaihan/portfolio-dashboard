import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/not-found.png"
                alt="Page not found illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Oops! Page not found
            </h1>
            <p className="text-muted-foreground text-lg  mb-6">
              {" The page you're looking for is no longer available"}
            </p>
            <div>
              <p className="text-muted-foreground mb-2">
                Here are a few reasons why you might be seeing this page:
              </p>
              <ul className="list-disc text-muted-foreground text-left ml-6  mb-6">
                <li>The link might be broken or outdated</li>
                <li>The page may have been moved or deleted</li>
                <li>You might have typed the URL incorrectly</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="ml-4">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
