import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Switch } from "@/shared/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AppIcon } from "@/shared/hooks/AppIcon";
import { ICON_KEYS } from "@/shared/constants/IconKey";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import { Button } from "@/shared/components/ui/button";
import {
  useDeleteCategory,
  useUpdateCategories,
} from "../api/category.mutation";
import { formSchema, type CategoryPayload } from "../type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "@/routes/(app)/category/$id.edit";
import { categoryQueryOptions } from "../api/category.query";
import { useEffect, useState } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { TypographyMuted } from "@/shared/components/common/TypographyMuted";

const CategoryEdit = () => {
  const { id } = Route.useLoaderData();
  const { t } = useTranslation("category");
  const { t: m } = useTranslation("common");
  const mutation = useUpdateCategories();
  const mutationDelete = useDeleteCategory();
  const { data: category } = useSuspenseQuery(categoryQueryOptions(id)).data;
  const [type, setType] = useState<"INCOME" | "EXPENSE">(category?.type ?? "EXPENSE");

  const defaultValues: CategoryPayload = {
    name: "",
    type,
    iconKey: "",
    status: "ACTIVE",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ categoryId: id, categoryData: value });
    },
  });
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        type: category.type,
        iconKey: category.iconKey,
        status: category.status,
      });
    }
  }, [category, form]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/category">
          <ChevronLeft />
        </Link>
        <b>{m("common.edit")}</b>
        <Button
          size={"icon-lg"}
          className="text-destructive"
          onClick={() => mutationDelete.mutate(id)}
          variant={"ghost"}
        >
          <Trash2 />
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <Tabs defaultValue={type} className="w-full mt-4">
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
          <form.Field
            name="name"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>
                    {t("category.category_name").toUpperCase()}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      value={field.state.value}
                      required
                      className="bg-gray-50"
                      placeholder={t("category.exemple_name")}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                    />
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />

          <form.Field
            name="iconKey"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>
                    {t("category.select_icon").toUpperCase()}
                  </FieldLabel>
                  <ToggleGroup value={field.state.value} className="flex-wrap gap-3" type="single">
                    {ICON_KEYS.map((iconKey) => (
                      <ToggleGroupItem
                        key={iconKey}
                        value={iconKey}
                        className="
                        flex items-center justify-center size-10
                        transition-colors

                        data-[state=on]:bg-primary 
                        data-[state=on]:border-primary
                      "
                        aria-label={`Toggle ${iconKey}`}
                        onClick={() => field.handleChange(iconKey)}
                      >
                        <AppIcon name={iconKey} />
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <form.Field
            name="status"
            children={(field) => {
              return (
                <Field>
                  <div className="flex items-center justify-between border p-3 rounded-xl bg-gray-50">
                    <div>
                      <b>{t("category.status_active")}</b>
                      <TypographyMuted text={t("category.display_create")} />
                    </div>
                    <Switch
                      checked={field.state.value === "ACTIVE"}
                      onCheckedChange={(checked) =>
                        field.setValue(checked ? "ACTIVE" : "INACTIVE")
                      }
                    />
                  </div>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <Button type="submit">{t("category.save_category")}</Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CategoryEdit;
