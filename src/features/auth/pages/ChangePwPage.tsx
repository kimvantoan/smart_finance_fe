import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useChangePasswordMutation } from "../api/auth.mutation";
import { Spinner } from "@/shared/components/ui/spinner";

const ChangePwPage = () => {
  const { t } = useTranslation("auth");
  const mutation = useChangePasswordMutation();
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [seeConfirmNewPassword, setSeeConfirmNewPassword] = useState(false);
  const formSchema = {
    oldPassword: z.string().min(5, t("auth.password_min_length", { min: 5 })),
    newPassword: z.string().min(5, t("auth.password_min_length", { min: 5 })),
    confirmNewPassword: z
      .string()
      .min(5, t("auth.password_min_length", { min: 5 })),
  };
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onSubmit: z.object(formSchema),
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
        <b>{t("auth.change_password")}</b>
        <p></p>
      </div>
      <form
        className="border rounded-xl p-4 mt-4"
        onSubmit={(e) => {
          form.handleSubmit();
          e.preventDefault();
        }}
      >
        <FieldGroup>
          <form.Field
            name="oldPassword"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>{t("auth.password")}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="*****"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      type={seeOldPassword ? "text" : "password"}
                    />
                    <InputGroupAddon
                      align="inline-end"
                      onClick={() => setSeeOldPassword(!seeOldPassword)}
                    >
                      {seeOldPassword ? <Eye /> : <EyeOff />}
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <form.Field
            name="newPassword"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>{t("auth.new_password")}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="*****"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      type={seeNewPassword ? "text" : "password"}
                    />
                    <InputGroupAddon
                      align="inline-end"
                      onClick={() => setSeeNewPassword(!seeNewPassword)}
                    >
                      {seeNewPassword ? <Eye /> : <EyeOff />}
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <form.Field
            name="confirmNewPassword"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>{t("auth.confirm_new_password")}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="*****"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      type={seeConfirmNewPassword ? "text" : "password"}
                    />
                    <InputGroupAddon
                      align="inline-end"
                      onClick={() =>
                        setSeeConfirmNewPassword(!seeConfirmNewPassword)
                      }
                    >
                      {seeConfirmNewPassword ? <Eye /> : <EyeOff />}
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          />
          <Field>
            <Button type="submit">
              {mutation.isPending ? <Spinner /> : ""}
              {t("auth.change_password")}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ChangePwPage;
