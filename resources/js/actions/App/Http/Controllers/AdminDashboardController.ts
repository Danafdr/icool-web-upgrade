import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
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
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:13
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
 * @see app/Http/Controllers/AdminDashboardController.php:108
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
 * @see app/Http/Controllers/AdminDashboardController.php:108
 * @route '/admin/forms'
 */
forms.url = (options?: RouteQueryOptions) => {
    return forms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:108
 * @route '/admin/forms'
 */
forms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:108
 * @route '/admin/forms'
 */
forms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:108
 * @route '/admin/forms'
 */
    const formsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: forms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:108
 * @route '/admin/forms'
 */
        formsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::forms
 * @see app/Http/Controllers/AdminDashboardController.php:108
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
export const updateStatus = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
updateStatus.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
updateStatus.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::updateStatus
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
    const updateStatusForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/AdminDashboardController.php:66
 * @route '/admin/forms/{contact}/status'
 */
        updateStatusForm.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\AdminDashboardController::updateNotes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
export const updateNotes = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateNotes.url(args, options),
    method: 'patch',
})

updateNotes.definition = {
    methods: ["patch"],
    url: '/admin/forms/{contact}/notes',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::updateNotes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
updateNotes.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updateNotes.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::updateNotes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
updateNotes.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateNotes.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::updateNotes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
    const updateNotesForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateNotes.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::updateNotes
 * @see app/Http/Controllers/AdminDashboardController.php:79
 * @route '/admin/forms/{contact}/notes'
 */
        updateNotesForm.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateNotes.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateNotes.form = updateNotesForm
/**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
export const schedule = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
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
schedule.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
schedule.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: schedule.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::schedule
 * @see app/Http/Controllers/AdminDashboardController.php:92
 * @route '/admin/forms/{contact}/schedule'
 */
    const scheduleForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        scheduleForm.patch = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
export const history = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
history.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
history.get = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
history.head = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
    const historyForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
        historyForm.get = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::history
 * @see app/Http/Controllers/AdminDashboardController.php:191
 * @route '/admin/forms/{contact}/history'
 */
        historyForm.head = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
export const reply = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
reply.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
reply.post = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:147
 * @route '/admin/forms/{contact}/reply'
 */
    const replyForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::reply
 * @see app/Http/Controllers/AdminDashboardController.php:147
 * @route '/admin/forms/{contact}/reply'
 */
        replyForm.post = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
export const generateReply = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
generateReply.url = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
generateReply.post = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateReply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
    const generateReplyForm = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateReply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::generateReply
 * @see app/Http/Controllers/AdminDashboardController.php:166
 * @route '/admin/forms/{contact}/generate-reply'
 */
        generateReplyForm.post = (args: { contact: string | number | { id: string | number } } | [contact: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
const AdminDashboardController = { index, forms, updateStatus, updateNotes, schedule, history, reply, generateReply, refineReply }

export default AdminDashboardController