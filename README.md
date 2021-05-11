# responsive-app-layout
App Shell Web Component. Offers responsive page layout with left sidebar &amp; configurable colors and dimensions.

&nbsp;
## About
The page layout component consists of a full-width header, a main area below with a sidebar on the left. 
At viewport widths less or equal of 768px the sidebar can be toggled. The toggle is placed in the left corner of header bar.

Content is placed in the header / sidebar / main area via [slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots).

&nbsp;
## How To use
Include the Javascript file for the custom element into your website and add a `responsive-app-layout` tag. Configure it appropriately (see options below). No dependencies, the minified version is &lt; 3kb;

```html
...
<style>
  body{
    --sidebar-width: 300px;
  }
</style>
<script src="responsive-app-layout.js"></script>
<responsive-app-layout overlap>
  <span slot="main"><p>This is the main area.</p></span>
</responsive-app-layout>
...
```

&nbsp;
## Configuration

&nbsp;
### CSS Variables
CSS variables are used to configure dimensions and colors of the layout.

Parameter               | Default Value | Description
----------------------- | -------------------- | -----------------------------------
--header-height           | 48px                 | Height of the header bar in pixels
--header-background-color | #393939 (dark grey)  | Background color of the header bar
--header-border | none | Bottom border of the full width header
--header-box-shadow | none | Box shadow of the full width header
--sidebar-width | 200px | Width of the left sidebar in pixels
--sidebar-background-color | #F8F8F8 (light grey) | Background color of the left sidebar
--sidebar-border | none | Right border of the left hand sidebar
--sidebar-box-shadow | none | Box shadow of the left hand sidebar
--main-background-color   | inherit              | Background color of the main screen
--sidebar-open-main-filter | none | [CSS filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) applied to the main area when sidebar is open on small screens
--toggle-color            | #FFFFFF              | Text color of the toggle

&nbsp;
### Properties

Property               | Type | Default Value | Is Observed Attribtue | Description
----------------------- | ----| ---------------- | --------------------- | -----------------------------------
overlap | boolean | false | Yes | Whether the opened sidebar should overlap the main areas content
open | boolean | false | Yes | Whether the sidebar is open in responsive mode
breakpoint | number | 768 | Yes | Defines the minimum width of the viewport (in px) where the sidebar is constantly open
position | string | `left` | Yes |Position of the sidebar. May be `left` or `right`
sidebarCloseSelector | string | `[data-sidebar-close]` | No | Clicks on elements in sidebar slot matching this selector will close the sidebar


&nbsp;
### Slots
Slot Name | Description
--------- | -----------
icon | Overwrite the icon of the sidebar toggle
header | Area in the header right of the sidebar toggle
sidebar | Area for content of the sidebar
main | Main Area 

&nbsp;
## Examples
Examples can be found in the `examples` folder.

&nbsp;
### Style Dimensions and Colors of Layout
```html
...
<style>
  body{
    --header-background-color: #333;
    --header-height: 48px;
    --header-box-shadow: 0px 5px 5px 0px rgba(192,192,196,0.5);

    --sidebar-width: 300px;
    --sidebar-background-color: #ccc;
    --sidebar-border: 1px solid #eee;
  }
</style>
<script src="responsive-app-layout.js"></script>
<responsive-app-layout>
  <span slot="header" style="color: white">Responsive App Layout Web Component</span>
  <span slot="sidebar">Sidebar</span>
  <span slot="main"><p>The content of the main area can be anything, even <b style="color:red">markup</b></p></span>
</responsive-app-layout>
...
```
Configuration is done via CSS properties OUTSIDE of the component. In the example the properties are set on `body` tag. Of course you could always apply the properties on a different level, maybe a wrapper `div` around the `responsive-app-layout` tag.

Styling of the slot content is done as usual, see the inline styles to set the font color in the example.


&nbsp;
### Make the Sidebar Overlap The Main Area
```html
...
<script src="responsive-app-layout.js"></script>
<responsive-app-layout overlap>
  <span slot="header" style="color: white">Responsive App Layout Web Component</span>
  <span slot="sidebar">Overlapping Sidebar</span>
  <span slot="main"><p>The content of the main area can be anything, even <b style="color:red">markup</b></p></span>
</responsive-app-layout>
...
```
Simply add the `overlap` attribute to the `responsive-app-layout` tag to make the sidebar overlap the main area in responsive mode (width of viewport &lt; 768px). You can also apply this property programmatically.
```javascript
document.getElementsByTagName('responsive-app-layout')[0].overlap = true;
```

&nbsp;
### Apply A Filter To Blur The Main Area When Sidebar Is Open
```html
...
<style>
  body{
    --sidebar-open-main-filter: blur(1px);
  }
</style>
<script src="responsive-app-layout.js"></script>
<responsive-app-layout>
  <span slot="header" style="color: white">Responsive App Layout Web Component</span>
  <span slot="sidebar">Overlapping Sidebar</span>
  <span slot="main"><p>The content will appear blurred when the sidebar is open in responsive mode</p></span>
</responsive-app-layout>
...
```
A nice visual effect is to blur the main area when the sidebar is open. Use the `--sidebar-open-main-filter` CSS property to achieve it. You can use any [CSS filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) supported by your browser.

&nbsp;
### Change the Menu Icon
```html
...
<responsive-app-layout>
    <span slot="icon">🍔</span>
    <span slot="header" style="color: white">Responsive App Layout Web Component</span>
    <span slot="sidebar">Sidebar</span>
    <span slot="main"><p>It is called Hamburger Menu, isn't it!?</p></span>
</responsive-app-layout>
...
```
Use the `icon` slot to define a custom icon. It can be anything like an image, or a unicode character.

&nbsp;
### Nest Layout
```html
...

<style>
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        
        --header-background-color: #0077DD;
        --header-height: 48px;
        --header-box-shadow: 0px 5px 5px 0px rgba(192,192,196,0.5);

        --sidebar-width: 80px;
        --sidebar-background-color: #F9F9F9;
        --sidebar-border: 1px solid #eee;

        --toggle-color: #FFFFFF;
    }

    responsive-app-layout {
        width:100%;
        height: 100%;
    }

    /* Overwrite styles for the inner layout component */
    #nest-area{
        --sidebar-width: 200px; 
        --header-background-color: #F9F9F9; 
        --sidebar-background-color: white;
        
        --toggle-color: #333;
    }
</style>        
<responsive-app-layout overlap>
  <div slot="header" style="box-sizing: border-box; padding: 0 1rem; color: white;"> Responsive App Layout Web Component</div>
  
  <div slot="sidebar">

      <ul id="apps">
          <li class="active">Mail</li>
          <li>Contacts</li>
          <li>Travels</li>
          <li>Favorites</li>
      </ul>

  </div>
  
  <span slot="main" id="nest-area">
      
      <responsive-app-layout open>
          <span slot="icon"> &lt; </span>
          <span slot="header" class="command-bar" style="color: #333; padding: 0 1rem">
              <span>Command</span>
          </span>
          <span slot="sidebar">
              <div style="border-bottom: var(--sidebar-border);padding: 0.5em">A list of mails:</div>
              <ul id="mails">
                  <li>Mail 1</li>
                  <li>Mail 2</li>
                  <li>Mail 3</li>
              </ul>
          
          </span>
          <span slot="main">
              <section>Main content</section>
          </span>

      </responsive-app-layout>

  </span>
</responsive-app-layout>
...
```
The `responsive-app-layout` can be nested. Be sure to set and overwrite the CSS properties for the nested component when necessary. Please note that all nested `responsive-app-layout` share the same responsive breakpoint at 768px.