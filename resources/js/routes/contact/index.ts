import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ContactController::step1
 * @see app/Http/Controllers/ContactController.php:12
 * @route '/contact/step1'
 */
export const step1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: step1.url(options),
    method: 'post',
})

step1.definition = {
    methods: ["post"],
    url: '/contact/step1',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::step1
 * @see app/Http/Controllers/ContactController.php:12
 * @route '/contact/step1'
 */
step1.url = (options?: RouteQueryOptions) => {
    return step1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::step1
 * @see app/Http/Controllers/ContactController.php:12
 * @route '/contact/step1'
 */
step1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: step1.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ContactController::step1
 * @see app/Http/Controllers/ContactController.php:12
 * @route '/contact/step1'
 */
    const step1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: step1.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ContactController::step1
 * @see app/Http/Controllers/ContactController.php:12
 * @route '/contact/step1'
 */
        step1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: step1.url(options),
            method: 'post',
        })
    
    step1.form = step1Form
/**
* @see \App\Http\Controllers\ContactController::step2
 * @see app/Http/Controllers/ContactController.php:57
 * @route '/contact/step2'
 */
export const step2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: step2.url(options),
    method: 'post',
})

step2.definition = {
    methods: ["post"],
    url: '/contact/step2',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::step2
 * @see app/Http/Controllers/ContactController.php:57
 * @route '/contact/step2'
 */
step2.url = (options?: RouteQueryOptions) => {
    return step2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::step2
 * @see app/Http/Controllers/ContactController.php:57
 * @route '/contact/step2'
 */
step2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: step2.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ContactController::step2
 * @see app/Http/Controllers/ContactController.php:57
 * @route '/contact/step2'
 */
    const step2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: step2.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ContactController::step2
 * @see app/Http/Controllers/ContactController.php:57
 * @route '/contact/step2'
 */
        step2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: step2.url(options),
            method: 'post',
        })
    
    step2.form = step2Form
const contact = {
    step1: Object.assign(step1, step1),
step2: Object.assign(step2, step2),
}

export default contact