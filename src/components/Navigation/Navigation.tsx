import { Navbar, Switch, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { routes } from "./routes";

type Props = {};

const Navigation = (props: Props) => {
  const { pathname } = useLocation();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <div>
      <Navbar variant="floating" isCompact={false} maxWidth="fluid">
      <Navbar.Brand>
          
        </Navbar.Brand>
        <Navbar.Content>
          {routes.map(({ name, path }) => (
            <Navbar.Link href={path} isActive={pathname === path}>
              <Link to={path}>
                { name}
              </Link>
            </Navbar.Link>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Switch
              checked={isDark}
              onChange={(e: any) =>
                setTheme(e.target.checked ? "dark" : "light")
              }
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </div>
  );
};

export { Navigation };
