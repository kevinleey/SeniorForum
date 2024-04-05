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
    href: "/add-post",
    text: "ADD POST",
  },
  {
    href: "/account",
    text: "MY ACCOUNT", //sends to user profile
    subItems: [
      { href: "/account-settings", text: "Account Settings" },
      { href: "http://localhost:3001/login", text: "Login" },
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
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are living with Alzheimer's and are looking for support and advice.",
  },
  CATEGORY_2: {
    CATEGORY_TITLE: "Family Caregivers",
    CATEGORY_IMAGE:
      "https://plus.unsplash.com/premium_photo-1658506620365-925c827c6fdc?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a parent or sibling and are looking for advice and support.",
  },
  CATEGORY_3: {
    CATEGORY_TITLE: "Spousal Caregivers",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1668876686520-5767282cdf8f?q=80&w=2967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a spouse or partner and are looking for advice and support.",
  },
  CATEGORY_4: {
    CATEGORY_TITLE: "Long Distance Caregivers",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1530296688540-3a317e00379d?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are caring for a loved one from a distance and are looking for advice and support.",
  },
  CATEGORY_5: {
    CATEGORY_TITLE: "Grief Support",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=3563&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who have lost a loved one and are looking for support and advice.",
  },
  CATEGORY_6: {
    CATEGORY_TITLE: "Other Memory Challenges",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are living with other memory problems and are looking for support and advice.",
  },
  CATEGORY_7: {
    CATEGORY_TITLE: "Local Resources",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1649259441622-6d78703f4ea2?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are looking for local resources and support.",
  },
  CATEGORY_8: {
    CATEGORY_TITLE: "Technology",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are looking for advice and support with technology.",
  },
  CATEGORY_LAST: {
    CATEGORY_TITLE: "Other",
    CATEGORY_IMAGE:
      "https://images.unsplash.com/photo-1617541224485-ca362e048814?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    CATEGORY_DESCRIPTION:
      "This category is for those who are looking for support and advice but do not fit into any of the other categories.",
  },
};

// COMMENT FORM

export const COMMENTS_RESOURCES = {
  COMMENTS_TITLE: "Join the discussion!",
  COMMENTS_ADD: "Add Comment",
  COMMENTS_EDIT: "Edit Comment",
  COMMENTS_CANCEL: "Cancel",
  COMMENTS_AUTHOR_PREFIX: "Comment as ",
};

// INPUT VALIDATION

export const COMMENTS_VALIDATION = {
  COMMENTS_MAXCHAR: 1000,
  COMMENTS_BLANK_TEXT: "Comment can not be blank",
  COMMENTS_EXCEED_TEXT: `Comment can not exceed the maximum number of characters`,
};

export const POST_VALIDATION = {
  POST_TITLE_MAXCHAR: 100,
  POST_TITLE_BLANK_TEXT: "Title can not be blank",
  POST_TITLE_EXCEED_TEXT: `Title can not exceed 100 characters`,
  POST_BODY_MAXCHAR: 1000,
  POST_BODY_BLANK_TEXT: "Post can not be blank",
  POST_BODY_EXCEED_TEXT: `Post can not exceed 1000 characters`,
};

export const EDIT_PROFILE_VALIDATION = {
  FIRST_NAME_MAXCHAR: 20,
  FIRST_NAME_BLANK_TEXT: "First name can not be blank",
  FIRST_NAME_EXCEED_TEXT: `First name can not exceed 20 characters`,
  LAST_NAME_MAXCHAR: 20,
  LAST_NAME_BLANK_TEXT: "Last name can not be blank",
  LAST_NAME_EXCEED_TEXT: `Last name can not exceed 20 characters`,
  BIO_MAXCHAR: 300,
  BIO_BLANK_TEXT: "Bio can not be blank",
  BIO_EXCEED_TEXT: `Bio can not exceed 300 characters`,
};
