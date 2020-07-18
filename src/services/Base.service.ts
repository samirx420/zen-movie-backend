import { NextFunction, Response, Request } from "express";

class BaseService {

    public _normaliza_page(page, limit) {
        let _page = parseInt(page as string, 10);

        if (isNaN(_page) || _page < 1) {
            _page = 1;
        }

        let _limit = parseInt(limit as string, 10);

        if (isNaN(_limit)) {
            _limit = 10;
        } else if (_limit > 50) {
            _limit = 50;
        } else if (_limit < 1) {
            _limit = 1;
        }

        let offset = _page - 1;

        return {
            limit: _limit,
            offset: offset,
        }

    }

    public async _get_all_paged(options: { model: any, page?: string, limit?: string, search?: string, order?: string, sort?: string, fields?: string, eager?: any, where?: any }) {
        try {
            let _fields = options.fields ? options.fields.split(',') : undefined;


            let _page = parseInt(options.page, 10);

            if (isNaN(_page) || _page < 1) {
                _page = 1;
            }

            let _limit = parseInt(options.limit, 10);

            if (isNaN(_limit)) {
                _limit = 10;
            } else if (_limit > 50) {
                _limit = 50;
            } else if (_limit < 1) {
                _limit = 1;
            }

            let offset = _page - 1;


            console.log(offset, options.limit)

            let query = options.model
                .query();

            if (options.search != undefined || _fields != undefined) {
                _fields.forEach((field) => {
                    query.orWhere(field, 'like', '%' + options.search + '%');
                })
            }

            if (options.sort != undefined) {
                if (options.order != undefined) {
                    query.orderBy(options.sort, options.order);
                }

            }

            if (options.eager) {
                query.withGraphFetched(options.eager)
            }

            if (options.where) {
                query.where(options.where)
            }

            let dataset = await query
                .page(offset, options.limit)
                .where({
                    is_deleted: false
                })
                .debug(true);

            let response = {
                data: dataset.results,
                paged: {
                    page: _page,
                    pageSize: _limit,
                    rowCount: dataset.total,
                    pageCount: Math.ceil(dataset.total / _limit)
                }
            };

            return response;
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    public async _get_all(options: { model: any, search?: string, order?: string, sort?: string, fields?: string, eager?: any, where?: any }) {
        try {
            let _fields = options.fields ? options.fields.split(',') : undefined;

            let query = options.model
                .query();

            if (options.search != undefined || _fields != undefined) {
                _fields.forEach((field) => {
                    query.orWhere(field, 'like', '%' + options.search + '%');
                })
            }

            if (options.sort != undefined) {
                if (options.order != undefined) {
                    query.orderBy(options.sort, options.order);
                }

            }

            if (options.eager) {
                query.withGraphFetched(options.eager)
            }

            if (options.where) {
                query.where(options.where)
            }

            let dataset = await query
                .debug(true);

            return dataset;
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }

    public async _get_by_id(Model: any, id: string, eager?: any) {
        try {

            let query = Model
                .query();

            if (eager) {
                query.withGraphFetched(eager)
            }

            let response = await query
                .findById(id)
                .debug(true);

            if (response) {

                return response
            }

            throw ({ message: 'notfound' })
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    public async _create(Model: any, payload: any) {
        try {

            let result = await Model
                .query()
                .insert(payload)
                .debug(true);

            return result;
        } catch (error) {
            console.log(error)
            throw (error);
        }
    }

    public async _create_graph(Model: any, payload: any) {
        try {

            let result = await Model
                .query()
                .insertGraph(payload)
                .debug(true);

            return result;
        } catch (error) {
            console.log(error)
            throw (error);
        }
    }

    public async _update(Model: any, id: string, payload: any, fields: string[]) {
        try {
            let result = await Model
                .query()
                .findById(id).debug(true);

            if (result) {
                let mapped = fields.reduce((acc, item) => {
                    return {
                        ...acc,
                        [item]: payload[item] || result[item],
                    };
                }, {});

                let resultUpdate = await Model
                    .query()
                    .patch({ ...mapped, modified_at: new Date() })
                    .where({ id: id });

                return resultUpdate;
            }

            throw ({ message: 'not found with id ' + id })

        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    public async _delete(Model: any, id: string) {
        try {
            let result = await Model
                .query()
                .findById(id).debug(true);

            if (result) {
                let resultDelete = await Model
                    .query()
                    .deleteById(id)

                return { message: 'delete success' };
            }

            throw ({
                message: 'not found with id ' + id
            })

        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    public async _soft_delete(Model: any, id: string) {
        try {
            let result = await Model
                .query()
                .findById(id).debug(true);

            if (result) {
                let resultDelete = await Model
                    .query()
                    .patch({
                        is_deleted: true
                    })
                    .where({ id: id }).debug(true);

                return { message: 'delete success' };
            }

            throw ({
                message: 'not found with id ' + id
            })

        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

}

export default new BaseService();