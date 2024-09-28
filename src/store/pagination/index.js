import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      limit: 0,
      pageIndex: 0,
      dataCount: 0,
    };
  }

  updatePagination(newPaginationData) {
    newPaginationData.limit = newPaginationData.limit ?? 10;
    this.setState(newPaginationData, `обновление пагинации`);
  }
}

export default Pagination;
