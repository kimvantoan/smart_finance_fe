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
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
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
import { useCreateCategory } from "../api/category.mutation";
import { formSchema, type CategoryPayload } from "../type";
import { useState } from "react";
import { TypographyMuted } from "@/shared/components/common/TypographyMuted";
import {  ChevronLeft } from "lucide-react";

const CategoryAdd = () => {
  const { t } = useTranslation("category");
  const { t: m } = useTranslation("common");
  const mutation = useCreateCategory();
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const defaultValues: CategoryPayload = {
    name: "",
    type,
    iconKey: "wallet",
    status: "ACTIVE",
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
      <div className="flex justify-between items-center">
        <Link to="..">
          <ChevronLeft />
        </Link>
        <b>{m("common.add")}</b>
        <p></p>
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
                  <ToggleGroup className="flex-wrap gap-3" type="single">
                    {ICON_KEYS.map((iconKey) => (
                      <ToggleGroupItem
                        key={iconKey}
                        value={iconKey}
                        className="
                        flex items-center justify-center size-10
                        text-gray-500 border shadow 
                        transition-colors active:scale-90

                        data-[state=on]:bg-primary 
                        data-[state=off]:bg-gray-50 
                        data-[state=on]:text-white
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
                      defaultChecked
                      onChange={(checked) =>
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

export default CategoryAdd;
