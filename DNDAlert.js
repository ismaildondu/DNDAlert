/*
 *  DNDAlert.js
 *  Simple JavaScript library alert for web developers.
 *
 *  License: MIT (c) 2022
 *  Author: İsmail Döndü
 */

class Context {
  constructor(props = {}) {
    this.CONTEXT_QUERY_NAME = {
      message: "message",
      title: "title",
      type: "type",
      html: "html",
      buttons: "buttons",
      closeBackgroundClick: "closeBackgroundClick",
      portalElement: "portalElement",
      portalOverflowHidden: "portalOverflowHidden",
      textAlign: "textAlign",
      theme: "theme",
      onOpen: "onOpen",
      onClose: "onClose",
      opacity: "opacity",
      autoCloseDuration: "autoCloseDuration",
      draggable: "draggable",
      animationStatus: "animationStatus",
      openAnimationStatus: "openAnimationStatus",
      closeIcon: "closeIcon",
      sourceControlWarning: "sourceControlWarning",

      TEMP_STYLE_NODE: "TEMP_STYLE_NODE",
    };
    this.CONTEXT_PRIVATE_PROPS = {
      containerRef: null,
      content_boxRef: null,
      alert_titleRef: null,
      alert_messageRef: null,
      headerRef: null,
      close_buttonRef: null,
      button_groupRef: null,
      buttonsRef: null,
    };

    /*
     * INIT_PRIVATE_TO_NAME()
     * This function is used to add private
     * properties to CONTEXT_QUERY_NAME.
     *
     * This is necessary because the user can
     * enter the private property as a parameter.
     */
    this.INIT_PRIVATE_TO_NAME();

    this.CONTEXT_DEFAULT_VALUES = {
      closeBackgroundClick: true,
      animationStatus: true,
      closeIcon: true,
      portalOverflowHidden: true,
      type: false,
      html: false,
      autoCloseDuration: false,
      draggable: false,
      title: false,
      buttons: [],
      textAlign: "left",
      opacity: 1,
      portalElement: document.body,
      sourceControlWarning: true,
      ...this.CONTEXT_PRIVATE_PROPS,
    };

    /*
     * INIT_DEFAULT_VALUES()
     * This function is used to add private
     * properties to CONTEXT_PRIVATE_RESPONSE_LIST.
     *
     * Manually assigning values ​​is too much
     * code like CONTEXT_QUERY_NAME.
     */
    this.INIT_DEFAULT_VALUES();

    this._context = { ...props };

    /*
     * CONTEXT_PRIVATE_ERROR_HANDLER()
     * This function is used to check if the user
     * enters a private property.
     *
     * If the user enters a private property,
     * an error is thrown.
     */
    this.CONTEXT_PRIVATE_ERROR_HANDLER();
  }

  INIT_DEFAULT_VALUES() {
    let keys = Object.keys(this.CONTEXT_QUERY_NAME);
    let deletedList = [
      this.CONTEXT_QUERY_NAME.TEMP_STYLE_NODE,
      this.CONTEXT_QUERY_NAME.message,
      this.CONTEXT_QUERY_NAME.onClose,
      this.CONTEXT_QUERY_NAME.onOpen,
      this.CONTEXT_QUERY_NAME.theme,
      this.CONTEXT_QUERY_NAME.openAnimationStatus,
    ];
    keys = keys.filter((key) => !deletedList.includes(key));
    this.CONTEXT_PRIVATE_RESPONSE_LIST = keys;
  }

  INIT_PRIVATE_TO_NAME() {
    let privateKeys = Object.keys(this.CONTEXT_PRIVATE_PROPS);
    let privateProps = {};
    privateKeys.forEach((key) => {
      privateProps[key] = key;
    });
    this.CONTEXT_QUERY_NAME = {
      ...this.CONTEXT_QUERY_NAME,
      ...privateProps,
    };
  }
  CONTEXT_PRIVATE_ERROR_HANDLER() {
    Object.keys(this._context).forEach((key) => {
      let privateKeys = Object.keys(this.CONTEXT_PRIVATE_PROPS);
      if (privateKeys.includes(key)) {
        throw new Error(`DNDAlert: ${key} is private property!`);
      }
    });
  }

  /*
   * CONTEXT_QUERY_NAME_CHECKER()
   * This function is used to check if the user
   * enters a valid property name.
   *
   * If the user enters an invalid property name,
   * an error is thrown.
   */
  CONTEXT_QUERY_NAME_CHECKER(key) {
    if (this.CONTEXT_QUERY_NAME[key] === undefined) {
      throw new Error(`DNDAlert: ${key} is not a valid property name!`);
    }
  }

  CONTEXT_PROVIDER_SET(key, value) {
    this.CONTEXT_QUERY_NAME_CHECKER(key);
    this._context[key] = value;
  }
  CONTEXT_PROVIDER_GET(key) {
    this.CONTEXT_QUERY_NAME_CHECKER(key);

    if (this.CONTEXT_PRIVATE_RESPONSE_LIST.includes(key)) {
      if (this._context[key] === undefined)
        return this.CONTEXT_DEFAULT_VALUES[key];
      return this._context[key];
    } else {
      return this._context[key];
    }
  }
  CONTEXT_PROVIDER_REMOVE(key) {
    this.CONTEXT_QUERY_NAME_CHECKER(key);
    delete this._context[key];
  }
  CONTEXT_PROVIDER_CLEAR() {
    this._context = {};
  }
  CONTEXT_PROVIDER_GET_ALL() {
    return this._context;
  }
}

class DNDAlert extends Context {
  constructor(props) {
    super(props);
    this.STARTER();
  }

  INIT() {
    this.cssLoader();
    this.createMainElements();

    const CONTENT_BOX = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.content_boxRef
    );
    const ALERT_MESSAGE = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.alert_messageRef
    );
    const CONTAINER = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.containerRef
    );
    const HEADER = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.headerRef);
    const BUTTON_GROUP = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.button_groupRef
    );

    this.contextBoxDrag();

    let titleStatus = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.title);
    if (titleStatus) this.appendChild(CONTENT_BOX, [HEADER, ALERT_MESSAGE]);
    else this.appendChild(CONTENT_BOX, [ALERT_MESSAGE]);

    if (BUTTON_GROUP) {
      this.appendChild(CONTENT_BOX, [BUTTON_GROUP]);
    }

    this.appendChild(CONTAINER, [CONTENT_BOX]);

    this.containerClickClose(CONTAINER);
  }

  async DRAW() {
    let onOpen = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.onOpen);
    let autoCloseDuration = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.autoCloseDuration
    );
    this.setBodyOverflow(this.OVERFLOW_ENUM.HIDDEN);
    this.appendChild(this.BODY, [
      this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.containerRef),
    ]);
    if (onOpen) {
      await onOpen(this.bagCreator());
    }
    if (
      autoCloseDuration &&
      Number.isInteger(autoCloseDuration) &&
      autoCloseDuration > 0
    ) {
      setTimeout(() => {
        if (!this.IS_CLOSE) this.removeContainer();
      }, autoCloseDuration);
    }
  }

  /*
   * infoLoader()
   * VERSION,NPM and GITHUB usage sourceControl();
   *
   * IS_CLOSE usage this.removeContainer() for onClose conflict;
   * CREATED_TIME usage bagCreator() and runOnClose();
   */
  infoLoader() {
    this.VERSION = "2.5.3";
    this.NPM = "www.npmjs.com/package/dndalertjs";
    this.GITHUB = "www.github.com/ismailfp/DNDAlert";
    this.IS_CLOSE = false;
    this.CREATED_TIME = new Date().getTime();
  }

  enumLoader() {
    this.OVERFLOW_ENUM = {
      HIDDEN: "hidden",
      AUTO: "auto",
    };
    this.THEME_ENUM = {
      WHITE: "white",
      DARK: "dark",
    };
    this.TYPE_LIST = ["success", "error", "warning", "info"];
    this.BUTTON_TYPE_LIST = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "light",
    ];
  }

  themeLoader() {
    const theme = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.theme);
    switch (theme) {
      case this.THEME_ENUM.WHITE:
        this.THEME = this.THEME_ENUM.WHITE;
        break;
      case this.THEME_ENUM.DARK:
        this.THEME = this.THEME_ENUM.DARK;
        break;
      default:
        this.THEME = this.THEME_ENUM.WHITE;
        break;
    }
  }

  PRE_INIT() {
    this.isBrowser();
    this.infoLoader();

    this.enumLoader();
    this.classListLoader();
    this.errorOptionsLoader();
    this.themeLoader();
    this.svgLoader();
    this.sourceControl();

    this.BODY = this.getBodyElement();
    this.OPEN_ANIMATION_CLOSE_CONFLICT_TIME =
      this.CLASS_LIST.openAnimation.duration + 100;
  }

  STARTER() {
    this.PRE_INIT();
    this.ERROR_CONTROL();
    this.INIT();
    this.DRAW();
  }

  createContainer() {
    let container = document.createElement("div");
    this.classAdder(container, [this.CLASS_LIST.container]);
    this.CONTEXT_PROVIDER_SET(this.CONTEXT_QUERY_NAME.containerRef, container);
  }
  createContentBox() {
    let opacity = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.opacity);
    let content_box = document.createElement("div");

    this.classAdder(content_box, [
      this.CLASS_LIST.superClass.content,
      this.CLASS_LIST[this.THEME].content,
    ]);

    content_box.style.opacity = opacity;
    if (this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.animationStatus)) {
      this.classAdder(content_box, [this.CLASS_LIST.openAnimation.class]);
      this.CONTEXT_PROVIDER_SET(
        this.CONTEXT_QUERY_NAME.openAnimationStatus,
        true
      );
      content_box.addEventListener("animationend", () => {
        if (
          content_box.classList.contains(this.CLASS_LIST.openAnimation.class)
        ) {
          content_box.classList.remove(this.CLASS_LIST.openAnimation.class);
          this.CONTEXT_PROVIDER_SET(
            this.CONTEXT_QUERY_NAME.openAnimationStatus,
            false
          );
        }
      });
    }
    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.content_boxRef,
      content_box
    );
  }
  createAlertTitle() {
    let title = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.title);
    let alert_title = document.createElement("h1");
    this.classAdder(alert_title, [
      this.CLASS_LIST.superClass.title,
      this.CLASS_LIST[this.THEME].title,
    ]);
    alert_title.innerText = title;
    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.alert_titleRef,
      alert_title
    );
  }

  createSvgElement() {
    let type = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.type);
    if (!type) return;
    let svgDiv = document.createElement("div");
    this.classAdder(svgDiv, [this.CLASS_LIST.superClass.svg]);
    svgDiv.innerHTML = this.SVG_LIST[type];
    return svgDiv;
  }

  createAlertMessage() {
    let message = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.message);
    let type = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.type);
    let html = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.html);
    let textAlign = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.textAlign
    );
    let alert_message = document.createElement("p");
    this.classAdder(alert_message, [
      this.CLASS_LIST.superClass.message,
      this.CLASS_LIST[this.THEME].message,
    ]);

    if (html) {
      alert_message.innerHTML = message;
    } else {
      alert_message.innerText = message;
    }

    alert_message.style.textAlign = textAlign;

    if (type) alert_message.prepend(this.createSvgElement());

    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.alert_messageRef,
      alert_message
    );
  }

  createTopRightCloseButton() {
    let close_button = document.createElement("button");
    this.classAdder(close_button, [
      this.CLASS_LIST.superClass.close_button,
      this.CLASS_LIST[this.THEME].close_button,
    ]);
    close_button.innerHTML = this.SVG_LIST.close;
    let tempFunc = () => {
      this.removeContainer();
    };
    close_button.addEventListener("click", tempFunc);

    this.CONTEXT_PROVIDER_SET(this.CONTEXT_QUERY_NAME.close_buttonRef, {
      ref: close_button,
      onClick: tempFunc,
    });
  }

  createHeader() {
    let header = document.createElement("div");
    let closeIcon = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.closeIcon
    );
    let title = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.title);
    this.classAdder(header, [
      this.CLASS_LIST.superClass.header,
      this.CLASS_LIST[this.THEME].header,
    ]);

    if (title)
      this.appendChild(header, [
        this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.alert_titleRef),
      ]);

    if (closeIcon) {
      this.createTopRightCloseButton();
      this.appendChild(header, [
        this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.close_buttonRef).ref,
      ]);
    }

    this.CONTEXT_PROVIDER_SET(this.CONTEXT_QUERY_NAME.headerRef, header);
  }

  bagCreator() {
    let CONTEXT = this.CONTEXT_PROVIDER_GET_ALL();
    delete CONTEXT.theme;
    const BAG_ELEMENT = {
      CLOSE_MODAL: () => {
        this.removeContainer();
      },
      PROPERTIES: {
        CREATED_TIME: this.CREATED_TIME,
        THEME: this.THEME,
        CONTEXT,
        VERSION: this.VERSION,
      },
    };

    return BAG_ELEMENT;
  }

  createButtonGroup() {
    let buttons = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.buttons);
    if (buttons.length === 0) return false;

    let buttonGroup = document.createElement("div");
    this.classAdder(buttonGroup, [this.CLASS_LIST.superClass.button_group]);
    let tempButtonRefArray = [];
    buttons.forEach((button) => {
      let tempClass;
      if (!button.class && button.type) {
        tempClass = this.CLASS_LIST.buttons[button.type];
      } else {
        tempClass = button.class || this.CLASS_LIST.buttons.light;
      }

      let buttonElement = document.createElement("button");
      buttonElement.innerText = button.text;
      buttonElement.className = tempClass;
      let clickTemp = async () => {
        await button.onClick(this.bagCreator());
      };
      buttonElement.addEventListener("click", clickTemp);
      this.appendChild(buttonGroup, [buttonElement]);
      tempButtonRefArray.push({
        ref: buttonElement,
        onClick: clickTemp,
      });
    });

    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.button_groupRef,
      buttonGroup
    );
    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.buttonsRef,
      tempButtonRefArray
    );
  }

  createMainElements() {
    this.createContainer();
    this.createContentBox();
    this.createAlertTitle();
    this.createAlertMessage();
    this.createHeader();
    this.createButtonGroup();
  }

  ERROR_CONTROL() {
    this.ERROR_PROCESSOR.forEach((error) => {
      if (error.condition) {
        error.success();
      }
    });
    this.button_ERROR_CONTROL();
  }
  button_ERROR_CONTROL() {
    let buttons = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.buttons);
    if (!Array.isArray(buttons) && buttons) {
      throw new Error(this.ERROR_LIST.buttons_array);
    } else if (buttons.length > 0) {
      buttons.forEach((button) => {
        if (button.click) {
          console.warn(this.ERROR_LIST.button_click_deprecated);
          button.onClick = button.click;
        }

        if (!button.text) {
          throw new Error(this.ERROR_LIST.button_text);
        }
        if (!button.onClick) {
          throw new Error(this.ERROR_LIST.button_click);
        }
        if (typeof button.onClick !== "function") {
          throw new Error(this.ERROR_LIST.button_click_type);
        }
        if (button.type && !this.BUTTON_TYPE_LIST.includes(button.type)) {
          throw new Error(this.ERROR_LIST.button_type);
        }
      });
    } else {
      return false;
    }
  }

  containerClickClose() {
    let closeBackgroundClick = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.closeBackgroundClick
    );

    if (closeBackgroundClick) {
      this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.containerRef
      ).addEventListener("click", (e) => {
        let openAnimationStatus = this.CONTEXT_PROVIDER_GET(
          this.CONTEXT_QUERY_NAME.openAnimationStatus
        );
        if (e.target.classList.contains(this.CLASS_LIST.container)) {
          if (openAnimationStatus) {
            /*
             * ThisTimeout
             * If the user clicks on the background for close the modal,
             * the modal will be closed after the animation is finished.
             *
             * OPEN_ANIMATION_CLOSE_CONFLICT_TIME
             * This is the time[?] that the animation will be finished.
             * [?] Animation Time + 100ms
             */
            setTimeout(() => {
              this.removeContainer();
            }, this.OPEN_ANIMATION_CLOSE_CONFLICT_TIME);
          } else {
            this.removeContainer();
          }
        }
      });
    }
  }

  contextBoxDrag() {
    /*
     * titleStatus
     * If the title is not defined,
     * the modal will not be draggable.
     *
     * Because the drag event is triggered by the header.
     * If the title is not defined,
     * the header will not be created.
     */
    let titleStatus = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.title);
    if (!titleStatus) return false;

    let contextBox = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.content_boxRef
    );

    let header = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.headerRef);
    let draggable = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.draggable
    );

    const defaultPosition = {
      x: contextBox.offsetLeft,
      y: contextBox.offsetTop,
    };

    if (draggable) {
      window.addEventListener("resize", () => {
        let viewPortWidth = window.innerWidth;

        if (viewPortWidth <= 700) {
          contextBox.position = "relative";
          contextBox.style.left = defaultPosition.x + "px";
          contextBox.style.top = defaultPosition.y + "px";
          return false;
        }
      });
      header.addEventListener("mousedown", (e) => {
        /*
         * viewPortWidth
         * If the viewPortWidth is less than 700,
         * the modal will not be draggable.
         * Because the modal will be full screen on mobile devices.
         */
        let viewPortWidth = window.innerWidth;
        if (viewPortWidth <= 700) return false;

        contextBox.style.position = "absolute";
        contextBox.style.zIndex = 9999;
        let shiftX = e.clientX - contextBox.getBoundingClientRect().left;
        let shiftY = e.clientY - contextBox.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
          contextBox.style.left = pageX - shiftX + "px";
          contextBox.style.top = pageY - shiftY + "px";
        }
        moveAt(e.pageX, e.pageY);

        function onMouseMove(e) {
          moveAt(e.pageX, e.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        contextBox.onmouseup = function () {
          document.removeEventListener("mousemove", onMouseMove);
        };

        contextBox.ondragstart = function () {
          return false;
        };
      });

      let title = this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.alert_titleRef
      );
      title.style.cursor = "auto";
      header.style.cursor = "move";
    }
  }

  getBodyElement() {
    let portalElement = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.portalElement
    );

    return portalElement;
  }

  classListLoader() {
    this.CLASS_LIST = {
      closeAnimation: {
        class: "dnd-alert-close",
        duration: 500,
      },
      openAnimation: {
        class: "dnd-alert-open",
        duration: 500,
      },
      container: "dnd-alert-container",
      superClass: {
        content: "dnd-alert-content-box",
        title: "dnd-alert-title",
        header: "dnd-alert-header",
        close_button: "dnd-alert-close-button",
        message: "dnd-alert-message",
        svg: "dnd-alert-svg",
        button_group: "dnd-alert-button-group",
      },
      white: {
        content: "dnd-alert-content-box-white",
        title: "dnd-alert-title-white",
        header: "dnd-alert-header-white",
        close_button: "dnd-alert-close-button-white",
        message: "dnd-alert-message-white",
      },
      dark: {
        content: "dnd-alert-content-box-dark",
        title: "dnd-alert-title-dark",
        header: "dnd-alert-header-dark",
        close_button: "dnd-alert-close-button-dark",
        message: "dnd-alert-message-dark",
      },
      buttons: {
        primary: "dnd-alert-button-primary",
        secondary: "dnd-alert-button-secondary",
        success: "dnd-alert-button-success",
        danger: "dnd-alert-button-danger",
        warning: "dnd-alert-button-warning",
        light: "dnd-alert-button-light",
      },
    };
  }

  appendChild(container, [...children]) {
    children.forEach((child) => {
      container.appendChild(child);
    });
  }

  errorOptionsLoader() {
    /*
     * props
     * Get all props from the context provider
     * for error handling.
     *
     * VSCode will show an error,
     * 'props' is declared but its value is never read.
     * Because the props are used in the
     * eval function. But it is not a problem.
     */
    let props = this.CONTEXT_PROVIDER_GET_ALL();

    this.ERROR_PREFIX = "DNDAlert: ";
    this.ERROR_LIST = {
      message: this.ERROR_PREFIX + "Message is required.",
      portalElement: this.ERROR_PREFIX + "Portal element not found.",
      type:
        this.ERROR_PREFIX +
        "Type is not valid. Type must be one of these: " +
        this.TYPE_LIST.join(", "),
      buttons_array: this.ERROR_PREFIX + "Buttons must be an array.",
      button_text: this.ERROR_PREFIX + "Button text is required.",
      button_click: this.ERROR_PREFIX + "Button onClick is required.",
      button_click_type:
        this.ERROR_PREFIX + "Button onClick must be a function.",
      button_type:
        this.ERROR_PREFIX +
        "Button type is not valid. Type must be one of these: " +
        this.BUTTON_TYPE_LIST.join(", "),
      button_click_deprecated:
        this.ERROR_PREFIX +
        "Button click is deprecated for cleaner code. Use onClick.",
      theme:
        this.ERROR_PREFIX +
        "Theme is not valid. Theme must be one of these: " +
        Object.values(this.THEME_ENUM).join(", "),
      overflow: this.ERROR_PREFIX + "Overflow is not valid.",
      onOpen: this.ERROR_PREFIX + "onOpen must be a function.",
      onClose: this.ERROR_PREFIX + "onClose must be a function.",
      opacity: this.ERROR_PREFIX + "Opacity must be between 0 and 1.",
    };
    this.ERROR_PROCESSOR = [
      {
        condition: eval("!props.message"),
        success: () => {
          throw new Error(this.ERROR_LIST.message);
        },
      },
      {
        condition: eval(
          "props.portalElement && props.portalElement instanceof Element === false"
        ),
        success: () => {
          throw new Error(this.ERROR_LIST.portalElement);
        },
      },
      {
        condition: eval("props.type && !this.TYPE_LIST.includes(props.type)"),
        success: () => {
          throw new Error(this.ERROR_LIST.type);
        },
      },
      {
        condition: eval(
          "props.theme && !Object.values(this.THEME_ENUM).includes(props.theme)"
        ),
        success: () => {
          throw new Error(this.ERROR_LIST.theme);
        },
      },
      {
        condition: eval("props.onOpen && typeof props.onOpen !== 'function'"),
        success: () => {
          throw new Error(this.ERROR_LIST.onOpen);
        },
      },
      {
        condition: eval("props.onClose && typeof props.onClose !== 'function'"),
        success: () => {
          throw new Error(this.ERROR_LIST.onClose);
        },
      },
      {
        condition: eval(
          "props.opacity && (props.opacity <= 0 || props.opacity > 1)"
        ),
        success: () => {
          throw new Error(this.ERROR_LIST.opacity);
        },
      },
    ];
  }

  sourceControl() {
    if (
      navigator.onLine &&
      this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.sourceControlWarning)
    ) {
      let API = fetch("https://registry.npmjs.org/dndalertjs");
      API.then((response) => {
        response.json().then((data) => {
          let latestVersion = data["dist-tags"].latest;
          let currentVersion = this.VERSION;
          if (latestVersion !== currentVersion) {
            console.warn(
              `\n\n DNDAlert: New version available: ${latestVersion} but you are using ${currentVersion}. \n Please update to latest version. \n\n ${this.NPM} \n\n or \n\n ${this.GITHUB} \n\n`
            );
          }
        });
      });
    }
  }

  isBrowser() {
    let isBrowser =
      typeof window !== "undefined" && typeof document !== "undefined";
    if (!isBrowser) {
      throw new Error("DNDAlert: This library is only for browser.");
    }
  }

  svgLoader() {
    let theme = this.THEME;
    this.SVG_COLOR_LIST = {
      white: {
        success: "#0ca678",
        error: "#e74c3c",
        warning: "#fab005",
        info: "#3498db",
        close: "#212529",
      },
      dark: {
        success: "#fff",
        error: "#fff",
        warning: "#fff",
        info: "#fff",
        close: "#fff",
      },
    };
    this.SVG_LIST = {
      success: ` 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST[theme].success} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      `,
      error: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST[theme].error} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      `,
      warning: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST[theme].warning} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      `,
      info: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST[theme].info} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      `,
      close: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${this.SVG_COLOR_LIST[theme].close}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      `,
    };
  }

  removeContainer() {
    let animation = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.animationStatus
    );
    if (animation) {
      let content_box = this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.content_boxRef
      );

      this.classAdder(content_box, [this.CLASS_LIST.closeAnimation.class]);

      content_box.addEventListener("animationend", () => {
        /*
         * if
         * content_box has closeAnimation class
         * then remove the container else
         * do nothing for openAnimation conflict.
         */
        if (
          content_box.classList.contains(this.CLASS_LIST.closeAnimation.class)
        ) {
          this.elementRuiner();
        }
      });
    } else {
      this.elementRuiner();
    }
  }
  async runOnClose() {
    let onClose = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.onClose);
    if (onClose && !this.IS_CLOSE) {
      this.IS_CLOSE = true;
      let BAG = this.bagCreator();
      let TIME_DIFF = new Date().getTime() - BAG.PROPERTIES.CREATED_TIME;
      let HOW_MANY_SECONDS = Math.floor(TIME_DIFF / 1000);
      BAG = {
        ...BAG,
        PROPERTIES: {
          ...BAG.PROPERTIES,
          HOW_MANY_SECONDS,
        },
      };
      await onClose(BAG);
    }
  }
  elementRuiner() {
    this.setBodyOverflow(this.OVERFLOW_ENUM.AUTO);

    this.removeListener();
    this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.containerRef).remove();
    this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.TEMP_STYLE_NODE).remove();

    this.runOnClose();
  }
  removeListener() {
    let buttons = this.CONTEXT_PROVIDER_GET(this.CONTEXT_QUERY_NAME.buttons);
    if (Array.isArray(buttons) && buttons.length > 0) {
      const buttonList = this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.buttonsRef
      );
      buttonList.forEach((button) => {
        button.ref.removeEventListener("click", button.onClick);
      });
    }
    let closeButtonStatus = this.CONTEXT_PROVIDER_GET(
      this.CONTEXT_QUERY_NAME.closeIcon
    );
    if (closeButtonStatus) {
      const closeButton = this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.close_buttonRef
      );
      closeButton.ref.removeEventListener("click", closeButton.onClick);
    }
  }
  setBodyOverflow(ENUM_VALUE) {
    if (Object.values(this.OVERFLOW_ENUM).includes(ENUM_VALUE)) {
      let portalOverflowHidden = this.CONTEXT_PROVIDER_GET(
        this.CONTEXT_QUERY_NAME.portalOverflowHidden
      );

      if (ENUM_VALUE === this.OVERFLOW_ENUM.HIDDEN && portalOverflowHidden) {
        this.CONTEXT_DEFAULT_VALUES.portalElement.style.overflow = ENUM_VALUE;
      } else {
        this.CONTEXT_DEFAULT_VALUES.portalElement.style.removeProperty(
          "overflow"
        );
      }
    } else {
      throw new Error(this.ERROR_LIST.overflow);
    }
  }
  cssLoader() {
    const CSS = `@import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,500;1,700;1,900&display=swap);.dnd-alert-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background-color:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:top;padding-top:100px;font-family:Roboto,sans-serif;overflow:auto}.dnd-alert-content-box{width:400px;height:min-content;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,.5)}.dnd-alert-content-box-dark{background-color:#333}.dnd-alert-content-box-white{background-color:#fff}.dnd-alert-title{font-size:16px;font-weight:700}.dnd-alert-message-dark,.dnd-alert-title-dark{color:#fff}.dnd-alert-message-white,.dnd-alert-title-white{color:#333}.dnd-alert-header{padding:10px;font-size:14px;display:flex;justify-content:space-between;align-items:center;border-radius:5px 5px 0 0}.dnd-alert-header-dark{color:#fff;background-color:#222;border-bottom:1px solid #cccccc29}.dnd-alert-header-white{color:#333;background-color:#eee;border-bottom:1px solid #ccc}.dnd-alert-close-button{border:none;display:flex;justify-content:center;align-items:center;cursor:pointer;outline:0}.dnd-alert-close-button:focus{outline:0}.dnd-alert-close-button-dark{background-color:#222}.dnd-alert-close-button-white{background-color:#eee}.dnd-alert-message{font-size:14px;display:flex;padding:0 10px;flex-direction:column;justify-content:center;align-items:center}.dnd-alert-button-primary,.dnd-alert-button-secondary{color:#fff;font-size:16px;font-weight:400;cursor:pointer;transition:background-color .3s}.dnd-alert-button-group{margin-top:20px;display:flex;justify-content:space-between;align-items:center;padding:10px;gap:10px}.dnd-alert-button-group>button{width:100%}.dnd-alert-close{animation:.5s ease-in-out modalCloseAnimation}.dnd-alert-open{animation:.5s ease-in-out modalOpenAnimation}.dnd-alert-button-primary{background-color:#007bff;border:1px solid #007bff;padding:10px;border-radius:5px}.dnd-alert-button-primary:hover{background-color:#0069d9}.dnd-alert-button-secondary{background-color:#6c757d;border:1px solid #6c757d;padding:10px;border-radius:5px}.dnd-alert-button-secondary:hover{background-color:#5a6268}.dnd-alert-button-light{background-color:#f8f9fa;border:1px solid #f8f9fa;color:#212529;padding:10px;border-radius:5px;font-size:16px;font-weight:400;cursor:pointer;transition:background-color .3s}.dnd-alert-button-danger,.dnd-alert-button-success,.dnd-alert-button-warning{color:#fff;padding:10px;font-size:16px;font-weight:400;cursor:pointer;transition:background-color .3s}.dnd-alert-button-light:hover{background-color:#e2e6ea}.dnd-alert-button-success{background-color:#28a745;border:1px solid #28a745;border-radius:5px}.dnd-alert-button-success:hover{background-color:#218838}.dnd-alert-button-danger{background-color:#dc3545;border:1px solid #dc3545;border-radius:5px}.dnd-alert-button-danger:hover{background-color:#c82333}.dnd-alert-button-warning{background-color:#ffc107;border:1px solid #ffc107;border-radius:5px}.dnd-alert-button-warning:hover{background-color:#e0a800}.dnd-alert-svg{margin-bottom:15px}.dnd-alert-svg svg{width:60px;height:60px;animation:.5s ease-in-out svgLoadingAnimation}@keyframes modalCloseAnimation{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(100px)}}@keyframes modalOpenAnimation{0%{opacity:0;transform:translateY(100px)}100%{opacity:1;transform:translateY(0)}}@keyframes svgAnimation{0%{opacity:0;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes svgLoadingAnimation{0%{stroke-dashoffset:0;transform:rotate(0)}100%{stroke-dashoffset:1000;transform:rotate(360deg)}}@media screen and (max-width:700px){.dnd-alert-container{padding-top:0}.dnd-alert-content-box{width:100%;height:100%;border-radius:0;box-shadow:none}.dnd-alert-header{border-bottom:none;border-radius:0}.dnd-alert-button-group{border-top:none;display:flex;flex-direction:column}}`;
    const TEMP_STYLE_NODE = document.createElement("style");
    TEMP_STYLE_NODE.innerHTML = CSS;
    this.CONTEXT_PROVIDER_SET(
      this.CONTEXT_QUERY_NAME.TEMP_STYLE_NODE,
      TEMP_STYLE_NODE
    );
    this.appendChild(document.head, [TEMP_STYLE_NODE]);
  }

  classAdder(element, [...classes]) {
    classes.forEach((className) => {
      element.classList.add(className);
    });
  }

}
