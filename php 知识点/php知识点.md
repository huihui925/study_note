# 获取url 路径query参数 并渲染到页面

>  $_GET['参数名']是php特有方法 里面写参数名字
>
> url: `http://ek021.wanwusl.com/app/index.php?qqt_num=998`

```php


<div>恭喜你, 成功兑换<?php  echo $_GET['qqt_num']; ?>颗紫钻</div>
    
<?php  echo $_GET['qqt_num']; ?>
```

