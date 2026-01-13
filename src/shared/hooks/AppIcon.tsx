/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from "lucide-react";
import type { IconKey } from "../types/IconKey";

export function AppIcon({ name, className, ...props }: { name: IconKey, className?: string}) {
  const Icon = (Icons as any)[toPascalCase(name)];
  return Icon ? <Icon className={className} {...props} /> : null;
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, m => m.replace("-", "").toUpperCase());
}
