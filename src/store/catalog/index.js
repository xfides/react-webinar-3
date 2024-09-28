import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
    };
  }

  setData(newList) {
    this.setState(
      {
        ...this.getState(),
        list: newList,
      },
      'Установлены товары напрямую',
    );
  }
}

export default Catalog;
