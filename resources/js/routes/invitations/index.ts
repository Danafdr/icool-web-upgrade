import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
export const accept = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accept.url(args, options),
    method: 'get',
})

accept.definition = {
    methods: ["get","head"],
    url: '/invitations/{invitation}/accept',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
accept.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
            args = { invitation: args.code }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invitation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invitation: typeof args.invitation === 'object'
                ? args.invitation.code
                : args.invitation,
                }

    return accept.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
accept.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accept.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
accept.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accept.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
    const acceptForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: accept.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
        acceptForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accept.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Teams\TeamInvitationController::accept
 * @see app/Http/Controllers/Teams/TeamInvitationController.php:61
 * @route '/invitations/{invitation}/accept'
 */
        acceptForm.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accept.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    accept.form = acceptForm
const invitations = {
    accept: Object.assign(accept, accept),
}

export default invitations