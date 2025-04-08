"use client";

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const routes = [
  {
    text: "Template",
    path: "/template",
    icon: <div />,
  },
];

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const DrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setIsOpen(false)}
    >
      <List>
        {routes.map(({ text, path, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(path);
                setIsOpen(false);
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header className="flex flex-col items-center justify-center relative w-full">
      {/* logo */}
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <div>메인 로고</div>
      </div>

      {/* drawer */}
      <div className="absolute right-0">
        <Button className="text-black" onClick={() => setIsOpen(true)}>
          <MenuIcon color="inherit" />
        </Button>
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerList />
        </Drawer>
      </div>
    </header>
  );
}
