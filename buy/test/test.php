<?php
require_once dirname(__FILE__) . '/dispath.php';


if (!defined('WWW_ROOT')) define('WWW_ROOT', realpath(dirname(__FILE__) . '/../') . DIRECTORY_SEPARATOR);
if (!defined('ROOT')) define('ROOT', dirname(__FILE__) . DIRECTORY_SEPARATOR);
if (!defined('PLUGIN_ROOT')) define('PLUGIN_ROOT', ROOT . DIRECTORY_SEPARATOR . 'plugin' . DIRECTORY_SEPARATOR);
if (!defined('LIBS_ROOT')) define('LIBS_ROOT', ROOT . DIRECTORY_SEPARATOR . 'libs' . DIRECTORY_SEPARATOR);
require_once LIBS_ROOT . 'Util.class.php';
function getJsonData($tmpl) {
    $file = Util::normalizePath(WWW_ROOT . '/test/' . preg_replace('/\.[a-z]{2,6}$/i', '.json' ,$tmpl));
    $ret = array();
    if (is_file($file)) {
        $ret = json_decode(file_get_contents($file), true);
        if ($ret === null) {
            $ret = array();
        }
    }
    return $ret;
}


$cmsData = CmsData::get();
$rootData = $cmsData['root'];
$sysData = $cmsData['sysInfo'];

if(!is_array($rootData)){
    $rootData = json_decode($rootData,true);
}

if(!is_array($sysData)){
    $sysData = json_decode($sysData,true);
}

$tplDir = $rootData['head']['tplDir'];

header("Content-type:text/html;charset=UTF-8");

$smarty = getSmarty();

if(isset($_GET['debug'])){
    if($_GET['debug'] == 'on'){
        $smarty->debugging = true;
    }
}
$jsonData=getJsonData($tplDir);
$rootData=array_merge_recursive_new($rootData,$jsonData['cmsData']);

$smarty->assign('root',$rootData);
$smarty->assign('sysInfo',$sysData);

$smarty->assign($jsonData);

$smarty->display($tplDir);

function getSmarty(){
    $root = dirname(__FILE__) . DIRECTORY_SEPARATOR;
    require_once ($root . '../../smarty/Smarty.class.php');
    $smarty = new Smarty();
    $default_conf = array(
        'template_dir' => '../../template',
        'config_dir' => '../../config',
        'plugins_dir' => array( '../../plugin' ),
        'left_delimiter' => '<%',
        'right_delimiter' => '%>'
    );
    if(file_exists($root . '../../smarty.conf')){
        $user_conf = parse_ini_file(normalize($root . '../../smarty.conf'));
        if(!empty($user_conf)){
            $default_conf = array_merge($default_conf, $user_conf);
        }
    }
    $smarty->setTemplateDir(normalize($root . $default_conf['template_dir']));
    $smarty->setConfigDir(normalize($root . $default_conf['config_dir']));
    foreach ($default_conf['plugins_dir'] as $dir) {
        $smarty->addPluginsDir(normalize($root . $dir));
    }
    $smarty->setLeftDelimiter($default_conf['left_delimiter']);
    $smarty->setRightDelimiter($default_conf['right_delimiter']);
    return $smarty;
}

function normalize($path) {
    $normal_path = preg_replace(
        array('/[\/\\\\]+/', '/\/\.\//', '/^\.\/|\/\.$/', '/\/$/'),
        array('/', '/', '', ''),
        $path
    );
    $path = $normal_path;
    do {
        $normal_path = $path;
        $path = preg_replace('/[^\\/\\.]+\\/\\.\\.(?:\\/|$)/', '', $normal_path);
    } while ($path != $normal_path);
    $path = preg_replace('/\/$/', '', $path);
    return $path;
}
?>