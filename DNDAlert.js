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

  createContainer(CLASS_NAME = this.CLASS_LIST.container) {
    let container = document.createElement("div");
    container.classList.add(CLASS_NAME);

    return container;
  }
  createContentBox(CLASS_NAME = this.CLASS_LIST.content) {
    let content_box = document.createElement("div");
    content_box.classList.add(CLASS_NAME);
    return content_box;
  }
  createAlertTitle(title) {
    let alert_title = document.createElement("h1");
    alert_title.classList.add(this.CLASS_LIST.title);
    alert_title.innerHTML = title;
    return alert_title;
  }

  createSvgElement(type) {
    let svgDiv = document.createElement("div");
    svgDiv.classList.add(this.CLASS_LIST.svg);
    svgDiv.innerHTML = this.SVG_LIST[type];
    return svgDiv;
  }

  createAlertMessage(message, type, html, text_align) {
    let alert_message = document.createElement("p");
    alert_message.classList.add(this.CLASS_LIST.message);

    if (html) {
      alert_message.innerHTML = message;
    } else {
      alert_message.innerText = message;
    }

    alert_message.style.textAlign = text_align;

    alert_message.prepend(this.createSvgElement(type));

    return alert_message;
  }

  createTopRightCloseButton(containerRef) {
    let close_button = document.createElement("button");
    close_button.classList.add(this.CLASS_LIST.close_button);
    close_button.innerHTML = "X";
    close_button.addEventListener("click", () => {
      this.removeContainer(containerRef);
    });
    return close_button;
  }

  createHeader(titleRef, containerRef) {
    let title = titleRef;
    let header = document.createElement("div");
    header.classList.add(this.CLASS_LIST.header);
    header.appendChild(title);
    header.appendChild(this.createTopRightCloseButton(containerRef));

    return header;
  }

  createButtonGroup(buttons, containerRef) {
    if (buttons.length === 0) return false;

    const BAG_ELEMENT = {
      CLOSE_MODAL: () => {
        this.removeContainer(containerRef);
      },
    };

    let buttonGroup = document.createElement("div");
    buttonGroup.classList.add(this.CLASS_LIST.button_group);

    buttons.forEach((button) => {
      let className = button.class || "dnd-alert-default-button";
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
    type = "info",
    html = false,
    buttons = [],
    text_align = "left",
  }) {
    let container = this.createContainer();
    let content_box = this.createContentBox();
    let alert_title = this.createAlertTitle(title);
    let alert_message = this.createAlertMessage(
      message,
      type,
      html,
      text_align
    );
    let header = this.createHeader(alert_title, container);

    let button_group = this.createButtonGroup(buttons, container);

    return { container, content_box, alert_message, header, button_group };
  }

  errorControl() {
    this.ERROR_PROCESSOR.forEach((error) => {
      if (error.condition) {
        error.success();
      }
    });
  }

  containerClickClose(containerRef, closeBackgroundClick) {
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
      content: "dnd-alert-content-box",
      title: "dnd-alert-title",
      message: "dnd-alert-message",
      close_button: "dnd-alert-close-button",
      header: "dnd-alert-header",
      svg: "dnd-alert-svg",
      button_group: "dnd-alert-button-group",
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
    ];
  }

  svgLoader() {
    this.TYPE_LIST = ["success", "error", "warning", "info"];
    this.SVG_COLOR_LIST = {
      success: "#0ca678",
      error: "#e74c3c",
      warning: "#fab005",
      info: "#3498db",
    };
    this.SVG_LIST = {
      success: ` 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST.success} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      `,
      error: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST.error} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      `,
      warning: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST.warning} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      `,
      info: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${this.SVG_COLOR_LIST.info} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
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

  PRE_INIT(props) {
    this.OVERFLOW_ENUM = {
      HIDDEN: "hidden",
      AUTO: "auto",
    };
    this.classListLoader();
    this.svgLoader();
    this.errorOptionsLoader(props);
    this.BODY = this.getBodyElement(props.portalElement);
  }

  INIT(props) {
    const { container, content_box, alert_message, header, button_group } =
      this.createMainElements(props);

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
}

function example() {
  const DNDALERT = new DNDAlert({
    title: "Test Alert",
    message:
      "DNDAlert is a simple JavaScript library alert for web developers.",
    type: "warning",
    html: false,
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
    portalElement: document.querySelector("body"),
    text_align: "center",
  });
}
