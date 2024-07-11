import getSystem from "@/utils/get-system";
import Paper from "@mui/material/Paper";
import { appWindow } from "@tauri-apps/api/window";
import { ReactNode } from "react";
import { LayoutControl } from "../layout/layout-control";
import styles from "./app-container.module.scss";
import AppDrawer from "./app-drawer";
import { alpha, useTheme } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./app-container.scss";
import DrawerContent from "./drawer-content";

const OS = getSystem();

export const AppContainer = ({
  children,
  isDrawer,
}: {
  children?: ReactNode;
  isDrawer?: boolean;
}) => {
  // TODO: move layout sidecar size to nyanpasu config file for better compatibility?
  // const onLayout = useDebounce(() => {}, {
  //   wait: 100,
  // });

  const { palette } = useTheme();

  return (
    <Paper
      square
      elevation={0}
      className={styles.layout}
      onPointerDown={(e: any) => {
        if (e.target?.dataset?.windrag) {
          appWindow.startDragging();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Allotment separator proportionalLayout={false}>
        {isDrawer ? (
          <AppDrawer data-windrag />
        ) : (
          <Allotment.Pane className="h-full" minSize={96} maxSize={260}>
            <DrawerContent data-windrag />
          </Allotment.Pane>
        )}

        <Allotment.Pane visible={true} className={styles.container}>
          {OS === "windows" && (
            <LayoutControl className="fixed right-6 top-1.5 !z-top" />
          )}

          {OS === "macos" && (
            <div
              className="fixed z-top left-6 top-3 h-8 w-[4.5rem] rounded-full"
              style={{ backgroundColor: alpha(palette.primary.main, 0.1) }}
            />
          )}

          <div
            className={OS === "macos" ? "h-[2.75rem]" : "h-9"}
            data-windrag
          />

          {children}
        </Allotment.Pane>
      </Allotment>
    </Paper>
  );
};

export default AppContainer;
