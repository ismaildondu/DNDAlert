# DNDAlert.js

DNDAlert is a simple JavaScript library alert for web developers.
by Ismail Dondu (İsmail Döndü)

## Features

- SVG Types ( success 🟢 , error 🔴 , warning 🟠, info 🔵 )
- Unlimited button support
- HTML message support
- Easy to set up and use
- Callback bag
- Responsive
- Animation
- Theme (dark AND white)
  <<<<<<< HEAD
- # Draggable

## IMG

![Adsız tasarım (2)](https://user-images.githubusercontent.com/49169815/203037702-af2143cf-1be0-4efa-85f5-ee015e373fc5.png)

> > > > > > > 733432b09e67285855847988954c25be02d5fc26

## Simple Usage

```javascript
const Alert = new DNDAlert({
  title: "Test Alert",
  message: "DNDAlert is a simple JavaScript library alert for web developers.",
});
```

- **[title]**
  - Null values ​​cannot be entered. This is the title of the alert
- **[message]**
  - Null values ​​cannot be entered. The content of the alert.

## Usage

```javascript
const Alert = new DNDAlert({
  title: "Test Alert",
  message:
    "<b>DNDAlert</b> is a simple JavaScript library alert for web developers.",
  type: "warning",
  html: true,
  buttons: [
    {
      text: "Ok",
      class: "btn btn-primary",
      click: (bag) => {
        alert("Ok button clicked");
      },
    },
    {
      text: "Cancel",
      click: (bag) => {
        bag.CLOSE_MODAL();
      },
    },
  ],
  closeBackgroundClick: true,
  portalElement: document.querySelector("#modal"),
  text_align: "center",
  theme: "dark",
  onOpen: (bag) => {
    console.log("Modal Opened");
    console.log(bag);
  },
  onClose: (bag) => {
    console.log("Modal Closed");
    console.log(bag.PROPETIES);
  },
  opacity: 1,
  autoCloseDuration: 3000,
  draggable: true,
});
```

- **[html]**
  - Message whether to use HTML in the message.
- **[buttons]**
  - It is an array. Keeps the buttons inside.
  - [**text**] Text inside the button
  - [**class**] Sets the class of the button. \* If not defined, it comes with the library's default button style (==dnd-alert-default-button==)
  - [**click**] Function to run after clicking the button.
    - The library sends a BAG_ELEMENT object to this function, which contains the CLOSE_MODAL function needed to close the modal
      ```
      click: (BAG_ELEMENT) => {
           BAG_ELEMENT.CLOSE_MODAL();
         },
      ```

* [**type**] success,error,warning and info | If it is not entered, the type will not be displayed, only the message will be show.
* [**closeBackgroundClick**] If true, clicking (not Modal) the background closes the Modal
* [**portalElement**] To call a modal on an element other than body
* [**text_align**] Css property of message
* [**theme**] Theme (dark AND white)
* [**onOpen**] The function is called by the library when the modal is opened.
* [**onClose**] The function is called by the library when the modal is closed.
* [**opacity**] Modal css opacity.
* [**autoCloseDuration**] Takes value (X) in milliseconds and closes modal after X milliseconds.
* [**draggable**] Modal draggable.

## Installation

```sh
cd my-web-project
git clone https://github.com/ismailfp/DNDAlert.js.git
```

## Default Value List

| Property             | Value                    |
| -------------------- | ------------------------ |
| text_align           | left                     |
| portalElement        | document.body            |
| html                 | false                    |
| closeBackgroundClick | true                     |
| type                 | false                    |
| buttons[] > class    | dnd-alert-default-button |
| theme                | white                    |
| opacity              | 1                        |
| autoCloseDuration    | false                    |
| draggable            | false                    |

## BAG_ELEMENT

\*onOpen,onClose and click function of the buttons

| Property                | ?                            |
| ----------------------- | ---------------------------- |
| CLOSE_MODAL             | Modal closing function       |
| PROPETIES               | Contains general information |
| PROPETIES->CREATED_TIME | Modal opening date(UNIX)     |
| PROPETIES->THEME        | THEME                        |
| PROPETIES->CONTEXT      | Everything in Context        |
