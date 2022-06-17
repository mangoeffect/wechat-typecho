CREATE TABLE `typecho_pisces` (
  `id`                int(10) unsigned NOT NULL auto_increment,
  `type`              varchar(255)     default ''  ,
  `openid`            varchar(255)     default ''  ,
  `createtime`        int(10)          default 0   ,
  `lastlogin`         int(10)          default 0   ,
  `nickname`          varchar(255)     default ''  ,
  `avatarUrl`         varchar(255)      default ''  ,
  `city`              varchar(255)      default ''  ,
  `country`           varchar(255)      default ''  ,
  `gender`            varchar(255)      default ''  ,
  `province`          varchar(255)     default ''  ,
  `points`          int(10)     default 0  ,
  

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;