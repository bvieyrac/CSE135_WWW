// <?php
    
//     // //The url you wish to send the POST request to
//     // $url = "https://www.cse135hw1.site/api/static";

//     // $data = array('JS Disabled' => 'True');
    
//     // // use key 'http' even if you send the request to https://...
//     // $options = array(
//     //     'http' => array(
//     //         'header'  => "Content-type: application/json\n\n",
//     //         'method'  => 'POST',
//     //         'content' => http_build_query($data)
//     //     )
//     // );
//     // $context  = stream_context_create($options);
//     // $result = file_get_contents($url, false, $context);
//     // if ($result === FALSE) { /* Handle error */ }
    
//     // var_dump($result);
   

//     $url = 'https://www.cse135hw1.site/api/performance';
    
//     $data_array = array(
//         "JSDisabled" => "true"
//     );

//     $data = http_build_query($data_array);

//     # Create a connection
//     $ch = curl_init($url);
    
//     # Setting our options
//     curl_setopt($ch,CURLOPT_URL, $url);
//     //curl_setopt($ch, CURLOPT_POST, true);
//     //curl_setopt($ch, CURLOPT_POSTFIELDS, $data_array);
//     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//     curl_setopt($ch, CURLOPT_USERPWD, "bvieyrac:bvieyrac123");
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     # Get the response
//     $response = curl_exec($ch);
//     curl_close($ch);
//     $jsonArrayRespone = json_decode($response);



//     // $myfile = fopen("testTracker.txt","w") or die("Unable to open!");
//     // fwrite($myfile,$response);
//     // fclose($myfile);


// ?>