<?php

namespace App\Console\Commands;

use App\Models\Admin;
use App\Models\SchoolYear;
use Illuminate\Console\Command;

class UpdateSchoolYearData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:school-year-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update data for the new school year';


    // private function getCurrentSchoolYear($between, $sMonth = 9)
    // {
    //     $currentYear = now()->year;
    //     $startMonth = $sMonth;

    //     if (now()->month < $startMonth) {
    //         $currentYear--;
    //     }

    //     return $currentYear . $between . ($currentYear + 1);
    // }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Executing code for the new school year...');

        $schoolYear = new SchoolYear();
        $schoolYear->year = getCurrentSchoolYear('/');
        $schoolYear->start_date = now();
        $schoolYear->save();

        echo 'school created successfuly';
    }
}
