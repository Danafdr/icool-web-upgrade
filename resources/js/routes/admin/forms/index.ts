import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:61
 * @route '/admin/forms/{contact}/status'
 */
export const status = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:61
 * @route '/admin/forms/{contact}/status'
 */
status.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:61
 * @route '/admin/forms/{contact}/status'
 */
status.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:61
 * @route '/admin/forms/{contact}/status'
 */
    const statusForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:61
 * @route '/admin/forms/{contact}/status'
 */
        statusForm.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:84
 * @route '/admin/forms/{contact}/reply'
 */
export const reply = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/admin/forms/{contact}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:84
 * @route '/admin/forms/{contact}/reply'
 */
reply.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reply.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:84
 * @route '/admin/forms/{contact}/reply'
 */
reply.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:84
 * @route '/admin/forms/{contact}/reply'
 */
    const replyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:84
 * @route '/admin/forms/{contact}/reply'
 */
        replyForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:103
 * @route '/admin/forms/{contact}/generate-reply'
 */
export const generateReply = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReply.url(args, options),
    method: 'post',
})

generateReply.definition = {
    methods: ["post"],
    url: '/admin/forms/{contact}/generate-reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:103
 * @route '/admin/forms/{contact}/generate-reply'
 */
generateReply.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return generateReply.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:103
 * @route '/admin/forms/{contact}/generate-reply'
 */
generateReply.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:103
 * @route '/admin/forms/{contact}/generate-reply'
 */
    const generateReplyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateReply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:103
 * @route '/admin/forms/{contact}/generate-reply'
 */
        generateReplyForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateReply.url(args, options),
            method: 'post',
        })
    
    generateReply.form = generateReplyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:113
 * @route '/admin/forms/refine-reply'
 */
export const refineReply = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refineReply.url(options),
    method: 'post',
})

refineReply.definition = {
    methods: ["post"],
    url: '/admin/forms/refine-reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:113
 * @route '/admin/forms/refine-reply'
 */
refineReply.url = (options?: RouteQueryOptions) => {
    return refineReply.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:113
 * @route '/admin/forms/refine-reply'
 */
refineReply.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refineReply.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:113
 * @route '/admin/forms/refine-reply'
 */
    const refineReplyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: refineReply.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:113
 * @route '/admin/forms/refine-reply'
 */
        refineReplyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: refineReply.url(options),
            method: 'post',
        })
    
    refineReply.form = refineReplyForm
const forms = {
    status: Object.assign(status, status),
reply: Object.assign(reply, reply),
generateReply: Object.assign(generateReply, generateReply),
refineReply: Object.assign(refineReply, refineReply),
}

export default forms