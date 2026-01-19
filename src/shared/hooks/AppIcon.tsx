/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from "lucide-react";
import type { IconKey } from "../types/IconKey";
import { ICON_STYLE } from "../constants/IconStyle";

export function AppIcon({
  name,
  className,
  ...props
}: {
  name: IconKey;
  className?: string;
}) {
  const Icon = (Icons as any)[toPascalCase(name)];
  const style = ICON_STYLE[name];
  return Icon ? (
    <div className={`flex items-center justify-center ${style.bg} p-2 w-fit rounded-2xl`}>
      <Icon
        className={`${className} ${style.color} size-6`}
        {...props}
      />
    </div>
  ) : null;
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
}
