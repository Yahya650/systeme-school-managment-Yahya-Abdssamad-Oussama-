<?php

use App\Models\SchoolYear;

include 'HashidsHelper.php';


function getCurrentSchoolYear($between, $sMonth = 9)
{
    $currentYear = now()->year;
    $startMonth = $sMonth;

    if (now()->month < $startMonth) {
        $currentYear--;
    }

    return $currentYear . $between . ($currentYear + 1);
}
function getCurrentSchoolYearFromDataBase()
{
    return SchoolYear::latest()->first();
}
