"use client";

export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const categories = [
  {
    title: "Electronics",
    description: "Browse our latest gadgets and devices.",
  },
  { title: "Clothing", description: "Discover the latest fashion trends." },
  {
    title: "Home & Decor",
    description: "Upgrade your living space with our home essentials.",
  },
  // Add more categories here
];
