<?php 

namespace monApp\core;

use monApp\core\rooter;
use monApp\core\dispatcher;

class app{

    public static $rw=false;
    private static $html;

    public static $db;

    public static $rooter;
    public static $dispatcher;

    public static function db(){
        $config = require __DIR__ . '/../config/config.php';
        self::$db = new database(
            $config['db_host'],
            $config['db_name'],
            $config['db_user'],
            $config['db_pass']
        );
    }

    public static function section($section){
        require "controllers/sections/".$section.".php";
    }

    public static function page(){
        self::$rooter = new rooter();
        self::$rooter->addRoute("","monApp\controllers\pages\pageHomeController@index");
        self::$rooter->addRoute("about","monApp\controllers\pages\pageAboutController@index");
        self::$rooter->addRoute("skills","monApp\controllers\pages\pageSkillsController@index");
        self::$rooter->addRoute("project","monApp\controllers\pages\pageProjectController@index");
        self::$rooter->addRoute("contact","monApp\controllers\pages\pageContactController@index");

        $p = tools::get("p");

        $route = self::$rooter->getRoute($p);
        self::$dispatcher = new dispatcher();
        ob_start();
            self::$dispatcher->dispatch($route);
            self::$html = ob_get_contents();
        ob_end_clean();
    }

    public static function getHtml(){
        return self::$html;
    }

    public static function redirection($url) {
        header("Location: " . $url);
        exit();
    }
}

?>