import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/technicians',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TechnicianController::index
 * @see app/Http/Controllers/TechnicianController.php:11
 * @route '/admin/technicians'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\TechnicianController::store
 * @see app/Http/Controllers/TechnicianController.php:19
 * @route '/admin/technicians'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/technicians',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TechnicianController::store
 * @see app/Http/Controllers/TechnicianController.php:19
 * @route '/admin/technicians'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechnicianController::store
 * @see app/Http/Controllers/TechnicianController.php:19
 * @route '/admin/technicians'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TechnicianController::store
 * @see app/Http/Controllers/TechnicianController.php:19
 * @route '/admin/technicians'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechnicianController::store
 * @see app/Http/Controllers/TechnicianController.php:19
 * @route '/admin/technicians'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TechnicianController::update
 * @see app/Http/Controllers/TechnicianController.php:32
 * @route '/admin/technicians/{technician}'
 */
export const update = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/technicians/{technician}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TechnicianController::update
 * @see app/Http/Controllers/TechnicianController.php:32
 * @route '/admin/technicians/{technician}'
 */
update.url = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technician: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technician: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technician: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technician: typeof args.technician === 'object'
                ? args.technician.id
                : args.technician,
                }

    return update.definition.url
            .replace('{technician}', parsedArgs.technician.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechnicianController::update
 * @see app/Http/Controllers/TechnicianController.php:32
 * @route '/admin/technicians/{technician}'
 */
update.put = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TechnicianController::update
 * @see app/Http/Controllers/TechnicianController.php:32
 * @route '/admin/technicians/{technician}'
 */
    const updateForm = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechnicianController::update
 * @see app/Http/Controllers/TechnicianController.php:32
 * @route '/admin/technicians/{technician}'
 */
        updateForm.put = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\TechnicianController::destroy
 * @see app/Http/Controllers/TechnicianController.php:45
 * @route '/admin/technicians/{technician}'
 */
export const destroy = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/technicians/{technician}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TechnicianController::destroy
 * @see app/Http/Controllers/TechnicianController.php:45
 * @route '/admin/technicians/{technician}'
 */
destroy.url = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { technician: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { technician: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    technician: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        technician: typeof args.technician === 'object'
                ? args.technician.id
                : args.technician,
                }

    return destroy.definition.url
            .replace('{technician}', parsedArgs.technician.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechnicianController::destroy
 * @see app/Http/Controllers/TechnicianController.php:45
 * @route '/admin/technicians/{technician}'
 */
destroy.delete = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TechnicianController::destroy
 * @see app/Http/Controllers/TechnicianController.php:45
 * @route '/admin/technicians/{technician}'
 */
    const destroyForm = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechnicianController::destroy
 * @see app/Http/Controllers/TechnicianController.php:45
 * @route '/admin/technicians/{technician}'
 */
        destroyForm.delete = (args: { technician: number | { id: number } } | [technician: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TechnicianController = { index, store, update, destroy }

export default TechnicianController