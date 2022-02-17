import { unsortedIndustries } from "@/shared/industries";

export const localizedIndustries = (lang: "fi" | "en") => {
  return unsortedIndustries.map((i) => {
    return {
      ...i,
      id: i.code,
      name: i.names[lang],
      children: i.subIndustries.map((s) => {
        return { ...s, id: s.code, name: s.names[lang] + " (" + s.code + ")" };
      }),
    };
  });
};
