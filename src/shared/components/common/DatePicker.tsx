"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import "react-day-picker/dist/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

export function DatePicker({
  date,
  setDate,
}: {
  date: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {t("common.date")}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={(date && new Date(date)) || undefined}
            captionLayout="dropdown"
            onSelect={(d) => {
              if (!d) return;
              setDate(format(d, "yyyy-MM-dd"));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
