<?php

class ADODB
{
    const CONNECTION_STRING_CTEST = 'Provider=Microsoft OLE DB Provider for Visual FoxPro;Data Source=C:\\ProRpsTest\\PRODATA.DBC;';
    const CONNECTION_STRING_LIVE = 'Provider=Microsoft OLE DB Provider for Visual FoxPro;Data Source=\\\\RPS-PRO01\\Shared\\ProRps\\PRODATA.DBC;';

    public $db;

    public function __construct()
    {
        $this->db = new COM('ADODB.Connection');
        // check server info to see if we are in TEST CTEST or LIVE
        if (substr_count($_SERVER['SERVER_NAME'], 'localhost') > 0) {
            $this->db->Open(self::CONNECTION_STRING_CTEST);
        } else {
            $this->db->Open(self::CONNECTION_STRING_LIVE);
        }
    }
    public function __destruct()
    {
        try {
            $this->db->Close();
        } catch (Exception $e) {
        }
    }

    /*
     * GetRows()
     * $ThisSQL: accepts a SELECT SQL statement or a filename ending in .sql
     * Return: 2-dimensional array,
     *   The 1st dimension is an index number
     *   The 2nd is an associative array, the key is the field name, the value is the field value for that row
     * DS 7.27.16
     */
    public function GetRows($ThisSQL, $where_append = '')
    {
        if (strtoupper(substr($ThisSQL, -4)) == '.SQL') {
            $ThisSQL = file_get_contents($ThisSQL);
        }
        if (substr_count(strtoupper(substr($ThisSQL, 0, 6)), 'SELECT') == 0) {
            return array('Error' => 'Not a select statement: '.$ThisSQL);
        }
        $rs = new COM('ADODB.recordset');
        $rs = $this->db->Execute($ThisSQL.$where_append);
        $MyArr = array();
        $RowNum = 0;
        while (!$rs->EOF) {
            for ($i = 0; $i < $rs->Fields->Count; ++$i) {
                $MyArr[$RowNum][$rs->Fields($i)->name] = trim((string) $rs->Fields($i)->value);
            }
            $rs->MoveNext();
            ++$RowNum;
        }
        $rs->Close();

        return $MyArr;
    }
}
