# 网格布局

## 一、什么是网格布局

网格是一组相交的水平线和垂直线，它定义了网格的列和行。我们可以将网格元素放置在与这些列和行相关的位置上

## 二、基本使用

![](.\\images\image.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网格布局</title>
    <style>
        .container{
            display: grid;
            grid-template-columns: 33.3%  33.3%  33.3%;
            grid-template-rows: 33.3%  33.3%  33.3%;
            background-color: aqua;
            width: 500px;
            height: 500px;
            .item{
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
        <div class="item">8</div>
        <div class="item">9</div>
    </div>
</body>
</html>
```
## 三、网格布局相关概念

### 1、网格容器
我们通过在元素上声明 display：grid 或 display：inline-grid 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格项目。

### 2、网格轨道
我们使用 grid-template-rows 和 grid-template-columns 属性定义网格上的行和列。这些属性定义了网格轨道。网格轨道（grid track）是网格上任意两条相邻线之间的空间

### 3.网格线
当我们定义网格时，我们定义的是网格轨道，而不是网格线。网格布局会为我们创建编号的网格线来让我们来定位每一个网格元素。例如下面这个三列三行的网格中，就拥有四条纵向的网格线。

![](.\\images\\image.png)

### 4.网格单元
一旦一个网格元素被定义为父级元素，那么它的子级元素将会排列在每个事先定义好的网格单元中。

![](.\\images\\image2.png)

### 5.网格区域
项目可以按行或列跨越一个或多个单元格，这样就形成了一个网格区域（grid area）。网格区域必须是矩形的（例如不能创建 L 形区域）。

![](.\\images\\image3.png)

### 6.网格间距
网格单元格之间的横向间距（gutter）或纵向间距（alley）可以使用 column-gap 和 row-gap 属性或简写 gap 来创建。在下面的示例中，我在列与列之间创建了 10 像素的间隙，在行与行之间创建了 1em 的间隙。

`备注：当网格布局首次在浏览器中使用时，column-gap、row-gap 和 gap 都带有 grid- 前缀，分别称为 grid-column-gap、grid-row-gap 和 grid-gap。现在，所有浏览器都支持无前缀值，但前缀版本将作为别名保留，以便安全使用。`

## 四、相关属性

### 1、容器属性

- dispaly属性

    - grid：该容器是一个块级元素
    - inline-grid(目前浏览器不支持，需要带前缀)该容器是一个行内元素

- grid-template-columns 属性和 grid-template-rows 属性

    - grid-template-columns 属性设置列宽
    - grid-template-rows 属性设置行高

```css
.wrapper {
  display: grid;
  /*  声明了三列，宽度分别为 200px 100px 200px */
  grid-template-columns: 200px 100px 200px;
  /*  声明了两行，行高分别为 50px 50px  */
  grid-template-rows: 50px 50px;
}
```
> repeat() 函数：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值

```css
    grid-template-rows: repeat(2,50px);
```

`auto-fill` 关键字：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。grid-template-columns: repeat(auto-fill, 200px) 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素

```css
grid-template-columns: repeat(auto-fill,200px)
```

`fr`关键字：Grid 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。fr 单位代表网格容器中可用空间的一等份。grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。

```css
grid-template-columns: 200px 1fr 2fr;
```

>`minmax() 函数`：我们有时候想给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。grid-template-columns: 1fr 1fr minmax(300px, 2fr) 的意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍。

`auto` 关键字：由浏览器决定长度。通过 auto 关键字，我们可以轻易实现三列或者两列布局。grid-template-columns: 100px auto 100px 表示第一第三列为 100px，中间由浏览器决定长度，

- grid-row-gap 属性、grid-column-gap 属性以及 grid-gap 属性

    - grid-row-grap:行间距
    - grid-column-grap:列间距
    - grid-gap 属性是两者的简写形式。

```css
    grid-gap: 10px 20px;

    grid-row-gap: 10px;
    grid-column-gap: 20px;
```

- grid-template-areas 属性
    - grid-auto-flow 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，
    - 设置 grid-auto-flow: row dense，表示尽可能填满表格
    - grid-auto-flow:column