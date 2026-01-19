import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/shared/components/ui/input-group";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { TypographyP } from "@/shared/components/common/TypographyP";
import { Link } from "@tanstack/react-router";
import { useSignupMutation } from "../api/auth.mutation";
import { Spinner } from "@/shared/components/ui/spinner";

const SignUpPage = () => {
  const { t } = useTranslation("auth");
  const mutation = useSignupMutation();
  const [seePassword, setSeePassword] = useState(false);

  const formSchema = z.object({
    username: z.string(),
    email: z.email(t("auth.email_format")),
    password: z
      .string()
      .trim()
      .min(5, t("auth.password_min_length", { min: 5 })),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="username"
          children={(field) => {
            return (
              <Field>
                <FieldLabel>{t("auth.username")}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    required
                    placeholder="username123"
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    required
                    placeholder="user@example.com"
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return (
              <Field>
                <FieldLabel>{t("auth.password")}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    placeholder="*****"
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    type={seePassword ? "text" : "password"}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    {seePassword ? <Eye /> : <EyeOff />}
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        />
        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          {t("auth.signup")}
        </Button>
        <div className="flex items-center justify-center gap-1">
          <TypographyP text={t("auth.have_account")} />
          <Link className="text-blue-500" to={"/login"}>
            {t("auth.login")}
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
};

export default SignUpPage;
