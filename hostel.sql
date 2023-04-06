# Host: localhost  (Version: 5.7.26)
# Date: 2021-12-28 21:15:14
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "discipline"
#

CREATE TABLE `discipline` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='纪律表';

#
# Data for table "discipline"
#

INSERT INTO `discipline` VALUES (19,'testtesttesttesttest','2021-12-17 21:45:36'),(20,'testtesttest','2021-12-17 21:45:37'),(21,'testtesttesttest','2021-12-17 21:45:39'),(22,'testtesttesttest','2021-12-17 21:45:41'),(23,'testtesttesttesttest','2021-12-17 21:45:43'),(24,'testtesttesttest','2021-12-17 21:45:46'),(25,'testtesttesttest','2021-12-17 21:45:48'),(26,'testtesttesttest','2021-12-17 21:45:50');

#
# Structure for table "exchange"
#

CREATE TABLE `exchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reporter` varchar(60) NOT NULL DEFAULT '' COMMENT '申请人',
  `old` varchar(60) NOT NULL DEFAULT '' COMMENT '原宿舍',
  `new` varchar(60) NOT NULL DEFAULT '' COMMENT '申请去向',
  `cause` varchar(100) NOT NULL DEFAULT '' COMMENT '原因',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
  `account` varchar(60) DEFAULT NULL COMMENT '账号',
  `state` int(11) DEFAULT NULL COMMENT '0:未审核;1:驳回;2:通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='换宿表';

#
# Data for table "exchange"
#

INSERT INTO `exchange` VALUES (1,'赵天煌','10-504','外宿','在信利租房,申请外宿','2021-07-12 23:46:29','zth',0),(3,'冯星悦','10-504','10-505','宿舍没有学习氛围,想去505跟陈应运一起学习','2021-07-12 23:46:29','zth',2),(4,'赖梓良','10-504','赤岭水库','可以天天钓鱼挖螃蟹,就跟回到自己家一样,超爽的啦','2021-07-12 23:46:29','zth',1),(8,'冯星悦','10-504','10-505','宿舍没有学习氛围,先去505和陈应运一起打游...学习!','2021-12-17 21:22:12','fxy',1);

#
# Structure for table "hostel"
#

CREATE TABLE `hostel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `hostelId` varchar(60) DEFAULT NULL COMMENT '宿舍号',
  `member1` varchar(60) DEFAULT NULL COMMENT '成员1',
  `member2` varchar(60) DEFAULT NULL COMMENT '成员2',
  `member3` varchar(60) DEFAULT NULL COMMENT '成员3',
  `member4` varchar(60) DEFAULT NULL COMMENT '成员4',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='宿舍表';

#
# Data for table "hostel"
#

INSERT INTO `hostel` VALUES (1,'10-101','小王','小陈','小李','小杨','2021-12-13 01:18:29'),(2,'10-102','2019325101阿黄','2019325102阿红','2019325103阿紫','2019325104阿绿','2021-12-13 01:54:43');

#
# Structure for table "inandout"
#

CREATE TABLE `inandout` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL COMMENT '登记人',
  `content` varchar(255) DEFAULT NULL COMMENT '事件',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登记时间',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='出入登记';

#
# Data for table "inandout"
#

INSERT INTO `inandout` VALUES (1,'杨晓瀚','胃疼,外出就诊','2021-12-13 02:50:25'),(17,'欧青林','啊对对对!!!','2021-12-17 21:46:36'),(18,'赖梓良','拿外卖','2021-12-17 21:46:51'),(19,'赵天煌','出征!','2021-12-17 21:47:15');

#
# Structure for table "notice"
#

CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `content` varchar(100) NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

#
# Data for table "notice"
#

INSERT INTO `notice` VALUES (40,'宿舍大扫除','9.11号进行舍区大扫除,请','2021-12-17 21:20:03'),(47,'test','test','2021-12-17 21:44:44'),(48,'testtest','test','2021-12-17 21:44:46'),(49,'test','test','2021-12-17 21:44:49'),(50,'testtesttest','testtesttest','2021-12-17 21:44:52'),(51,'testtest','testtest','2021-12-17 21:44:55'),(52,'testtest','testtesttest','2021-12-17 21:44:58'),(53,'testtest','testtesttest','2021-12-17 21:45:03'),(54,'ces ','sad','2021-12-27 11:54:28');

#
# Structure for table "repair"
#

CREATE TABLE `repair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hostelId` varchar(60) NOT NULL DEFAULT '' COMMENT '宿舍号',
  `trouble` varchar(100) NOT NULL DEFAULT '' COMMENT '问题',
  `reporter` varchar(60) NOT NULL DEFAULT '' COMMENT '报修人',
  `account` varchar(255) DEFAULT NULL COMMENT '报修账号',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报修时间',
  `state` varchar(255) DEFAULT NULL COMMENT '0:未审核;1:驳回;2:通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

#
# Data for table "repair"
#

INSERT INTO `repair` VALUES (1,'10-504','风扇坏了','赵天煌','zth','2021-07-12 22:32:07','2'),(2,'10-508','宿舍的锅坏了,煮不了海鲜了,能帮忙修一下吗?秋梨膏orz','王俊珠','stu2','2021-07-12 22:32:07','1'),(3,'10-504','赖梓良脑子坏了,要报修','中山彭于晏','zth','2021-07-12 22:32:07','1'),(4,'zth','132','123','333','2021-12-14 11:13:16','2'),(5,'zth','ad','sad','asd','2021-12-14 11:13:30','1'),(7,'10-504','欧青林脑子坏了,需要维修','冯星悦','fxy','2021-12-17 21:22:53','2'),(8,'10-504','阳台洗衣池有裂缝','赵天煌','zth','2021-12-17 21:48:46','0'),(9,'10-504','我脑子坏了,需要修一修','欧青林','oql','2021-12-21 15:53:31','2'),(10,'qwe','qwe','qwe','oql','2021-12-22 12:13:16','0'),(11,'sda','asdasd','adsad','oql','2021-12-22 12:13:32','0'),(12,'','','','','2021-12-22 12:13:33','2'),(14,'asd','asd','asd','aaa','2021-12-23 11:46:52','1');

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(60) NOT NULL DEFAULT '' COMMENT '账户',
  `password` varchar(60) NOT NULL DEFAULT '' COMMENT '密码',
  `state` int(11) DEFAULT NULL COMMENT '0:学生;1:管理员',
  `name` varchar(60) DEFAULT NULL COMMENT '姓名',
  `number` varchar(255) DEFAULT NULL COMMENT '编号',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'admin','000',1,'杨老师','t202000111','2021-12-17 13:15:47'),(2,'zth','123',0,'赵天煌','2019326144','2021-12-17 13:15:47'),(6,'oql','123',0,'欧青林','2019326116','2021-12-17 13:25:21'),(7,'lzl','123',0,'赖梓良','2019326133','2021-12-17 13:47:18'),(9,'aaa','123',0,'sajdid','20251115','2021-12-23 11:45:30');
