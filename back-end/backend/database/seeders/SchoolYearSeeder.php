<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SchoolYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    function getCurrentSchoolYear($between)
    {
        $currentYear = now()->year;
        $startMonth = 9;

        if (now()->month < $startMonth) {
            $currentYear--;
        }

        return $currentYear . $between . ($currentYear + 1);
    }


    public function run(): void
    {
        SchoolYear::create(['year' => $this->getCurrentSchoolYear('/')]);
    }
}
