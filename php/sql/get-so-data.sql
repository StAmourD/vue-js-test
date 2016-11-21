SELECT a.sono,
       a.custno,
       a.ordate AS rqdate,
       a.shipvia
FROM somast01 a
WHERE a.sostat = ''
