<?php
    $myfile = fopen("testTracker.txt","a") or die("Unable to open!");
    $txt = "User does not have javascript newest\n";
    fwrite($myfile,$txt);
    fclose($myfile);
?>