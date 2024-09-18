import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
}

const store = new Store({
  list: [
    { code: generateCode(), title: 'Название товара', price: 100.0 },
    { code: generateCode(), title: 'Книга про React', price: 770 },
    { code: generateCode(), title: 'Конфета', price: 33 },
    { code: generateCode(), title: 'Трактор', price: 7955320 },
    { code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000 },
    { code: generateCode(), title: 'Карандаши цветные', price: 111 },
    { code: generateCode(), title: 'Товар сюрприз', price: 0 },
  ],
  cart: {},
  modal: {
    isOpen: false,
  },
});

export const ACTION = {
  toggleModal() {
    const oldState = store.getState();
    const oldModal = oldState.modal;
    const newModal = { isOpen: !oldModal.isOpen };

    const newState = {
      ...oldState,
      modal: newModal,
    };

    store.setState(newState);
  },

  addGoodToCart(codeOfGood) {
    const oldState = store.getState();
    const oldCart = oldState.cart;
    const newGoodInCart = {
      code: codeOfGood,
      count: oldCart[codeOfGood]?.count ? ++oldCart[codeOfGood].count : 1,
    };

    const newState = {
      ...oldState,
      cart: {
        ...oldCart,
        [codeOfGood]: newGoodInCart,
      },
    };

    store.setState(newState);
  },

  removeGoodFromCart(codeOfGood) {
    const oldState = store.getState();
    const oldCart = oldState.cart;
    delete oldCart[codeOfGood];

    const newState = {
      ...oldState,
      cart: { ...oldCart },
    };

    store.setState(newState);
  },

  buildCartInfo() {
    const oldState = store.getState();
    const oldCart = oldState.cart;
    const oldListOfGoods = oldState.list;
    const newGoodsInfo = [];

    for (const infoCartGood of Object.values(oldCart)) {
      const good = oldListOfGoods.find(good => good.code === infoCartGood.code);

      newGoodsInfo.push({
        code: good.code,
        title: good.title,
        price: good.price,
        count: infoCartGood.count,
      });
    }

    return newGoodsInfo;
  },
};

export default store;
