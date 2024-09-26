import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      limit: 10,
      pageIndex: 0,
      dataCount: 0
    };
  }

  updatePagination(newPaginationData){
    this.setState(newPaginationData, `обновление пагинации`);
  }
}

export default Pagination;
