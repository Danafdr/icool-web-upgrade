import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import formsA66cc0 from './forms'
import technicians from './technicians'
/**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
    const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: overview.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
        overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: overview.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::overview
 * @see app/Http/Controllers/AdminDashboardController.php:13
 * @route '/admin'
 */
        overviewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: overview.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    overview.form = overviewForm
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
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
export const schedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/admin/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
schedule.url = (options?: RouteQueryOptions) => {
    return schedule.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
schedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
schedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
    const scheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
        scheduleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ScheduleController::schedule
 * @see app/Http/Controllers/ScheduleController.php:11
 * @route '/admin/jadwal'
 */
        scheduleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule.form = scheduleForm
/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/admin/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnalyticsController::analytics
 * @see app/Http/Controllers/AnalyticsController.php:13
 * @route '/admin/laporan'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\Admin\ImportController::importMethod
 * @see app/Http/Controllers/Admin/ImportController.php:21
 * @route '/admin/import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/admin/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ImportController::importMethod
 * @see app/Http/Controllers/Admin/ImportController.php:21
 * @route '/admin/import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImportController::importMethod
 * @see app/Http/Controllers/Admin/ImportController.php:21
 * @route '/admin/import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ImportController::importMethod
 * @see app/Http/Controllers/Admin/ImportController.php:21
 * @route '/admin/import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ImportController::importMethod
 * @see app/Http/Controllers/Admin/ImportController.php:21
 * @route '/admin/import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
const admin = {
    overview: Object.assign(overview, overview),
forms: Object.assign(forms, formsA66cc0),
schedule: Object.assign(schedule, schedule),
analytics: Object.assign(analytics, analytics),
technicians: Object.assign(technicians, technicians),
import: Object.assign(importMethod, importMethod),
}

export default admin