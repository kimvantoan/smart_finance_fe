import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { formSchema, type TransactionPayload } from "../type";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { ToggleGroupItem } from "@/shared/components/ui/toggle-group";
import { AppIcon } from "@/shared/hooks/AppIcon";
import { useCategoriesQuery } from "@/features/category/api/category.query";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { DatePicker } from "@/shared/components/common/DatePicker";
import { Button } from "@/shared/components/ui/button";
import { useCreateTransaction } from "../api/transaction.mutation";
import { formatNumber } from "@/shared/utils/formatNumber";
import { ChevronLeft } from "lucide-react";
const TransactionAdd = () => {
  const { t } = useTranslation("transaction");
  const { t: m } = useTranslation("common");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const { data } = useCategoriesQuery({ status: "ACTIVE", type });
  const mutation = useCreateTransaction();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const defaultValues: TransactionPayload = {
    categoryId: 0,
    amount: 0,
    type,
    note: "",
    transactionDate: date ,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  return (
    <div>
      <div className="flex justify-between">
        <Link to="..">
          <ChevronLeft />
        </Link>
        <b>{t("transaction.add_transaction")}</b>
        <p></p>
      </div>
      <form
        onSubmit={(e) => {
          form.handleSubmit();
          e.preventDefault();
        }}
      >
        <Tabs defaultValue={type} className="w-full my-4">
          <TabsList className="w-full">
            <TabsTrigger
              className="text-primary"
              onClick={() => {
                setType("INCOME");
                form.setFieldValue("type", "INCOME");
              }}
              value="INCOME"
            >
              {m("common.income")}
            </TabsTrigger>
            <TabsTrigger
              className="text-destructive"
              onClick={() => {
                setType("EXPENSE");
                form.setFieldValue("type", "EXPENSE");
              }}
              value="EXPENSE"
            >
              {m("common.expense")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <FieldGroup>
          <form.Field
            name="amount"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>
                    {t("transaction.amount").toUpperCase()}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      required
                      className="text-xl p-3"
                      type="text"
                      inputMode="numeric"
                      min={1}
                      value={formatNumber(field.state.value)}
                      onChange={(e) => {
                        const input = e.target.value;

                        const raw = input.replace(/[^\d]/g, "");

                        const numberValue = Number(raw);

                        field.handleChange(numberValue);
                      }}
                    />
                    <InputGroupAddon align="inline-end">đ</InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <form.Field
            name="categoryId"
            children={(field) => {
              return (
                <Field>
                  <ToggleGroup className="grid grid-cols-3 gap-2" type="single">
                    {data?.dataList?.map((category) => (
                      <ToggleGroupItem
                        className="
                      flex flex-col items-center justify-center size-fit
                      border border-primary/30 shadow 
                      transition-colors w-full py-1 text-black

                      data-[state=off]:bg-gray-50 
                      data-[state=on]:border-primary
                    "
                        key={category.id}
                        value={category.id.toString()}
                        onClick={() => field.handleChange(category.id)}
                      >
                        <AppIcon className="size-5" name={category.iconKey} />
                        <span className="max-w-full truncate text-xs">
                          {category.name}
                        </span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />

          <DatePicker date={date} setDate={setDate} />
          <form.Field
            name="note"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>{t("transaction.note")}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                    />
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <Button type="submit">{m("common.save")}</Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default TransactionAdd;
