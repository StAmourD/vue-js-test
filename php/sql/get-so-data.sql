SELECT alltrim(somast.tracking) AS tracking,
       somast.custno AS customercode,
       somast.cshipno AS shipto,
       alltrim(somast.sono) + ' ' + somast.maint AS sono,
       somast.ordate AS reqdate,
       skdcnt.nomax0,
       round(skdcnt.estskidcnt, 2) AS estskidcnt,
       somast.reqtime,
       somast.shipvia,
       somast.sotype
FROM sodata01\somast01.dbf somast
LEFT JOIN
     (SELECT tran.sono,
             sum(iif(tran.umeasur = 'M', tran.qtyord * 1000, tran.qtyord) / iif(maxonskid = 0, 30000, maxonskid)) estskidcnt,
             sum(iif(maxonskid = 0, 1, 0)) nomax0
      FROM sotran01 tran
      LEFT JOIN icitem01 item ON tran.item = item.item
      WHERE tran.sostat = ''
           AND item.itmclss <> 'QQ'
           AND item.item NOT IN ('PLPAR',
                                 'PLPA',
                                 'CAT',
                                 'PLATE',
                                 'LABEL')
           AND item.itmdesc NOT LIKE 'BLISS CONTRIBUTION%'
      GROUP BY sono) skdcnt ON skdcnt.sono = somast.sono
WHERE somast.sono IN
          (SELECT DISTINCT sotran.sono
           FROM sodata01\sotran01.dbf sotran
           LEFT JOIN sodata01\somast01.dbf somast ON sotran.sono = somast.sono
           WHERE sotran.sostat = ''
                AND sotran.sotype NOT IN ('B')
                AND alltrim(upper(sotran.loctid)) <> 'DROP'
                AND alltrim(upper(sotran.lblready)) <> 'DIRSHP'
                AND upper(somast.shipvia) LIKE '%RPS%'
                AND upper(somast.shipvia) NOT LIKE '%DIRECT%'
                AND upper(somast.shipvia) NOT LIKE '%HOLD%'
                AND upper(somast.shipvia) NOT LIKE '%APPLY%' )
     AND somast.sostat = '' #where
ORDER BY somast.ordate
