import StoreModule from '../module';
import { getItemById } from '../../api';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      // @todo Закрыл по быстрячку, чтобы товары добавлялись в корзину, когда пользователь открыл товар напрямую по ссылку, а не с Главной
      getItemById(_id)
        .then(data => {
          const item = data.result;
          // list уже новый, в него можно пушить.
          list.push({ ...item, amount: 1 });
          // Добавляем к сумме.
          sum += item.price;

          this.setState(
            {
              ...this.getState(),
              list,
              sum,
              amount: list.length,
            },
            'Добавление в корзину',
          );
        })
        .catch(() => {});
      return;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
