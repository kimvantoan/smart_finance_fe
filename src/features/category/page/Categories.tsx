import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { categoriesQueryOptions } from "../api/category.query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import CategoryItem from "../components/CategoryItem";

const Categories = () => {
  const { t } = useTranslation("category");
  const { t: m } = useTranslation("common");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const { data } = useSuspenseQuery(
    categoriesQueryOptions({ type })
  );
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <TypographyH1 text={m("common.category")} />
        <Button
          size={"icon-lg"}
          className="rounded-full"
          onClick={() =>
            navigate({
              to: "/category/add",
            })
          }
        >
          <Plus />
        </Button>
      </div>
      <Tabs defaultValue="expense" className="w-full mt-4">
        <TabsList className="w-full">
          <TabsTrigger onClick={() => setType("EXPENSE")} value="expense">
            {t("category.expense")}
          </TabsTrigger>
          <TabsTrigger onClick={() => setType("INCOME")} value="income">
            {t("category.income")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          {data.dataList?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </TabsContent>
        <TabsContent value="expense">
          {data.dataList?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Categories;
