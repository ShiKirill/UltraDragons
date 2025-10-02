import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // TODO: get locale from headers/cookies/localStorage
  const locale = "en";

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
