export interface PaginationQueryParams {
  page?: number
  items?: number
}

export interface Paginated<T> {
    data: T[],
    pagination: {
      pageNumber: number,
      pageSize: number,
      totalCont: number
    },
    links: {
      last: string,
      first: string
      prev?: string,
      next?: string,
    }
}
