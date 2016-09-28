
WebStrom支持ES6的很多版本，并使用[Traceur](https://github.com/google/traceur-compiler)作为标准的转换器。

这篇文章主要介绍怎么在WebStrom中配置[Babel](https://babeljs.io/)（以前叫6to5）。因为Babel对ES6的支持程度比Traceur要高，并且Babel拥有完善的文档和一个很棒的[在线交互式环境](https://babeljs.io/repl/)。

## 准备工作
### 通过npm安装Babel
```
# 注意：是babel-cli而不是babel
npm install -g babel-cli
```

### 通过npm安装Babel的preset
```
npm install --save-dev babel-preset-es2015
```

## 步骤
接下来的步骤将会演示将“main.es6”的文件（文件遵循ES6语法），通过WebStrom转换成遵循ES5语法的“main.js”的文件。

### 1.新建一个工程
新建一个空白的工程，用于配置Babel。

### 2.更改WebStrom的JavaScript版本
这一步的目的是让WebStrom支持ES6的语法。

具体步骤：
+ 打开“Settings”；
+ 打开“Languages & Frameworks”；
+ 打开“JavaScript”，将“JavaScript language version”的版本改为“ECMAScript6”；
+ 保存当前更改。

如下图：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel1.jpg)

### 3.添加新的扩展名——“es6”
这一步的目的是用于区别ES6的js文件和其他js文件。

具体步骤：
+ 打开“Settings”；
+ 打开“Editor”；
+ 打开“File types”->在“Recognized File Types（已认可的文件类型）”选项中选中“JavaScript”；
+ 在“Registered Patterns（已注册的模式）”选择添加模式，在弹出的选项中键入“*.es6”；
+ 保存当前更改。

如下图：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel2.jpg)

### 4.修改文件模板
这一步的目的是配置es6文件的默认模板。

具体步骤：
+ 打开“Settings”；
+ 打开“Editor”；
+ 打开“File and code templates”；
+ 新建“ES6-file”，修改“Extension”的值为“es6”；
+ 你可以根据自己的修改其他配置；
+ 保存当前更改。

如下图：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel3.jpg)

### 5.新建“.babelrc”配置文件
这一步的目的是指定Babel转换时使用的规则，即之前安装的“babel-preset-es2015”。
```
# 在window下不能直接创建.babelrc的文件，请在命令行中创建，例如：
touch .babelrc

# 在.babelrc文件中键入以下代码：
{
  "presets": [
    "es2015"
  ]
}
```

### 6.设置监听器
这一步的目的是让WebStrom监听“*.es6”文件的更改，并依据之前安装的“perset-2015”转换ES6文件的语法。

具体步骤：
+ 打开“Settings”；
+ 打开“Tools”；
+ 打开“File Watchers”；
+ 点击右侧加号，并选择Typescript。（我们将修改Typescript的配置）
+ 在弹出的配置项中按照下图填写；
+ 保存当前更改。

![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel4.jpg)

其中:
+ Program的值为babel.cmd的路径，在Window中，默认路径为：
    ```
    C:\Users\<Your Name>\AppData\Roaming\npm\babel.cmd
    ```
+ Arguments的值为：
    ```
    # 这表示将在同级目录生成同样名称的.js文件和.map文件
    $FileName$ -o $FileNameWithoutAllExtensions$.js -s  
    ```

### 7.只转换.es6的文件
现在基本上配置完成了，但这时WebStrom将会编译所有文件类型为JavaScript的文件，这其中也包括我们并不像被转换的文件。这一步的目的是过滤出后缀名为“.es6”的文件。

在第6步的基础上，点击“Scope”后的“...”符号，在弹出的选项中按照下图配置：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel5.jpg)

将“Scope”的值选择为刚才修改的“ES6”，保存当前修改。


## End
自此，Babel的编辑环境安装成功，新建一个demo.es6的文件，并随便写一些ES6语法的脚本。如下图：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel6.jpg)

编译后的demo.js的文件内容如下：
![](http://7xtoaz.com1.z0.glb.clouddn.com/Configuring-Babel7.jpg)

## 相关文章
+ [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
+ [Phpstorm 中 使用Babel 编译es6文件](http://zhishu.huati365.com/read/PHPStorm/PHPStorm%20%E4%B8%AD%20%E4%BD%BF%E7%94%A8Babel%20%E7%BC%96%E8%AF%91es6%E6%96%87%E4%BB%B6)
+ [Babel-现在开始使用 ES6](http://www.cnblogs.com/whitewolf/p/4357916.html)
