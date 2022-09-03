export interface IItemCategory {
    id: string,
    title: string,
    slug: string,
    description: string,
    data_extra: string,
    is_enabled: boolean,
    parent_id: string,
    created_at: string,
    updated_at: string,
    cover: IItemCategoryCover
}

export interface IItemCategoryCover {
    id: string,
    url: string,
    slug: string,
    ref_table: string,
    created_at: string,
    updated_at: string
}
