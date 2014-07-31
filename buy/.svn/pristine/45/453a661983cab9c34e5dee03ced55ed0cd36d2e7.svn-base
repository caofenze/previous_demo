<?php
/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$:URLDispathAtion.class.php,2012/08/25 18:02:45
 * 
 **************************************************************************/
/**
 * @author mozhuoying(mozhuoying@baidu.com)
 * @date 2012/08/25 18:02:45
 * @brief 
 *  
 **/
	class CmsData{
		static $isTestEnv;
		static $dataDir = "";
		static $dataPrivate = "";
			//测试环境使用url,线上环境使用host
		static $country;
		static $host ;
		static $dataRoot = "";
		static $testRoot = "http://cq01-rdqa-pool145.cq01.baidu.com:8088";
		static $cmsData = array();
		//不允许用户直接访问的url,_post为了提交数据的函数，后面两个是继承原始ACTION而来，主要继承的controller可以不继承
        static function get() {
        	$args = array();
        	$uiPath = dirname(__FILE__)."/";
            $pageRoot = "";
			//appache与lighttpd的获取url的方式不一样
			$url = parse_url( $_SERVER['SCRIPT_URL'] ? $_SERVER['SCRIPT_URL'] : $_SERVER['REQUEST_URI'] );
			//潜规则1.lighttpd会把查询参数带上，所以需要去掉2.注意这里的是.html也能访问，因为历史原因使用.html统计
			$url = preg_replace('/\.html$/', "", $url["path"]);
			$ip = $_SERVER['SERVER_ADDR'] ? $_SERVER['SERVER_ADDR'] : "0.0.0.0";
			//为controller设置属性isTestEnv,以便别是否是测试环境
			$isTestEnv = true;
			//手机访问域名还是浏览器访问,缺省是web类型
			$hostType = "web";
			$pageFound = false;
			//手机版的前缀，默认是m
			$mobileHostPrefix = "m";
			$host = $_SERVER['HTTP_HOST'];

            if(preg_match("/^([a-z]{2}\.)/i",$host)){
                $isTestEnv=false;
            }

			//ip转换为host
			$pathseg = explode('/',trim($url,'/'));
			$dataDir = "";
			//过滤空串
			$pathseg = array_filter( $pathseg );
			$count = count($pathseg);
			//检测ui目录下面是否有对应国家的ui根目录(先url,后host)
			//只检测host,else(url)在迁移到www.hao123.com的时候或者测试环境中使用
			if( ($dir=explode( '.', $host)) && !$isTestEnv ){
				//潜规则:线上的test域名test.tw.hao123.com实际上是tw.hao123.com
				if ( $dir[0] === "test" ) {
					$dir = array_slice($dir,1);
				}
				//手机类型的域名
				if( $dir[0] === $mobileHostPrefix ) {
					$hostType = $dir[0];
					$pageRoot = $dataDir = $hostType."/".$dir[1]."/";
					$country = $dir[1];
					//有ui的根目录的情况
					$pageFound = is_dir( $uiPath.$pageRoot);
				//web
				} else {
					$pageRoot = $dataDir =  $hostType."/".$dir[0]."/";
					$country = $dir[0];
					$pageFound = is_dir( $uiPath.$pageRoot);
				}
				$dataRoot = $dataDir;
			//为了方便迁移到www.hao123.com，并且方便在测试环境中才使用url映射host,目前暂时只支持测试环境
			} else if( !empty($pathseg[0]) ) {
				//手机类型的域名
				if( $pathseg[0] === $mobileHostPrefix ) {
					$hostType = $pathseg[0];
					if ( !empty($pathseg[1]) ) {
						$country = $pathseg[1];
						$pageRoot = $dataDir = $pathseg[0]."/".$pathseg[1]."/";
						$pageFound = is_dir( $uiPath.$pageRoot);
						$pathseg = array_slice($pathseg, 2);
						$count = count($pathseg);
					}
				//web
				} else {
					$pageRoot = $dataDir =  $hostType."/".$pathseg[0]."/";
					$country = $pathseg[0];
					//$dataDir = $hostType."/".$dataDir;
					$pathseg = array_slice($pathseg, 1);
					$count = count($pathseg);
				
					$pageFound = is_dir( $uiPath.$pageRoot);

				}
				$dataRoot = $dataDir;
			}	
			$dataDir = rtrim( $dataDir.implode("/", $pathseg), "/")."/";
				//如果是首页，放到目录/index中
			$dataDir = $count>0 ? $dataDir : $dataDir."index/";
			//为controller设置属性isTestEnv,以便别是否是测试环境
			//记录对应的data.json所在的Template路径，默认与ui对应
			self::$dataDir = rtrim( $dataDir, "/")."/";
			self::$dataPrivate = "";
			//测试环境使用url,线上环境使用host
			self::$country = $country;
			self::$host = $host;
			self::$dataRoot = rtrim( $dataRoot, "/")."/";

			self::getCms();
			return self::$cmsData;
		}
		static function getCms(){
			$dataRoot = dirname(__FILE__)."/";
			$debug_id = "localdata";
			$smarty_debug_id = "debug";
			//是否使用本地数据
			$islocalData = true;
			$privateDataDir =  $dataRoot."data/".self::$dataDir;
			$publicDataDir =  $dataRoot."data/".rtrim(self::$dataRoot,"/")."/base/";
			//复制url的参数值到$root.urlparam中
			$arr = array( "urlparam"=>array_merge($_GET,$_POST) );
			//set smarty 
			$sysInfo = array(
				"baseDataDir" => $publicDataDir."data\.php",
				"privateDataDir" => $privateDataDir."data\.php",
				"templateRoot" => "/templates/",
				"country" => self::$country,
				"host" => self::$host
			);
			//是否开启本地数据模式
			if (isset($_SERVER['QUERY_STRING'])) {
                $_query_string = $_SERVER['QUERY_STRING'];
            } else {
                $_query_string = '';
            }
            if (false !== strpos($_query_string, $debug_id)) {
                if (false !== strpos($_query_string, $debug_id . '=on')) {
                    // enable debugging for this browser session
                    setcookie('localdata', "");
                } elseif (false !== strpos($_query_string, $debug_id . '=off')) {
                    // disable debugging for this browser session
                    setcookie('localdata', "online",time()+3600*24*356);
                    $islocalData = false;
                }
            } else {
            	if (isset($_COOKIE['localdata']) && $_COOKIE['localdata'] === "online") {
                    $islocalData = false;
                }
            } 

            //是否开启smarty调试模式
            if (false !== strpos($_query_string, $smarty_debug_id)) {
                if (false !== strpos($_query_string, $smarty_debug_id . '=on')) {
                    // enable debugging for this browser session
                    setcookie('FIS_DEBUG', "YlwtSmt",time()+3600*24*356);
                } elseif (false !== strpos($_query_string, $smarty_debug_id . '=off')) {
                    // disable debugging for this browser session
                    setcookie('FIS_DEBUG', "",time()+3600*24*356);
                }
            }

			//记录主机信息与国家名称到smarty中
			/*self::$smarty->assign( "country", self::$country );
			self::$smarty->assign( "host", self::$host );*/
			//所有data都有一个公共data,先把公共的data加载到cmsdata中
			if ( is_dir($publicDataDir) && is_file($publicDataDir."data.php") && $islocalData) {
			    //self::datamerge( $publicDataDir,$arr );
			    include_once $publicDataDir."data.php";
			    $arr = array_merge_recursive_new($arr,$root);
			  
			} else{
				$root = file_get_contents( self::$testRoot."/productdata/getBase?dataPath="."data/".rtrim(self::$dataRoot,"/")."/base/"."data.php");
				if ( !empty($root) ){
					 $arr = array_merge_recursive_new($arr,json_decode( $root,true) );
					 //写入本地文件
					 $phpData = sprintf("<?php \$root= %s \n?>",var_export(json_decode( $root,true),true));
					 //建立目录
					 mkdir($publicDataDir,0777,true);
					 //建立文件
					 file_put_contents($publicDataDir."data.php", $phpData);

				}
			}

			//从对应的目录下面找到私有的data
			if( is_dir( $privateDataDir ) && is_file($privateDataDir."data.php") && $islocalData){
                //self::datamerge( $privateDataDir,$arr );
                include_once $privateDataDir."data.php";
                self::$dataPrivate = $root;
                $arr = array_merge_recursive_new($arr,$root);
			} else{
					$root = file_get_contents( self::$testRoot."/productdata/getprivate?dataPath="."data/".self::$dataDir."data.php");
				if ( !empty($root) ){
					$arr = array_merge_recursive_new($arr,json_decode( $root,true ) );
					//写入本地文件
					 $phpData = sprintf("<?php \$root= %s \n?>",var_export(json_decode( $root,true),true));
					 //建立目录
					 mkdir($privateDataDir,0777,true);
					 //建立文件
					 file_put_contents($privateDataDir."data.php", $phpData);
				}
			}
			//支持第三层数据继承，为了抽样
			$sample = empty($_GET['sample']) ? "" : $_GET['sample'];
			if( !empty($sample) && !empty($arr["head"]["sample"][$sample])) {
				$sampleDir = ltrim($arr["head"]["sample"][$sample],"/");
				$dir = $sysInfo["privateDataDir"] =   $dataRoot."data/".$sampleDir;
				//fis需要转移"."为"\."
				$sysInfo["privateDataDir"]  = str_replace('data.php','data\\.php',$sysInfo["privateDataDir"]);
				if( is_file($dir) && $islocalData ){
					include_once $dir;
					$arr = array_merge_recursive_new($arr,$root);
				} else {

					$root = file_get_contents( self::$testRoot."/productdata/getprivate?dataPath="."data/".$sampleDir);
					if ( !empty($root) ){
						$arr = array_merge_recursive_new($arr,json_decode( $root,true ) );
						//写入本地文件
						 $phpData = sprintf("<?php \$root= %s \n?>",var_export(json_decode( $root,true),true));
						 $sampleRoot = str_replace('data.php','',$dir);

						 //建立目录
						 mkdir($sampleRoot,0777,true);
						 //建立文件
						 file_put_contents($dir, $phpData);
					}
				}
			}
			//smarty extend（为了选择布局）不能用条件判断语句，但是可以使用变量
			$layoutRoot = "web/base/layout/";
			$layout = empty( $arr["head"]["layout"] ) ? "" : $layoutRoot.$arr["head"]["layout"].".html";
			$defaultLayout = empty( $arr["head"]["defaultLayout"] ) ? "" : $layoutRoot.$arr["head"]["defaultLayout"].".html";
			//选择了布局
			if ( !empty($layout) && is_file($templateRoot.$layout) ){
				$sysInfo["layout"] = $layout;
			} else if( !empty($defaultLayout) && is_file($templateRoot.$defaultLayout) ){
				$sysInfo["layout"] = $defaultLayout;
			}
			// 把cookie记录到smarty变量中，方便前端模板调用
            $baiduId = $sysInfo["baiduid"] = isset($_COOKIE["FLASHID"]) ? $_COOKIE["FLASHID"]: (isset($_COOKIE["BAIDUID"]) ? $_COOKIE["BAIDUID"]:"");
            $sysInfo["serverTime"] = time();

            //测试环境，需要置空cdn
            $arr["head"]["cdn"] = "";
			if ( !empty($baiduId) && extension_loaded("decodecookie") ){
				$sysInfo["baiduidCt"] = decodecookie($baiduId);
			} else{
				$sysInfo["baiduidCt"] = $sysInfo["serverTime"];
			}
			self::$cmsData = array(
				"sysInfo" => $sysInfo,
				"root"=> $arr
			);
		}
	}

function array_merge_recursive_new() {  
		$arrays = func_get_args();
		$base = array_shift($arrays);    
		foreach ($arrays as $array) {        
			reset($base); //important       
			while (list($key, $value) = @each($array)) {           
				if (is_array($value) && @is_array($base[$key])) {                
				  	$base[$key] = array_merge_recursive_new($base[$key], $value);      
				} 
				else {
				  	$base[$key] = $value;
				}       
			 }   
		}   
		return $base;
}
?>
