# DNDAlert.js

<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/49169815/205495645-b5b53d22-5874-4104-b806-91a87837d6e0.png" alt="DNDAlert-Logo">
</p>
 <p align="center">DNDAlert is a simple JavaScript library alert for web developers.</p>
 <p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/49169815/205488419-e742283a-5449-4dd4-8bc3-c88708e8c2ca.gif" alt="DNDAlert-GIF">
</p>

<p align="center">
<img width="100" src="https://img.shields.io/github/license/ismailfp/DNDAlert?style=plastic" alt="GitHub">
<img width="130" src="https://img.shields.io/npm/dt/dndalertjs?&style=plastic" alt="GitHub Repo stars">
<img width="100" src="https://img.shields.io/github/stars/ismailfp/dndalert?style=social" alt="GitHub Repo stars">

</p>

## Examples

![DNDAlert_Examples](https://user-images.githubusercontent.com/49169815/205495768-cf33f3ca-ae9a-44bc-9552-c0a49277c249.png)

## Features

- SVG Types ( success 🟢 , error 🔴 , warning 🟠, info 🔵 )
- Unlimited button support
- HTML message support
- Easy to set up and use
- Callback bag
- Responsive
- Animation
- Theme (white 🌕 , dark 🌑)
- Draggable

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
      onClick: (bag) => {
        alert("Ok button clicked");
      },
    },
    {
      text: "Cancel",
      type: "danger",
      onClick: (bag) => {
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
    console.log(bag.PROPERTIES);
  },
  opacity: 1,
  autoCloseDuration: 3000,
  draggable: true,
  animationStatus: true,
  closeIcon: false,
  sourceControlWarning: true,
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
  - ![buttonList](https://user-images.githubusercontent.com/49169815/205487542-a010d803-93f0-471c-bb8c-85e7169a4bee.png)

  - [**onClick**] Function to run after clicking the button.
    - The library sends a BAG_ELEMENT object to this function, which contains the CLOSE_MODAL function needed to close the modal
      ```
      onClick: (BAG_ELEMENT) => {
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
* [**draggable**] Modal draggable. (Title required)

* [**sourceControlWarning**] If true, when the modal is run, it makes a request to NPM and compares the current version with the local version. If the versions are different, a warning message in the console. (If you don't want to make a npm version request, you can turn it off.)

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
| sourceControlWarning | true          |
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

| Property                     | ?                                                                    |
| ---------------------------- | -------------------------------------------------------------------- |
| CLOSE_MODAL                  | Modal closing function                                               |
| PROPERTIES                   | Contains general information                                         |
| PROPERTIES->CREATED_TIME     | Modal opening date                                                   |
| PROPERTIES->THEME            | THEME                                                                |
| PROPERTIES->VERSION          | Current version (DNDAlert - NPM)                                     |
| PROPERTIES->CONTEXT          | Everything in Context                                                |
| PROPERTIES->HOW_MANY_SECONDS | Only onClose BAG (Shows how many seconds the alert on after closing) |

----
Copyright (c) 2022 İsmail Döndü

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

