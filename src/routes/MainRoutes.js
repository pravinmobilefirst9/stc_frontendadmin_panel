import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import UserSetting from "views/user-setting";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/dashboard",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <DashboardDefault />,
    },
    {
      path: "",
      children: [
        {
          path: "",
          element: <DashboardDefault />,
        },
      ],
    },
    // {
    //     path: 'utils',
    //     children: [
    //         {
    //             path: 'util-typography',
    //             element: <UtilsTypography />
    //         }
    //     ]
    // },
    // {
    //     path: 'utils',
    //     children: [
    //         {
    //             path: 'util-color',
    //             element: <UtilsColor />
    //         }
    //     ]
    // },
    // {
    //     path: 'utils',
    //     children: [
    //         {
    //             path: 'util-shadow',
    //             element: <UtilsShadow />
    //         }
    //     ]
    // },
    // {
    //     path: 'icons',
    //     children: [
    //         {
    //             path: 'tabler-icons',
    //             element: <UtilsTablerIcons />
    //         }
    //     ]
    // },
    {
      path: "icons",
      children: [
        {
          path: "material-icons",
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: "user-list",
      element: <SamplePage />,
    },
    {
      path: "user-setting/:userid",
      element: <UserSetting />,
    },
  ],
};

export default MainRoutes;
