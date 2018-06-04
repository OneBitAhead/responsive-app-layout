# responsive-app-layout
Basic responsive page layout with left sidebar &amp; configurable colors and dimensions

## About
The page layout consists of a main area with a sidebar on the left. It is layout out using flexbox.
At widths less or equal of 768px the sidebar can be toggled. 
The toggle is placed in the header bar, but can be rearranged as long as its ID remains.

## Configuration
### CSS Variables
CSS variables are used to configure dimensions and colors of the layout.

Parameter               | Default              | Description
----------------------- | -------------------- | -----------------------------------
header-height           | 48px                 | Height of the header bar in pixels
nav-width               | 200px                | Width of the left sidebar in pixels
header-background-color | #393939 (dark grey)  | Background color of the header bar
nav-background-color    | #F8F8F8 (light grey) | Background color of the left sidebar
main-background-color   | #FFFFFF              | Background color of the main screen
toggle-color            | #FFFFFF              | Text color of the toggle


### Classes
Add a `overlap` class to the body element, so that the sidebar won't push the main content to the left but overlaps it.