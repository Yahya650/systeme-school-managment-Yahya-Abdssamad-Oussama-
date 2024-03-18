<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Responsible;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'profile_picture' => null,
            'first_name' => 'Btissam',
            'last_name' => 'Ben Taleb',
            'gender' => 'female',
            'email' => 'btissam@gmail.com',
            'cin' => 'BQ123456',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '1987-02-02',
            'blood_type' => null,
            'phone_number' => '0612345678',
            'address' => 'anassi, CASABLANCA',
            'last_login_date' => now(),
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
            'super_admin_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $reponsibles = [
            [
                'types' => json_encode(['educational','financial']),
                'school_level_id' => 1,
                'admin_id' => 1
            ],
            [
                'types' => json_encode(['educational','financial']),
                'school_level_id' => 2,
                'admin_id' => 1
            ],
            [
                'types' => json_encode(['educational','financial']),
                'school_level_id' => 3,
                'admin_id' => 1
            ],
            [
                'types' =>json_encode(['educational','financial']),
                'school_level_id' => 4,
                'admin_id' => 1
            ],
        ];

        foreach ($reponsibles as $reponsible) {
            Responsible::create($reponsible);
        }
    }
}
