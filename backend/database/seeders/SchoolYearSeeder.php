<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use Illuminate\Database\Seeder;

class SchoolYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    // private function getCurrentSchoolYear($between, $sMonth = 9)
    // {
    //     $currentYear = now()->year;
    //     $startMonth = $sMonth;

    //     if (now()->month < $startMonth) {
    //         $currentYear--;
    //     }

    //     return $currentYear . $between . ($currentYear + 1);
    // }


    public function run(): void
    {
        SchoolYear::create(['year' => getCurrentSchoolYear('/')]);
    }
}
