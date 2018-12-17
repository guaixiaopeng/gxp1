var express = require('express');
var router = express.Router();
var connection = require('../db/db');
var mydata = {
  top: "头条",
  junshi: "军事",
  yule: "娱乐",
  shishang: "时尚",
  shehui: "社会",
  tiyu: "体育",
  guonei: "国内",
  caijing: "财经",
  keji: "科技"
};

/* 新闻模块跟路由 、news */
var r = {};
router.get('/', function(req, res, next) {
  var sql = "select * from category";
  connection.query(sql,function(err,result){
    if(err){
      console.log(err);
      r.status = 505;
      r.data = "获取失败";
    }else{
      r.status = 200;
      r.data = result;
    }
    res.json(r);
  });
});

/*新闻列表（根据分类）/news/top   /news/shehui....*/
router.get("/:cname", function(req, res, next) {
    var cateName = mydata[req.params.cname];  //对应的中文形式
    var sql = "select title,date_format(date, '%Y年%m月%d日 %H:%i:%s') date,category,author_name,url,"+
    "thumbnail_pic_s,thumbnail_pic_s02 from newsinfo where category= ?";
    connection.query(sql,[cateName],function(err,result){
        if(err){
          console.log(err);
          r.status = 506;
          r.data = "获取列表失败";
        }else{
          // console.log(result);
          r.status = 208;
          r.data = result;
        }
        // res.send("新闻列表" + cateName);
        res.json(r);
    });
    
  });

module.exports = router;
