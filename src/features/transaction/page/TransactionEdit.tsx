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
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { DatePicker } from "@/shared/components/common/DatePicker";
import { Button } from "@/shared/components/ui/button";
import {
  useDeleteTransaction,
  useUpdateTransaction,
} from "../api/transaction.mutation";
import { transactionDetailQueryOptions } from "../api/transaction.query";
import { Route } from "@/routes/(app)/transaction/$id.edit";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, Trash2 } from "lucide-react";
import { formatNumber } from "@/shared/utils/formatNumber";
const TransactionEdit = () => {
  const { id } = Route.useLoaderData();
  const { t } = useTranslation("transaction");
  const { t: m } = useTranslation("common");
  const mutation = useUpdateTransaction();
  const mutationDelete = useDeleteTransaction();
  const { data: transaction } = useSuspenseQuery(
    transactionDetailQueryOptions(id)
  ).data;
  const [type, setType] = useState<"EXPENSE" | "INCOME">(
    transaction?.type ?? "EXPENSE"
  );
  const { data: categories } = useCategoriesQuery({ status: "ACTIVE", type });
  const [date, setDate] = useState<string>(transaction?.transactionDate ?? "");

  const defaultValues: TransactionPayload = {
    categoryId: transaction?.categoryId ?? 0,
    amount: transaction?.amount ?? 0,
    type,
    note: "",
    transactionDate: transaction?.transactionDate ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ id, data: value });
    },
  });
  useEffect(() => {
    if (transaction) {
      form.reset({
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        type: transaction.type,
        note: transaction.note,
        transactionDate: date,
      });
    }
  }, [transaction, form, date]);

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/transaction">
          <ChevronLeft />
        </Link>
        <b>{m("common.edit")}</b>
        <Button
          variant={"ghost"}
          className="text-destructive"
          onClick={() => mutationDelete.mutate(id)}
        >
          <Trash2 />
        </Button>
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
                  <ToggleGroup
                    value={field.state.value.toString()}
                    className="grid grid-cols-3 gap-2"
                    type="single"
                  >
                    {categories?.dataList?.map((category) => (
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
                      value={field.state.value}
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

export default TransactionEdit;
