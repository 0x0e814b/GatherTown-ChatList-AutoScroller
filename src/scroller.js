var GatherChatScroller = GatherChatScroller || (function () {
  const nameSpace = 'GCS';
  const sideBarContainer = 'GameComponent-container div';
  const chatListSelector = 'css-1vsfs08';
  let instance;

  const container = document.createElement('checker');
  Object.assign(container.style, {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '.3rem',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '.6rem'
  });

  const label = document.createElement('label');
  label.style.display = 'flex';
  label.style.alignItems = 'center';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const text = document.createTextNode('Toggle ChatList Scroll');
  label.appendChild(checkbox);
  label.appendChild(text);

  container.appendChild(label);

  function ChatScroller() {
    const gameContainer = document.querySelector(`.${sideBarContainer} div`);
    if (!gameContainer)
      throw new Error('chatBar not shown');

    // check initial openState;
    let sideBarOpened = Boolean(gameContainer.children[1]);
    if (sideBarOpened) {
      gameContainer.children[1].appendChild(container);
    }

    const container$ = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') return;
        if (!sideBarOpened && mutation.target !== gameContainer) return;

        if (sideBarOpened && mutation.removedNodes.length && mutation.removedNodes[0] === gameContainer.children[1]) {
          sideBarOpened = false;
          return;
        }

        const chatBar = gameContainer.children[1];

        if (mutation.target === gameContainer && mutation.addedNodes[0] === chatBar) {
          if (sideBarOpened) {
            sideBarOpened = false;
            return;
          }

          sideBarOpened = true;
          chatBar.appendChild(container);
        }

        if (!checkbox.checked) return;

        const hasAddedChat = Array.from(mutation.addedNodes).filter(tag => tag.nodeName === "P").length;
        const chatWrapAdded = mutation.target.classList.contains(chatListSelector);
        if (!hasAddedChat && !chatWrapAdded) return;

        let list = chatBar.querySelector(`.${chatListSelector}`);
        if (!list) return;

        list.scrollTop = list.scrollHeight;
        console.log(`[${nameSpace}] scrolled to new chat`);

        list = null;
      });
    });

    container$.observe(gameContainer, {
      childList: true,
      subtree: true
    });
  }

  return {
    init: () => instance ?? (instance = new ChatScroller())
  }
}
)();

function Observing() {
  let root = document.getElementById('root');
  let rootMutate = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'childList') return;
      if (!mutation.addedNodes.length) return;
      const gameContainerLoaded = Array.from(mutation.addedNodes).findIndex(node => node?.classList?.contains("GameComponent-container"));
      if (gameContainerLoaded > -1) {
        GatherChatScroller.init();

        rootMutate.disconnect();
        root = null;
        rootMutate = null;
      }
    })
  });
  rootMutate.observe(root, { childList: true, subtree: true });
}

Observing();
