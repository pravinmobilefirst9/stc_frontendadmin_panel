// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  //   title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      // icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "sample-page",
      title: "User list",
      type: "item",
      url: "/dashboard/user-list",
      // icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
