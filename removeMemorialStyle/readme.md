## 移除网页灰色效果

油猴原版地址：https://greasyfork.org/zh-CN/scripts/399471-filter-remover/

增加灰色效果参考： https://www.zhangxinxu.com/wordpress/2012/08/css-svg-filter-image-grayscale/

某些特殊代码参考

```
<script style="text/javascript">
    window.CheckMemorial = function() {
        var memorialDay = '12-13';
        var T = new Date();
        var M = T.getMonth(), D = T.getDate();
        var S = (M+1) + '-' + D;
        if(S == memorialDay) {
            return true;
        }
        return false;
    }
    if(true || window.CheckMemorial()) {
        window.MemorialStyle = document.createElement('style');
        window.MemorialStyle.setAttribute('type', 'text/css');
        document.head.appendChild(window.MemorialStyle);
        window.MemorialStyle.sheet.insertRule('.container-ceiling,.container-main,.dialog-box,.feature-float,.article-reader{filter:grayscale(1)!important}', 0);
    }
</script>
```