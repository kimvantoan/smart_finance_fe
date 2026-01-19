import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import {  useCategoriesQuery } from "../api/category.query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

const Categories = () => {
  const { t } = useTranslation("category");
  const { t: m } = useTranslation("common");
  const navigate = useNavigate();
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const { data, isLoading } = useCategoriesQuery({ type });
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
          <TabsTrigger
            className="text-destructive"
            onClick={() => setType("EXPENSE")}
            value="expense"
          >
            {t("category.expense")}
          </TabsTrigger>
          <TabsTrigger
            className="text-primary"
            onClick={() => setType("INCOME")}
            value="income"
          >
            {t("category.income")}
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-190px)]">
          <TabsContent value="income" className="space-y-3">
            {data?.dataList?.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </TabsContent>
          <TabsContent value="expense" className="space-y-3">
            {data?.dataList?.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default Categories;
