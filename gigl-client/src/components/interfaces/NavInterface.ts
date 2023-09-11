import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NavigateFunction } from "react-router-dom";

export interface NavItem {
  icon?: IconDefinition;
  imageIcon?: string; // For URLs to images
  label: string;
  color: string;
  textColor: string;
  to: string;
}

export interface NavItemsProps {
  navItems: NavItem[];
  navigate: NavigateFunction;
  currentPath: string;
}
