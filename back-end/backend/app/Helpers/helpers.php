<?php


include 'HashidsHelper.php';


function getCurrentSchoolYear($between)
{
    $currentYear = now()->year;
    $startMonth = 9;

    if (now()->month < $startMonth) {
        $currentYear--;
    }

    return $currentYear . $between . ($currentYear + 1);
}
