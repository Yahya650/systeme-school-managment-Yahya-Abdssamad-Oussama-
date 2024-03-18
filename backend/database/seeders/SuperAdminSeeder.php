<?php

namespace Database\Seeders;

use App\Models\SuperAdmin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SuperAdmin::create([
            'first_name' => 'yahya',
            'last_name' => 'hamdy',
            'email' => 'yahya@gmail.com',
            'password' => Hash::make('12345678'),
            'phone_number' => '0608602353',
            'cin' => 'BW49789',
            'gender' => 'male',
            'date_of_birth' => '1999-01-01',
        ]);
    }
}
