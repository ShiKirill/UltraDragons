import { ReactNode, SyntheticEvent, useState } from "react";

import { useTranslations } from "next-intl";

import { Box } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import { SxProps, styled } from "@mui/material/styles";

import { styles } from "./styles";

interface StyledTabsProps {
  children?: ReactNode;
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
  children?: ReactNode;
  tabsWrapperSx?: SxProps;
  index: number;
  value: number;
}

interface StyledTabProps {
  label: string;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    slotProps={{
      indicator: {
        children: <span className="MuiTabs-indicatorSpan" />,
      },
    }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    height: 1,
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 50,
    width: "100%",
    backgroundColor: "#B2B1A8",
  },
});

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontSize: "16px",
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#000",
  },
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, tabsWrapperSx, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`home-tabpanel-${index}`}
      aria-labelledby={`home-tab-${index}`}
      sx={{ ...styles.tabsWrapper, ...tabsWrapperSx }}
      {...other}
    >
      {value === index && <Box sx={styles.tabsContent}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `app-tab-${index}`,
    "aria-controls": `app-tabpanel-${index}`,
  };
}

type TabWithLabel = { label: string; content?: ReactNode };
type TabWithContent = { label?: string; content: ReactNode };

type AppTab = TabWithLabel | TabWithContent;

interface IProps {
  children: ReactNode;
  firstTab: AppTab;
  secondTab: AppTab;
  thirdTab?: AppTab;
  sx?: SxProps;
  tabsWrapperSx?: SxProps;
}

export const AppTabs = (props: IProps) => {
  const { children, firstTab, secondTab, thirdTab, tabsWrapperSx, sx } = props;
  const t = useTranslations("HomePage");
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ ...styles.wrapper, ...sx }}>
      <StyledTabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="home tabs"
      >
        <StyledTab label={firstTab.label ?? t("mainTab")} {...a11yProps(0)} />
        <StyledTab
          label={secondTab.label ?? t("favoritesTab")}
          {...a11yProps(1)}
        />
        <StyledTab
          label={thirdTab?.label ?? t("historyTab")}
          {...a11yProps(2)}
        />
      </StyledTabs>
      <CustomTabPanel value={tabIndex} index={0} tabsWrapperSx={tabsWrapperSx}>
        {firstTab.content}
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={1} tabsWrapperSx={tabsWrapperSx}>
        {secondTab.content}
      </CustomTabPanel>

      {thirdTab?.content && (
        <CustomTabPanel
          value={tabIndex}
          index={2}
          tabsWrapperSx={tabsWrapperSx}
        >
          {thirdTab.content}
        </CustomTabPanel>
      )}

      {children}
    </Box>
  );
};
