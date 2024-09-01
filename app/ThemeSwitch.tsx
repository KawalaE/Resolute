import { Switch } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Switch />;
  if (mounted) {
    return (
      <Switch
        checked={resolvedTheme === "dark"}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
    );
  }
};

export default ThemeSwitch;
