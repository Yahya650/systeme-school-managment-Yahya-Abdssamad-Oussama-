<?php

use App\Models\Admin;
use App\Models\Student;
use App\Models\StudentParent;
use App\Models\SuperAdmin;
use App\Models\Teacher;

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'super_admin',
        'passwords' => 'super_admins',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | Supported: "session"
    |
    */

    'guards' => [
        'super_admin' => [
            'driver' => 'sanctum',
            'provider' => 'super_admins',
        ],
        'admin' => [
            'driver' => 'sanctum',
            'provider' => 'admins',
        ],
        'teacher' => [
            'driver' => 'sanctum',
            'provider' => 'teachers',
        ],
        'student_parent' => [
            'driver' => 'sanctum',
            'provider' => 'student_parents',
        ],
        'student' => [
            'driver' => 'sanctum',
            'provider' => 'students',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent each model / table. These sources may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'super_admins' => [
            'driver' => 'eloquent',
            'model' => SuperAdmin::class,
        ],
        'admins' => [
            'driver' => 'eloquent',
            'model' => Admin::class,
        ],
        'teachers' => [
            'driver' => 'eloquent',
            'model' => Teacher::class,
        ],
        'student_parents' => [
            'driver' => 'eloquent',
            'model' => StudentParent::class,
        ],
        'students' => [
            'driver' => 'eloquent',
            'model' => Student::class,
        ]

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    | The expiry time is the number of minutes that each reset token will be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    | The throttle setting is the number of seconds a user must wait before
    | generating more password reset tokens. This prevents the user from
    | quickly generating a very large amount of password reset tokens.
    |
    */

    'passwords' => [
        'super_admins' => [
            'provider' => 'super_admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'teachers' => [
            'provider' => 'teachers',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'student_parents' => [
            'provider' => 'student_parents',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'students' => [
            'provider' => 'students',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | times out and the user is prompted to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => 10800,

];
