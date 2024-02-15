// NAVBAR

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
      { href: "/about", text: "Contact" }, //Contact page not created yet, will send to About Us
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

// TEMPORARY IMAGE LINKS

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

// CATEGORIES

export const POST_CATEGORIES = {
  CATEGORY_1: {
    CATEGORY_TITLE: "Living With Alzheimer's",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are living with Alzheimer's and are looking for support and advice.",
  },
  CATEGORY_2: {
    CATEGORY_TITLE: "Caregivers for a Parent or Sibling",
    CATEGORY_IMAGE: "../../images/parent.jpeg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a parent or sibling and are looking for advice and support.",
  },
  CATEGORY_3: {
    CATEGORY_TITLE: "Caregivers for a Spouse or Partner",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a spouse or partner and are looking for advice and support.",
  },
  CATEGORY_4: {
    CATEGORY_TITLE: "Long Distance Caregivers",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a loved one from a distance and are looking for advice and support.",
  },
  CATEGORY_5: {
    CATEGORY_TITLE: "Support for Those Who Have Lost Someone",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who have lost a loved one and are looking for support and advice.",
  },
  CATEGORY_6: {
    CATEGORY_TITLE: "Living With Other Memory Problems",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are living with other memory problems and are looking for support and advice.",
  },
  CATEGORY_LAST: {
    CATEGORY_TITLE: "Other",
    CATEGORY_IMAGE: "../../images/couple.jpg",
    CATEGORY_DESCRIPTION:
      "This category is for those who are looking for support and advice but do not fit into any of the other categories.",
  },
};

// COMMENT FORM

export const COMMENTS_RESOURCES = {
  COMMENTS_TITLE: "Join the discussion!",
  COMMENTS_ADD: "Add Comment",
  COMMENTS_AUTHOR_PREFIX: "Comment as ",
};

// INPUT VALIDATION

export const COMMENTS_VALIDATION = {
  COMMENTS_MAXCHAR: 300,
  COMMENTS_BLANK_TEXT: "Comment can not be blank",
  COMMENTS_EXCEED_TEXT: `Comment can not exceed 300 characters`,
};
