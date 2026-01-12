import { TypographyH2 } from "@/shared/components/common/TypographyH2";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
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

const CategoryAdd = () => {
  const { t } = useTranslation("category");
  const { t: m } = useTranslation("common");
  const mutation = useCreateCategory();

  const defaultValues: CategoryPayload = {
    name: "",
    type: "EXPENSE",
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
      <div className="flex justify-between">
        <Link to="..">{m("common.cancel")}</Link>
        <TypographyH2 text={t("category.add_category")} />
        <p></p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>{t("category.category_name")}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      required
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
            name="type"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.setValue(value as "INCOME" | "EXPENSE")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="INCOME">
                          {t("category.income")}
                        </SelectItem>
                        <SelectItem value="EXPENSE">
                          {t("category.expense")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                  <FieldLabel>Status</FieldLabel>
                  <Switch
                    onChange={(checked) =>
                      field.setValue(checked ? "ACTIVE" : "INACTIVE")
                    }
                  />
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
                  <FieldLabel>{t("category.select_icon")}</FieldLabel>
                  <ToggleGroup className="flex-wrap" type="single">
                    {ICON_KEYS.map((iconKey) => (
                      <ToggleGroupItem
                        key={iconKey}
                        value={iconKey}
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
          <Button type="submit">{t("category.save_category")}</Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CategoryAdd;
