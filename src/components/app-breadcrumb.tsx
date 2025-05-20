"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;
          return (
            <span key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-muted-foreground capitalize">
                    {segment}
                  </span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {segment}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
