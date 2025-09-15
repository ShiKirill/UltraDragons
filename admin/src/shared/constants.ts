import { Role } from "./types/app";

export const ROLES = [
  { label: "User", value: Role.User },
  { label: "Admin", value: Role.Admin },
];

export const ROLES_MAP = {
  [Role.User]: "User",
  [Role.Admin]: "Admin",
};
