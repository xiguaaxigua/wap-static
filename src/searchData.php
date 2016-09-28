<?php
// 模拟搜索功能数据
if($_POST['searchText'] == 'c'){
    $cSug = array(
        'keywords' => ["c", "吃"],
        'category' => ["水果c", "南瓜c"]
    );
    echo json_encode($cSug);
}elseif($_POST['searchText'] == 'a'){
    $aSug = array(
        'keywords' => ["a", "阿门"],
        'category' => ["水果a", "南瓜a"]
    );
    echo json_encode($aSug);
}elseif($_POST['searchText'] == 'o'){
    $oSug= array(
        'keywords' => ["o", "o泡果奶"],
        'category' => ["水果o", "南瓜o"]
    );
    echo json_encode($oSug);
}elseif($_POST['searchText'] == 'ca'){
    $caSug= array(
        'keywords' => ["ca", "擦"],
        'category' => ["水果ca", "南瓜ca"]
    );
    echo json_encode($caSug);
}elseif($_POST['searchText'] == 'cao'){
    $caoSug= array(
        'keywords' => ["cao", "cao"],
        'category' => ["水果cao", "南瓜cao"]
    );
    echo json_encode($caoSug);
}elseif($_POST['searchText'] == '草'){
    $abcSug= array(
        'keywords' => ["草莓", "草莓酸奶"],
        'category' => ["水果草", "南瓜草"]
    );
    echo json_encode($abcSug);
}else{
    $noSug= array(
        'keywords' => ["搜索不到!", ""]
    );
    echo json_encode($noSug);
}
?>
