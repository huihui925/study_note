## transform 动画

可以写多个

```css
transform: translate(100px) rotate(20deg);
```

## text-indent 段落缩进

规定文本块中首行文本的缩进。

```css
p{
  text-indent:2em;
  }
```

## background背景

origin译起源 表示只显示内容盒 如果设置了padding 则显示padding除外的内部区域

配合clip使用 clip会把内容盒外盒显示的区域都剪切掉

![image-20200117195417145](css.assets/image-20200117195417145.png)

## 百分比宽度

1、设置<meta name="viewport" content="width=device-width, initial-scale=1">

2、设置页面宽度为百分比

我们需要重新认识CSS里百分比的使用，见代码示例4-9.html

// 测试下列属性设置为百分比

width    参照父元素的宽度

height      参照父元素的高度

padding  参照父元素的宽度

border   不支持百分比设置

margin   参照父元素的宽度

## rem和em

em是当前元素的字体大小 如果当前元素未设置 就是父级元素 父级元素未设置就再往上 直至浏览器默认字体大小

rem是根元素html的字体大小 如果html根元素没设置就是浏览器默认字体大小

 

# 贝塞尔曲线

贝塞尔曲线就是动画速度曲线,对速度的展示

平常我们用的`transition:all .5s ease`这里的ease就是速度曲线,如果我们想展示其他速度,可以用工具,找到自己想要的速度,然后`transition: all 3.0s cubic-bezier(0.75, 0.25, 0.25, 0.75)`

替换对应位置即可