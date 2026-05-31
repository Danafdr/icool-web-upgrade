import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:11
 * @route '/admin'
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
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
export const forms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forms.url(options),
    method: 'get',
})

forms.definition = {
    methods: ["get","head"],
    url: '/admin/forms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
forms.url = (options?: RouteQueryOptions) => {
    return forms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
forms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
forms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
    const formsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: forms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
        formsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:72
 * @route '/admin/forms'
 */
        formsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    forms.form = formsForm
/**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:59
 * @route '/admin/forms/{contact}/status'
 */
export const updateStatus = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:59
 * @route '/admin/forms/{contact}/status'
 */
updateStatus.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contact: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contact: typeof args.contact === 'object'
                ? args.contact.id
                : args.contact,
                }

    return updateStatus.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:59
 * @route '/admin/forms/{contact}/status'
 */
updateStatus.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:59
 * @route '/admin/forms/{contact}/status'
 */
    const updateStatusForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:59
 * @route '/admin/forms/{contact}/status'
 */
        updateStatusForm.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const AdminDashboardController = { index, forms, updateStatus }

export default AdminDashboardController