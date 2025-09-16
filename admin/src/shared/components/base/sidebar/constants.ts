import FlagIcon from "@mui/icons-material/Flag";
import UsersIcon from "@mui/icons-material/Group";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InterestsIcon from "@mui/icons-material/Interests";
import CitiesIcon from "@mui/icons-material/LocationCity";

export const mainNavItems = [
  {
    href: "/users",
    label: "Users",
    icon: UsersIcon,
  },
  {
    href: "/cities",
    label: "Cities",
    icon: CitiesIcon,
  },
  {
    href: "/interests",
    label: "Interests",
    icon: InterestsIcon,
  },
  {
    href: "/places",
    label: "Places",
    icon: FlagIcon,
  },
  {
    href: "/pictures",
    label: "Pictures",
    icon: InsertPhotoIcon,
  },
];
