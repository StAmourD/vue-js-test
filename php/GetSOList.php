<?php
  include 'ADODB-wrapper.inc.php';
  $where = '';

  if (isset($_GET['StartDate']) && isset($_GET['EndDate'])) {
      $UseDateFilter = true;
      $UseLocationFilter = isset($_GET['Warehouse']) && strlen(isset($_GET['Warehouse'])) > 0;
      $ThisData = GatherPOData('.\\sql\\get-so-data.sql', $UseDateFilter, $UseLocationFilter);
      echo json_encode($ThisData);
      // $RetData = array();
      // foreach ($ThisData as $key => $value) {
      //     $NewKey = trim($value['sono']);
      //     $RetData[$NewKey] = $value;
      //     unset($RetData[$NewKey]['sono']);
      //     echo json_encode($RetData);
      //     // echo'<PRE>';
      //     // echo print_r($RetData);
      // }
  } else {
      die('Nothing to see here: Missing parameters.');
  }

  function GatherPOData($SQLFileName, $UseDateFilter, $UseWarehouseFilter)
  {
      $where = '';
      if ($UseDateFilter) {
          $start = $_GET['StartDate'];
          $end = $_GET['EndDate'];
          if (strlen($start) > 0 && strlen($end) > 0) {
              if (isset($_GET['UseAddDate']) && $_GET['UseAddDate'] == 'true') {
                  $where .= " AND a.adddate BETWEEN CTOD('$start') AND CTOD('$end')";
              } else {
                  $where .= " AND a.ordate BETWEEN CTOD('$start') AND CTOD('$end')";
              }
          }
      }
      if ($UseWarehouseFilter) {
          $location = $_GET['Warehouse'];
          $where .= " AND ALLTRIM(a.loctid) IN ($location)";
      }
      if (isset($_GET['FilterNonRPS']) && $_GET['FilterNonRPS'] == 'true') {
          $where .= " AND ALLTRIM(a.tosw)=''";
      }

      $db = new ADODB();
      $ThisData = $db->GetRows($SQLFileName, $where);

      return $ThisData;
  }
