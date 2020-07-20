## 主题开发注意事项

### 原则上禁止以下行为(如有特殊情况例外)

* **禁止写死主题色。应该使用变量：**
  
```
  '@primary-color': '#00C1DE', // 全局主色  主颜色
  '@link-color': '#1890ff', // 链接色
  '@success-color': '#52c41a', // 成功色
  '@warning-color': '#faad14', // 警告色
  '@error-color': '#f5222d', // 错误色
```
* **禁止在输入框、按钮设置死高度。应该使用变量：**
  
```
  '@btn-height-base': '28px', // 按钮，普通高度
  '@btn-height-sm': '22px', // 按钮，sm高度
  '@input-height-base': '28px', // 输入框，普通高度
  '@input-height-sm': '22px', // 输入框，sm高度
```
* **禁止设置全局的font-family**
* **禁止设置全局的或者局部的color。应该使用变量：**
```
  '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
  '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
  '@text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
  '@disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
```
* **禁止设置全局的或者局部的font-size。应该使用变量：**
```
  '@font-size-base': '12px', // 主字号 md
  '@font-size-lg': '@font-size-base + 2px;', // 字号 lg
```
* **禁止设置全局的或者局部的border颜色、圆角和阴影。应该使用变量：**
```
  '@border-radius-base': '2px', // 组件/浮层圆角
  '@border-color-base': '#d9d9d9', // 边框色
  '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
```