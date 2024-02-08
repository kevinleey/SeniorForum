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
    href: "/add-post",
    text: "ADD POST",
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

// Temporary image links before adding functionality for saving images to MongoDB

export const imageLinks = {
  USER: {
    USER_PICTURE_LINK:
      "https://www.challengedathletes.org/wp-content/uploads/2023/08/portrait-square-03.jpg",
    USER_PICTURE_TEXT: "smiling man",
  },
  ERROR: {
    ERROR_PICTURE_LINK:
      "https://static-00.iconduck.com/assets.00/process-error-icon-1024x1024-qxlzzqvg.png",
    ERROR_PICTURE_TEXT: "error icon",
  },
};

export const ERROR_MESSAGES = {
  INVALID_POSTID: "Invalid post ID",
};
