<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * Pisces小程序插件 <br>
 * 特别感谢：<a href="https://2012.pro/index.php/20180806/cid=37.html">成都第七帅</a><br>
 *用户中心：<a href='https://www.i4qq.com/admin/extending.php?panel=Pisces/Users.php'>用户中心</a><br>
 * @package Pisces小程序
 * @author  小创果
 * @link https://www.i4qq.com
 *
 */
class Pisces_Plugin implements Typecho_Plugin_Interface
{
    public static function activate()
    {
        //添加访问接口
        Helper::addRoute('jsonp', '/api/[type]', 'Pisces_Action');
        Helper::addAction('json', 'Pisces_Action');
        Helper::removePanel(1, 'Pisces/users.php');
        Helper::addPanel(1, 'Pisces/Users.php', 'Pisces', '我的用户', 'administrator');
        $db = Typecho_Db::get();
        $prefix = $db->getPrefix();
        Typecho_Plugin::factory('Widget_Archive')->beforeRender = array('Pisces_Plugin','view_count');
        //创建用户数据库
        $scripts = file_get_contents('usr/plugins/Pisces/sql/pisces.sql');
        $scripts = str_replace('typecho_', $prefix, $scripts);
        $scripts = explode(';', $scripts);
        try {
            if (!$db->fetchRow($db->query("SHOW TABLES LIKE '{$prefix}pisces';", Typecho_Db::READ))) {
                foreach ($scripts as $script) {
                    $script = trim($script);
                    if ($script) {
                        $db->query($script, Typecho_Db::WRITE);
                    }
                }
            }
        } catch (Typecho_Db_Exception $e) {
            throw new Typecho_Plugin_Exception(_t('数据表建立失败，插件启用失败，错误信息：%s。', $e->getMessage()));
        } catch (Exception $e) {
            throw new Typecho_Plugin_Exception($e->getMessage());
        }
        //创建赞数据库
        $scriptslike = file_get_contents('usr/plugins/Pisces/sql/pisceslike.sql');
        $scriptslike = str_replace('typecho_', $prefix, $scriptslike);
        $scriptslike = explode(';', $scriptslike);
        try {
            if (!$db->fetchRow($db->query("SHOW TABLES LIKE '{$prefix}pisceslike';", Typecho_Db::READ))) {
                foreach ($scriptslike as $script) {
                    $script = trim($script);
                    if ($script) {
                        $db->query($script, Typecho_Db::WRITE);
                    }
                }
            }
        } catch (Typecho_Db_Exception $e) {
            throw new Typecho_Plugin_Exception(_t('数据表建立失败，插件启用失败，错误信息：%s。', $e->getMessage()));
        } catch (Exception $e) {
            throw new Typecho_Plugin_Exception($e->getMessage());
        }
        //创建赞数据库
        try {
            //增加点赞和阅读量
            if (!array_key_exists('views', $db->fetchRow($db->select()->from('table.contents'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'contents` ADD `views` INT DEFAULT 0;'
                );
            }
            if (!array_key_exists('likes', $db->fetchRow($db->select()->from('table.contents'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'contents` ADD `likes` INT DEFAULT 0;'
                );
            }
            if (!array_key_exists('authorImg', $db->fetchRow($db->select()->from('table.comments'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'comments` ADD `authorImg` varchar(500) DEFAULT NULL;'
                );
            }
        } catch (Exception $e) {
            echo($e->getMessage());
        }
    }

    public static function deactivate()
    {
        Helper::removeRoute('jsonp');
        Helper::removeAction('json');
        Helper::removePanel(1, 'Pisces/Users.php');
    }

    public static function config(Typecho_Widget_Helper_Form $form)
    {        
    
        $swipePosts = new Typecho_Widget_Helper_Form_Element_Text('swipePosts', NULL, '1,2', _t('海报列表'),  _t('要在滑动列表里面显示的文章的cid值，用英文逗号隔开。'));
        $form->addInput($swipePosts);
        $recommend = new Typecho_Widget_Helper_Form_Element_Text('recommend', NULL, '1,2', _t('公告列表'),  _t('公告中显示的文章的cid值，用英文逗号隔开。'));
        $form->addInput($recommend);
        $apiSecret = new Typecho_Widget_Helper_Form_Element_Text('apiSecret', NULL, 'xxx', _t('APISEC'),  _t('要与小程序端config.js中API_SECRET字段保持一致，否则无法从服务器读取数据'));
        $form->addInput($apiSecret);
        $appID = new Typecho_Widget_Helper_Form_Element_Text('appid', NULL, 'xxx', _t('QQ小程序的APPID'),  _t('小程序的APPID'));
        $form->addInput($appID);
        $appSecret = new Typecho_Widget_Helper_Form_Element_Text('appsecret', NULL, 'xxx', _t('QQ小程序的APP secret ID'),  _t('小程序的APP secret ID'));
        $form->addInput($appSecret);
        $wxappID = new Typecho_Widget_Helper_Form_Element_Text('wxappid', NULL, 'xxx', _t('微信小程序的APPID'),  _t('小程序的APPID'));
        $form->addInput($wxappID);
        $wxappSecret = new Typecho_Widget_Helper_Form_Element_Text('wxappsecret', NULL, 'xxx', _t('微信小程序的APP secret ID'),  _t('小程序的APP secret ID'));
        $form->addInput($wxappSecret);
        $thumb = new Typecho_Widget_Helper_Form_Element_Text('thumb', NULL, 'https://tuku.ycygame.cn/anhaowu/shoutu.png', _t('文章默认首图'),  _t('文章在没有首图时的默认图片，请输入图片地址'));
        $form->addInput($thumb);
        $hotcat =  new Typecho_Widget_Helper_Form_Element_Textarea('hotcat', NULL, NULL, _t('首页热门分类'), _t('格式：mid|图片地址。一行一个，用 | 隔开。'));
		$form->addInput($hotcat);
        $author = new Typecho_Widget_Helper_Form_Element_Text('author', NULL, '安好成功屋', _t('博客作者名称'),  _t('文章详情页博客作者信息的名称'));
        $form->addInput($author);
        $website = new Typecho_Widget_Helper_Form_Element_Text('website', NULL, 'www.i4qq.com', _t('博客网址'),  _t('文章详情页博客作者信息的网址'));
        $form->addInput($website);
        $account = new Typecho_Widget_Helper_Form_Element_Text('account', NULL, '阳光艺创站', _t('微信公众号'),  _t('文章详情页博客作者信息的微信公众号'));
        $form->addInput($account);
        $aboutCid = new Typecho_Widget_Helper_Form_Element_Text('aboutCid', NULL, '1', _t('关于页面CID'),  _t('小程序关于页面显示内容'));
        $form->addInput($aboutCid);
        $hiddenmid = new Typecho_Widget_Helper_Form_Element_Text('hiddenmid', NULL, NULL, _t('要在小程序端显示的分类的mid(其余隐藏)，为了过微信审核你懂的^-^，可在过审核后取消隐藏（不填写则不隐藏任何分类）。'),  _t('可在Typecho后台分类管理中查看分类的mid，以英文逗号隔开。不填写则不隐藏任何分类'));
        $form->addInput($hiddenmid);
        $hiddenShare = new Typecho_Widget_Helper_Form_Element_Radio('hiddenShare', array ('0' => '禁用', '1' => '启用'), '1', _t('是否关闭小程序评论功能'),  _t('审核时建议关闭，审核通过后再开启。'));
        $form->addInput($hiddenShare);
    }

    public static function personalConfig(Typecho_Widget_Helper_Form $form){

    }
    

    public static function render(){}
    public static function view_count($archive)
    {
        if ($archive->is('single')) 
        {
            $cid = $archive->cid;
            $db = Typecho_Db::get();
            $row = $db->fetchRow($db->select('views')->from('table.contents')->where('cid = ?', $cid));
            $db->query($db->update('table.contents')->rows(array('views' => (int)$row['views']+1))->where('cid = ?', $cid));
        }
    }
}