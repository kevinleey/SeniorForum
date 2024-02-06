// Navbar

export const NAV_ITEMS = [
  {
    href: "/",
    text: "HOME",
  },
  {
    href: "/categories",
    text: "CATEGORIES",
  },
  {
    href: "/about",
    text: "ABOUT",
    subItems: [
      { href: "/about", text: "About Us" },
      { href: "/about", text: "Contact"} //Contact page not created yet, will send to About Us
    ],
  },
  {
    href: "/account",
    text: "MY ACCOUNT", //sends to user profile
    subItems: [
      { href: "", text: "Account Settings" }, //will send to account settings page (unmade)
      { href: "/", text: "Logout" }, //Not sure what ref to put for the logout. For now, it will redirect to the home page.
    ],
  },
];

export const NAV_RESOURCES = {
  NAVBAR_TITLE: "Senior Forum",
  NAVBAR_SUBTITLE: "Connecting Caregivers of Alabama",
  NAVBAR_ICON_URL:
    "https://brand.ua.edu/wp-content/themes/ua-theme/assets/img/ua-square-logo.png",
  NAVBAR_ALT_TEXT: "alabama logo",
};
