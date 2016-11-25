<?php
  include 'ADODB-wrapper.inc.php';
  $where = '';

  if (isset($_GET['StartDate']) && isset($_GET['EndDate'])) {
      // $RetData = array();
      // foreach ($ThisData as $key => $value) {
      //     $NewKey = trim($value['sono']);
      //     $RetData[$NewKey] = $value;
      //     unset($RetData[$NewKey]['sono']);
      //     echo json_encode($RetData);
      //     // echo'<PRE>';
      //     // echo print_r($RetData);
      // }
      if (isset($_GET['StartDate']) && isset($_GET['EndDate'])) {
          $start = $_GET['StartDate'];
          $end = $_GET['EndDate'];
          if (strlen($start) > 0 && strlen($end) > 0) {
              if (isset($_GET['UseAddDate']) && $_GET['UseAddDate'] == 'true') {
                  $where .= " AND somast.adddate BETWEEN CTOD('$start') AND CTOD('$end')";
              } else {
                  $where .= " AND somast.ordate BETWEEN CTOD('$start') AND CTOD('$end')";
              }
          }
      }
  }
  $ThisData = GatherSOData('.\\sql\\get-so-data.sql');
  foreach ($ThisData as $key => $value) {
      if (isset($value['tracking']) && strlen($value['tracking']) > 0) {
          $ThisData[$key]['load'] = GetLoadNumber($value['tracking']);
      }
  }
  echo json_encode($ThisData);

  function GatherSOData($SQLFileName)
  {
      global $where;
      $db = new ADODB();
      $ThisData = $db->GetRows($SQLFileName, $where);

      return $ThisData;
  }

  function GetLoadNumber($tracking)
  {
      $RetValue = '';
      $loadno = 'loadno';
      $commaSplit = explode(',', $tracking);
      foreach ($commaSplit as $key => $value) {
          $semiSplit = explode(';', $value);
          if (count($semiSplit) == 4) {
              if (strpos(';LOAD', $semiSplit[3]) > 0) {
                  // 0 = sono and version
                  // 1 = load number
                  // 2 = load status
                  // 3 = track-type (we're looking for load here)
                  $RetValue = $semiSplit[1].', '.$semiSplit[2];

                  // TODO find a way to retun the load staus here
              }
          }
      }

      return $RetValue;
  }
