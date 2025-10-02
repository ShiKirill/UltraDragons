import { useTranslations } from "next-intl";

export const Home = () => {
  const t = useTranslations("HomePage");

  return <div>{t("title")}</div>;
};
