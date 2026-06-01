import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:66
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
status.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::status
 * @see app/Http/Controllers/AdminDashboardController.php:66
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
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
* @see \App\Http\Controllers\AdminDashboardController::notes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
export const notes = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: notes.url(args, options),
    method: 'patch',
})

notes.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/notes',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::notes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
notes.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return notes.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::notes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
notes.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: notes.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::notes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
    const notesForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: notes.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::notes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
        notesForm.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: notes.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    notes.form = notesForm
/**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
export const schedule = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: schedule.url(args, options),
    method: 'patch',
})

schedule.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/schedule',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
schedule.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return schedule.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
schedule.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: schedule.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
    const scheduleForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: schedule.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
        scheduleForm.patch = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: schedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    schedule.form = scheduleForm
/**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
export const history = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/admin/forms/{contact}/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
history.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return history.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
history.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
history.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
    const historyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
        historyForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
        historyForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:147
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
 * @see app/Http/Controllers/AdminDashboardController.php:147
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
 * @see app/Http/Controllers/AdminDashboardController.php:147
 * @route '/admin/forms/{contact}/reply'
 */
reply.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:147
 * @route '/admin/forms/{contact}/reply'
 */
    const replyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:147
 * @route '/admin/forms/{contact}/reply'
 */
        replyForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
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
 * @see app/Http/Controllers/AdminDashboardController.php:166
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
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
generateReply.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
    const generateReplyForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateReply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
        generateReplyForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateReply.url(args, options),
            method: 'post',
        })
    
    generateReply.form = generateReplyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:176
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
 * @see app/Http/Controllers/AdminDashboardController.php:176
 * @route '/admin/forms/refine-reply'
 */
refineReply.url = (options?: RouteQueryOptions) => {
    return refineReply.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:176
 * @route '/admin/forms/refine-reply'
 */
refineReply.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refineReply.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:176
 * @route '/admin/forms/refine-reply'
 */
    const refineReplyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: refineReply.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::refineReply
 * @see app/Http/Controllers/AdminDashboardController.php:176
 * @route '/admin/forms/refine-reply'
 */
        refineReplyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: refineReply.url(options),
            method: 'post',
        })
    
    refineReply.form = refineReplyForm
const forms = {
    status: Object.assign(status, status),
notes: Object.assign(notes, notes),
schedule: Object.assign(schedule, schedule),
history: Object.assign(history, history),
reply: Object.assign(reply, reply),
generateReply: Object.assign(generateReply, generateReply),
refineReply: Object.assign(refineReply, refineReply),
}

export default forms