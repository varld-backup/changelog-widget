import CoreSDK, { CtorOpts } from 'changelog-core';

interface WidgetOpts extends CtorOpts {
  element: HTMLElement
};

// Set up styles for the widget
let createStyles = () => {
  let style = document.createElement('style');
  style.textContent = `
    @media screen and (max-width: 500px) {
      .changes-widget {
        position: fixed!important;
        top: 0px!important;
        left: 0px!important;
        right: 0px!important;
        bottom: 0px!important;
        transform: unset!important;
        width: unset!important;
        height: unset!important;
        transition: opacity .3s!important;
      }
    }

    @media screen and (min-width: 500px) {
      .cl-small {
        left: 0px!important;
        transform: unset!important;
      }
    }
  `;

  document.head.appendChild(style);
}

class WidgetSDK extends CoreSDK {
  private element: HTMLDivElement;
  private wrapper: HTMLElement;
  public isOpen: boolean;
  private clickHandler: () => void;

  constructor(opts: WidgetOpts) {
    super(Object.assign(opts, {
      mode: 'widget'
    }));

    this.clickHandler = () => {
      if (this.removed) return;

      this.toggle();
    };

    this.wrapper = opts.element;
    this.wrapper.style.position = 'relative';
    this.wrapper.addEventListener('click', this.clickHandler);

    // Create an container-element for the iframe
    this.element = document.createElement('div');
    this.element.setAttribute('changes-widget', '');
    this.element.classList.add('changes-widget');
    this.element.style.position = 'absolute';
    this.element.style.left = '50%';
    this.element.style.zIndex = '50000';
    this.element.style.transition = 'opacity .3s, top .3s, left .3s, right .3s';
    this.element.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.09)';
    this.element.style.transform = 'translate(-50%, 0px)'
    this.element.style.top = '90%';
    this.element.style.top = 'calc(100% - 5px)';
    this.element.style.opacity = '0';
    this.element.style.width = '350px';
    this.element.style.height = '420px';
    this.element.style.pointerEvents = 'none';
    this.element.appendChild(this.iframe);
    this.wrapper.appendChild(this.element);

    this.isOpen = false;

    // Setup work
    this.initStyle();
    this.addSizeClass();

    setInterval(() => {
      if (this.removed) return;

      this.addSizeClass();
    }, 200);

    document.addEventListener('click', e => {
      // Close widget on outside-click
      if (!this.removed && this.isOpen) {
        let currentTarget = e.target;
        let isWrapper = currentTarget == this.wrapper;
1
        while (currentTarget && currentTarget != this.wrapper && currentTarget != document.body) {
          try {
            // @ts-ignore
            currentTarget = currentTarget.parentNode;

            if (currentTarget == this.wrapper) {
              isWrapper = true;
            }
          } catch (err) {
            break;
          }
        }

        if (!isWrapper) {
          this.close();
        }
      }
    });

    window.addEventListener('resize', () => {
      if (this.removed) return;

      this.addSizeClass();
    });

    this.on('message', message => {
      if (message.type == 'changes-close') {
        this.close();
      }
    });
  }

  private addSizeClass() {
    let rect = this.wrapper.getBoundingClientRect();

    // Add the right class to the container-element, depending on the wrapper's position
    if (rect.left + (rect.width / 2) < 175 && !this.element.classList.contains('cl-small')) {
      this.element.classList.add('cl-small');
    } else if (rect.left + (rect.width / 2) > 175 && this.element.classList.contains('cl-small')) {
      this.element.classList.remove('cl-small');
    }
  }

  private initStyle() {
    let el: HTMLStyleElement | undefined;

    try {
      el = document.querySelector('style[data-changes="changes"]')
    } catch (err) {}

    if (!el) {
      createStyles();
    }
  }

  public remove() {
    if (!this.element) return false;

    this.wrapper.removeEventListener('click', this.clickHandler);
    this.element.remove();

    return super.remove();
  }

  public open() {
    this.element.style.top = 'calc(100% + 5px)';
    this.element.style.opacity = '1';
    this.element.style.pointerEvents = 'all';
    this.isOpen = true;
  }

  public close() {
    this.element.style.top = '90%';
    this.element.style.top = 'calc(100% - 5px)';
    this.element.style.opacity = '0';
    this.element.style.pointerEvents = 'none';
    this.isOpen = false;
  }

  public toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

export default WidgetSDK;
