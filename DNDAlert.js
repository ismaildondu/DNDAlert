/* 
DNDAlert is a simple JavaScript library alert for web developers.
by İsmail Döndü - 2023
*/

class DNDAlert {
  constructor(props) {
    this.PRE_INIT(props);
    this.errorControl(props);
    this.DRAW(this.INIT(props));
  }

  INIT(props) {
    const { container, content_box, alert_message, header, button_group } =
      this.createMainElements({ ...props, theme: this.THEME });

    this.appendChild(content_box, [header, alert_message]);
    if (button_group) {
      this.appendChild(content_box, [button_group]);
    }
    this.appendChild(container, [content_box]);

    this.containerClickClose(container, props.closeBackgroundClick);

    return container;
  }
  DRAW(containerRef) {
    this.setBodyOverflow(this.OVERFLOW_ENUM.HIDDEN);
    this.appendChild(this.BODY, [containerRef]);
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
  }

  themeLoader(theme) {
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

  PRE_INIT(props) {
    this.enumLoader();
    this.classListLoader();
    this.errorOptionsLoader(props);
    this.themeLoader(props.theme);
    this.svgLoader(this.THEME);

    this.BODY = this.getBodyElement(props.portalElement);
  }

  createContainer() {
    let container = document.createElement("div");
    container.classList.add(this.CLASS_LIST.container);
    return container;
  }
  createContentBox(theme) {
    let content_box = document.createElement("div");
    content_box.classList.add(this.CLASS_LIST[theme].content);
    return content_box;
  }
  createAlertTitle(title, theme) {
    let alert_title = document.createElement("h1");
    alert_title.classList.add(this.CLASS_LIST[theme].title);
    alert_title.innerHTML = title;
    return alert_title;
  }

  createSvgElement(type, theme) {
    let svgDiv = document.createElement("div");
    svgDiv.classList.add(this.CLASS_LIST[theme].svg);
    svgDiv.innerHTML = this.SVG_LIST[type];
    return svgDiv;
  }

  createAlertMessage(message, type, html, text_align, theme) {
    let alert_message = document.createElement("p");
    alert_message.classList.add(this.CLASS_LIST[theme].message);

    if (html) {
      alert_message.innerHTML = message;
    } else {
      alert_message.innerText = message;
    }

    alert_message.style.textAlign = text_align;

    alert_message.prepend(this.createSvgElement(type, theme));

    return alert_message;
  }

  createTopRightCloseButton(containerRef, theme) {
    let close_button = document.createElement("button");
    close_button.classList.add(this.CLASS_LIST[theme].close_button);
    close_button.innerHTML = "X";
    if (theme === this.THEME_ENUM.DARK) {
      close_button.style.color = "#000";
    }
    close_button.addEventListener("click", () => {
      this.removeContainer(containerRef);
    });
    return close_button;
  }

  createHeader(titleRef, containerRef, theme) {
    let title = titleRef;
    let header = document.createElement("div");
    header.classList.add(this.CLASS_LIST[theme].header);
    header.appendChild(title);
    header.appendChild(this.createTopRightCloseButton(containerRef, theme));

    return header;
  }

  createButtonGroup(buttons, containerRef, theme) {
    if (buttons.length === 0) return false;

    const BAG_ELEMENT = {
      CLOSE_MODAL: () => {
        this.removeContainer(containerRef);
      },
    };

    let buttonGroup = document.createElement("div");
    buttonGroup.classList.add(this.CLASS_LIST[theme].button_group);

    buttons.forEach((button) => {
      let className = button.class || this.CLASS_LIST[theme].button;
      let buttonElement = document.createElement("button");
      buttonElement.innerText = button.text;
      buttonElement.className = className;
      buttonElement.addEventListener("click", () => {
        button.click(BAG_ELEMENT);
      });
      buttonGroup.appendChild(buttonElement);
    });

    return buttonGroup;
  }

  createMainElements({
    title,
    message,
    type = this.TYPE_LIST[3], // [0] success, [1] error, [2] warning, [3] info -> enumLoader() -> TYPE_LIST
    html = false,
    buttons = [],
    text_align = "left",
    theme,
  }) {
    let container = this.createContainer();
    let content_box = this.createContentBox(theme);
    let alert_title = this.createAlertTitle(title, theme);
    let alert_message = this.createAlertMessage(
      message,
      type,
      html,
      text_align,
      theme
    );
    let header = this.createHeader(alert_title, container, theme);

    let button_group = this.createButtonGroup(buttons, container, theme);

    return { container, content_box, alert_message, header, button_group };
  }

  errorControl(props) {
    this.ERROR_PROCESSOR.forEach((error) => {
      if (error.condition) {
        error.success();
      }
    });
    this.buttonErrorControl(props.buttons);
  }
  buttonErrorControl(buttons = false) {
    if (!Array.isArray(buttons) && buttons) {
      throw new Error(this.ERROR_LIST.buttons_array);
    } else if (buttons.length > 0) {
      buttons.forEach((button) => {
        if (!button.text) {
          throw new Error(this.ERROR_LIST.button_text);
        }
        if (!button.click) {
          throw new Error(this.ERROR_LIST.button_click);
        }
        if (typeof button.click !== "function") {
          throw new Error(this.ERROR_LIST.button_click_type);
        }
      });
    } else {
      return false;
    }
  }

  containerClickClose(containerRef, closeBackgroundClick = true) {
    if (closeBackgroundClick) {
      containerRef.addEventListener("click", (e) => {
        if (e.target.classList.contains(this.CLASS_LIST.container)) {
          this.removeContainer(containerRef);
        }
      });
    }
  }

  getBodyElement(portalElement) {
    if (portalElement) {
      return portalElement;
    }
    return document.body;
  }

  classListLoader() {
    this.CLASS_LIST = {
      container: "dnd-alert-container",
      white: {
        content: "dnd-alert-content-box",
        title: "dnd-alert-title",
        message: "dnd-alert-message",
        close_button: "dnd-alert-close-button",
        header: "dnd-alert-header",
        svg: "dnd-alert-svg",
        button_group: "dnd-alert-button-group",
        button: "dnd-alert-default-button",
      },
      dark: {
        content: "dnd-alert-content-box-dark",
        title: "dnd-alert-title-dark",
        message: "dnd-alert-message-dark",
        close_button: "dnd-alert-close-button-dark",
        header: "dnd-alert-header-dark",
        svg: "dnd-alert-svg-dark",
        button_group: "dnd-alert-button-group-dark",
        button: "dnd-alert-default-button-dark",
      },
    };
  }

  appendChild(container, [...children]) {
    children.forEach((child) => {
      container.appendChild(child);
    });
  }

  errorOptionsLoader(props) {
    this.ERROR_PREFIX = "DNDAlert: ";
    this.ERROR_LIST = {
      title: this.ERROR_PREFIX + "Title is required.",
      message: this.ERROR_PREFIX + "Message is required.",
      portalElement: this.ERROR_PREFIX + "Portal element not found.",
      type:
        this.ERROR_PREFIX +
        "Type is not valid. Type must be one of these: " +
        this.TYPE_LIST.join(", "),
      buttons_array: this.ERROR_PREFIX + "Buttons must be an array.",
      button_text: this.ERROR_PREFIX + "Button text is required.",
      button_click: this.ERROR_PREFIX + "Button click is required.",
      button_click_type: this.ERROR_PREFIX + "Button click must be a function.",
      theme:
        this.ERROR_PREFIX +
        "Theme is not valid. Theme must be one of these: " +
        Object.values(this.THEME_ENUM).join(", "),
    };
    this.ERROR_PROCESSOR = [
      {
        condition: eval("!props.title"),
        success: () => {
          throw new Error(this.ERROR_LIST.title);
        },
      },
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
    ];
  }

  svgLoader(theme) {
    this.SVG_COLOR_LIST = {
      white: {
        success: "#0ca678",
        error: "#e74c3c",
        warning: "#fab005",
        info: "#3498db",
      },
      dark: {
        success: "#40c057",
        error: "#ff6b6b",
        warning: "#fcc419",
        info: "#3bc9db",
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
    };
  }

  removeContainer(containerRef) {
    this.setBodyOverflow(this.OVERFLOW_ENUM.AUTO);
    containerRef.remove();
  }
  setBodyOverflow(ENUM_VALUE) {
    this.BODY.style.overflow = ENUM_VALUE;
  }
}
