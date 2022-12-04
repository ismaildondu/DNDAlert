# DNDAlert.js

![dndalert](https://user-images.githubusercontent.com/49169815/203099497-589df1a2-63fb-4c97-aeb2-d4cb80233872.png)

<p align="center">
<img width="100" src="https://img.shields.io/github/license/ismailfp/DNDAlert?style=plastic" alt="GitHub">
<img width="100" src="https://img.shields.io/github/stars/ismailfp/dndalert?style=social" alt="GitHub Repo stars">

</p>

<p style="text-align:center;">DNDAlert is a simple JavaScript library alert for web developers.
</p>

## Features

- SVG Types ( success 🟢 , error 🔴 , warning 🟠, info 🔵 )
- Unlimited button support
- HTML message support
- Easy to set up and use
- Callback bag
- Responsive
- Animation
- Theme (white,dark)
- Draggable

## Examples

![DNDAlert_Examples](https://user-images.githubusercontent.com/49169815/205486583-f47d5a0b-613a-4c66-88bd-8be615b1a021.png)

## Simple Usage

```javascript
const Alert = new DNDAlert({
  message: "DNDAlert is a simple JavaScript library alert for web developers.",
});
```

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
      type: "danger",
      click: (bag) => {
        bag.CLOSE_MODAL();
      },
    },
  ],
  closeBackgroundClick: true,
  portalElement: document.querySelector("#modal"),
  portalOverflowHidden: true,
  textAlign: "center",
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
  animationStatus: true,
  closeIcon: false,
});
```

- **[title]**
  - Message title (If not given, a modal with no header is created.)
- **[html]**
  - Message whether to use HTML in the message.
- **[buttons]**

  - It is an array. Keeps the buttons inside.
  - [**text**] Text inside the button
  - [**class**] Sets the class of the button. \* If not defined, it comes with the library's default button style (light)
  - [**type**] Default button styles available in the library [primary,secondary,success,danger,warning,light]
  - ![buttonList](https://user-images.githubusercontent.com/49169815/203387178-40f54bf8-0222-4aa6-938a-716454d79154.png)

  - [**click**] Function to run after clicking the button.
    - The library sends a BAG_ELEMENT object to this function, which contains the CLOSE_MODAL function needed to close the modal
      ```
      click: (BAG_ELEMENT) => {
           BAG_ELEMENT.CLOSE_MODAL();
         },
      ```

* [**closeBackgroundClick**] If true, clicking (not Modal) the background closes the Modal
* [**autoCloseDuration**] Takes value (X) in milliseconds and closes modal after X milliseconds.
* [**onOpen**] The function is called by the library when the modal is opened.
* [**onClose**] The function is called by the library when the modal is closed.

* [**closeIcon**] Sets the status of the close button on the top right (invisible if false)

* [**portalElement**] To call a modal on an element other than body
* [**portalOverflowHidden**] Portal overflow hidden

* [**textAlign**] Css property of message
* [**theme**] Theme (dark AND white)
* [**type**] success,error,warning and info | If it is not entered, the type will not be displayed, only the message will be show.

* [**opacity**] Modal css opacity.
* [**animationStatus**] If true, opening and closing will be accompanied by animation.
* [**draggable**] Modal draggable.

## Installation

```sh
cd my-web-project
npm i dndalertjs
```

<p>or</p>

```sh
cd my-web-project
git clone https://github.com/ismailfp/DNDAlert.js.git
```

## Default Value List

| Property             | Value         |
| -------------------- | ------------- |
| portalElement        | document.body |
| portalOverflowHidden | true          |
| animationStatus      | true          |
| closeIcon            | true          |
| closeBackgroundClick | true          |
| type                 | false         |
| autoCloseDuration    | false         |
| draggable            | false         |
| html                 | false         |
| title                | false         |
| buttons[] > class    | light         |
| theme                | white         |
| opacity              | 1.00          |
| textAlign            | left          |

## BAG_ELEMENT

- onOpen,onClose and click function of the buttons

| Property                | ?                            |
| ----------------------- | ---------------------------- |
| CLOSE_MODAL             | Modal closing function       |
| PROPETIES               | Contains general information |
| PROPETIES->CREATED_TIME | Modal opening date(UNIX)     |
| PROPETIES->THEME        | THEME                        |
| PROPETIES->CONTEXT      | Everything in Context        |
