<?php

namespace Database\Seeders;

use App\Models\MonthlyFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MonthlyFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $MonthlyFees = [
            [
                'amount' => 2000,
                'school_year_id' => getCurrentSchoolYearFromDataBase()->id,
                'student_id' => 1,
            ],
            [
                'amount' => 5000,
                'school_year_id' => getCurrentSchoolYearFromDataBase()->id,
                'student_id' => 2,
            ],
        ];

        foreach ($MonthlyFees as $MonthlyFee) {
            MonthlyFee::create($MonthlyFee);
        }
    }
}
