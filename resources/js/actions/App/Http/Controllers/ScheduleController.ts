import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ScheduleController::index
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
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
const ScheduleController = { index }

export default ScheduleController