type Sort = {
  field: string;
  order: "ASC" | "DESC";
};

type Filter = {
  field: string;
  operator: "$eq" | "$ne" | "$like";
  value: string | number;
};


export type QueryParams = {
  page?: number;
  limit?: number;
  sorts?: any[];
  filters?: any[];
};


export function Builder(params: {
  page?: number;
  limit?: number;
  sorts?: Sort[];
  filters?: Filter[];
}) {
  const query: string[] = [];

  // page
  if (params.page) {
    query.push(`page=${params.page}`);
  }

  // limit
  if (params.limit) {
    query.push(`limit=${params.limit}`);
  }

  // sort
  params.sorts?.forEach((s, i) => {
    query.push(`sort[${i}]=${s.field},${s.order}`);
  });

  // filter
  params.filters?.forEach((f, i) => {
    query.push(
      `filter[${i}]=${f.field}||${f.operator}||${f.value}`
    );
  });

  return query.length ? `?${query.join("&")}` : "";
}
