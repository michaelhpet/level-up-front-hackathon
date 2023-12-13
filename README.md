# Level-up Front Hackathon

![Solution preview](preview.png)

## The Challenge

The challenge is to build the merchant onboarding experience as per the [Figma design](https://www.figma.com/file/W4IHXzpdgxrUMWuymS9R9i/Level-Up-Front-Hackathon?type=design&node-id=0%3A1&mode=design&t=EsuFAm9tFyz62qJm-1) provided. Developer is to cater for the three most popular types of Shopify merchants:

- Mouse users
- Keyboard-only users
- Screen reader users

Developer is to create a fully responsive experience for users on these device types:

- Mobile Phones (Google Chrome Browser Only)
- Desktops (Google Chrome Browser Only)

To complete this challenge, developer should assume they are a software engineer at Shopify, assigned to complete this project, so as to provide a great dashboard experience to Shopify merchants.

## Challenge constraints

Developer should consider the following constraints as they create their solution to the challenge:

- They may only use 3 HTML, CSS and Vanilla Javascript for the challenge. No CSS or Javascript frameworks or libraries are allowed.
- They may only use 3 files for their solution: index.html for their HTML, app.css for their CSS and app.js for their Javascript.
- Their solution will only be tested on the latest version of Google Chrome. This means they may use the latest versions of Javascript without worrying about old browser support, and cross browser compatibility will not be evaluated in this challenge.
- Developer should make sure every text they use is exactly as displayed on the Figma design.

## User stories

This is a list of acceptance criteria to consider the solution to this challenge as complete. Please take a moment to study the Figma designs before reading this, so it makes sense as you read.

- As a merchant, when I click on the Shopify icon on the top bar, I am taken to the shopify landing page [`shopify.com`](https://shopify.com)

- As a merchant, when I focus on the search box on the top bar, I can freely type into the input. At the moment, no further actions or results should occur. A merchant should only be able to type freely in the box.

- As a merchant, when I click on the notification bell, I see a dropdown panel that shows me an empty list of notifications since I have none yet. When I click on the notification bell again, this dropdown panel is closed.

- As a merchant, when I click on the name of my store Davii Collections, or on my profile image placeholder DC on the far right of the topbar menu, I see a menu with a list of menu items as specified by the Figma design. Clicking on this button again closes the menu. Finally, when I click on any of the menu items in this menu, I am redirected to [`admin.shopify.com`](https://admin.shopify.com)

- As a merchant, when I click on theSelect plan link, I am redirected to the Shopify pricing page at [`shopify.com/pricing`](https://shopify.com/pricing)

- As a merchant, when I click on the dismiss button of the trial callout, the trial callout is immediately removed from the page.

- As a merchant, when I click the "Arrow Up" icon on the top right of the Setup guide card, it closes the card. When I click again, it reopens the card.

- As a merchant, when I click on any of the 5 onboarding steps, it expands the panel, showing the content of the onboarding step, and closes the previously opened one. When I click on an opened onboarding step, nothing happens.

- As a merchant, when I click on the circle checkbox (empty) on the left side of an onboarding step title, it marks that step as completed, and expands the next incomplete step. If I click again, it marks the step as incomplete. As I mark steps as completed or incomplete, I see the onboarding progress bar showing the correct progress.
