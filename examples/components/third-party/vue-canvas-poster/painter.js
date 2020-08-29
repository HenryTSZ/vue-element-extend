// 海报图
export function drawPoster(data) {
  return new Promise(function(resolve) {
    switch (data.type) {
      case 'pro':
        resolve(poster())
        break
      case 'base':
        resolve(drawBasePoster())
        break
      case 'image':
        resolve(drawImgPoster())
        break
      case 'bridge':
        resolve(drawBridge())
        break
      case 'bridge1':
        resolve(drawBridge1())
        break
      default:
        resolve(poster())
    }
  })
}

function drawBridge() {
  const bridgeData = {
    top: [
      {
        id: 11,
        name: 't1',
        len: 50
      },
      {
        id: 12,
        name: 't2',
        len: 20
      },
      {
        id: 13,
        name: 't2',
        len: 10
      },
      {
        id: 14,
        name: 't2',
        len: 20
      },
      {
        id: 15,
        name: 't3',
        len: 20
      },
      {
        id: 16,
        name: 't3',
        len: 30
      },
      {
        id: 17,
        name: 't3',
        len: 10
      }
    ],
    bottom: [
      {
        id: 20,
        name: '0#',
        position: 10
      },
      {
        id: 21,
        name: '1#',
        position: 60
      },
      {
        id: 22,
        name: '2#',
        position: 100
      },
      {
        id: 23,
        name: '3#',
        position: 130
      },
      {
        id: 24,
        name: '4#',
        position: 170
      }
    ]
  }
  const { top, bottom } = bridgeData
  const dTop = '55px'
  const zTop = '5px'
  const lTop = '5px'
  const tTop = '60px'
  const width = top.reduce((acc, item) => acc + item.len, 0) + 100 + 'px'
  console.log('TCL: drawBridge -> width', width)
  let views = []
  bottom.forEach(item => {
    views.push(
      {
        type: 'rect',
        css: {
          top: dTop,
          left: item.position + 'px',
          color: '#fff',
          width: '16px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'rect',
        css: {
          top: zTop,
          left: `${item.position + 5}px`,
          color: '#fff',
          width: '6px',
          height: '50px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'text',
        text: item.name,
        css: {
          top: tTop,
          left: `${item.position + 5}px`,
          color: '#999',
          fontSize: '5px'
        }
      }
    )
  })
  top.reduce((acc, item, index, arr) => {
    acc += index ? arr[index - 1].len : bottom[index].position
    views.push({
      type: 'rect',
      css: {
        top: lTop,
        left: acc + 'px',
        color: '#fff',
        width: item.len + 'px',
        height: '5px',
        borderWidth: '0.3px',
        borderColor: '#d9d9d9'
      }
    })
    return acc
  }, 8)
  return {
    width: '300px',
    height: '100px',
    background: '#f4f5f7',
    views
  }
}
function drawBridge1() {
  return {
    width: '550px',
    height: '300px',
    background: '#f4f5f7',
    views: [
      {
        // 柱
        type: 'rect',
        css: {
          top: '100px',
          left: '20px',
          color: '#fff',
          width: '5px',
          height: '50px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        // 墩
        type: 'rect',
        css: {
          top: '150px',
          left: '15px',
          color: '#fff',
          width: '15px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        // 梁
        type: 'rect',
        css: {
          top: '100px',
          left: '23px',
          color: '#fff',
          width: '50px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        // 字
        type: 'text',
        text: '0#',
        css: {
          top: '160px',
          left: '18px',
          color: '#999',
          fontSize: '7px'
        }
      },
      {
        type: 'rect',
        css: {
          top: '100px',
          left: '73px',
          color: '#fff',
          width: '5px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: 'rgba(0, 0, 0, .8)'
        }
      },
      {
        type: 'rect',
        css: {
          top: '106px',
          left: '76px',
          color: '#fff',
          width: '5px',
          height: '44px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'rect',
        css: {
          top: '150px',
          left: '71px',
          color: '#fff',
          width: '15px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'text',
        text: '1#',
        css: {
          top: '160px',
          left: '75px',
          color: '#999',
          fontSize: '7px'
        }
      },
      {
        type: 'rect',
        css: {
          top: '100px',
          left: '78px',
          color: '#fff',
          width: '10px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: 'rgba(0, 0, 0, .8)'
        }
      },
      {
        type: 'rect',
        css: {
          top: '100px',
          left: '88px',
          color: '#fff',
          width: '7px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: 'rgba(0, 0, 0, .8)'
        }
      },
      {
        type: 'rect',
        css: {
          top: '100px',
          left: '95px',
          color: '#fff',
          width: '15px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: 'rgba(0, 0, 0, .8)'
        }
      },
      {
        type: 'rect',
        css: {
          top: '100px',
          left: '110px',
          color: '#fff',
          width: '20px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: 'rgba(0, 0, 0, .8)'
        }
      },
      {
        type: 'rect',
        css: {
          top: '106px',
          left: '125px',
          color: '#fff',
          width: '5px',
          height: '44px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'rect',
        css: {
          top: '150px',
          left: '120px',
          color: '#fff',
          width: '15px',
          height: '5px',
          borderWidth: '0.3px',
          borderColor: '#d9d9d9'
        }
      },
      {
        type: 'text',
        text: '2#',
        css: {
          top: '160px',
          left: '123px',
          color: '#999',
          fontSize: '7px'
        }
      }
    ]
  }
}
function poster() {
  return {
    width: '550px',
    height: '876px',
    background: '#f4f5f7',
    views: [
      {
        type: 'image',
        url: require('./assets/avatar.jpg'),
        css: {
          top: '20px',
          left: '36px',
          borderRadius: '40px',
          width: '80px',
          height: '80px'
        }
      },

      {
        type: 'text',
        text: '乖摸摸头的小店,我设置了maxLines为1',
        css: {
          top: '48px',
          left: '136px',
          width: '360px',
          maxLines: 1,
          fontSize: '26px'
        }
      },
      {
        type: 'rect',
        css: {
          top: '120px',
          left: '12px',
          color: '#fff',
          width: '526px',
          height: '540px',
          borderRadius: '10px'
        }
      },
      {
        type: 'image',
        url: require('./assets/1.jpg'),
        css: {
          top: '150px',
          left: '25px',
          width: '332px',
          height: '332px'
        }
      },
      {
        type: 'image',
        url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/2.jpg',
        css: {
          top: '150px',
          left: '364px',
          width: '160px',
          height: '160px'
        }
      },
      {
        type: 'image',
        url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/3.jpg',
        css: {
          top: '320px',
          left: '364px',
          width: '160px',
          height: '160px'
        }
      },
      {
        type: 'text',
        text: '18987、安奈儿童装上衣条纹童装上衣条纹童装上衣 条纹童装上衣',
        css: {
          top: '507px',
          left: '25px',
          color: '#666666',
          fontSize: '22px',
          width: '450px',
          lineHeight: '33px',
          maxLines: 2
        }
      },
      {
        type: 'text',
        text: '劲爆价:',
        css: {
          top: '608px',
          left: '26px',
          color: '#666666',
          fontSize: '24px'
        }
      },
      {
        type: 'text',
        text: '¥39.00',
        css: {
          top: '601px',
          left: '116px',
          color: '#E5463E',
          fontSize: '36px',
          fontWeight: 'bold'
        }
      },
      {
        type: 'text',
        text: '¥259.00',
        css: {
          top: '609px',
          left: '243px',
          color: '#999999',
          fontSize: '26px',
          fontWeight: 'bold',
          textDecoration: 'line-through'
        }
      },
      {
        type: 'rect',
        css: {
          top: '647px',
          left: '439px',
          color: '#fff',
          width: '28px',
          height: '28px',
          rotate: 45
        }
      },
      {
        type: 'text',
        text: '长按或扫描二维码',
        css: {
          fontSize: '18px',
          color: '#999999',
          bottom: '22px',
          left: '385px'
        }
      },
      // 本地图片
      {
        type: 'image',
        url: require('./assets/slogen.png'),
        css: {
          left: '26px',
          bottom: '22px',
          width: '218px',
          height: '24px'
        }
      },
      {
        type: 'qrcode',
        content: 'https://github.com/sunnie1992/vue_canvas_poster',
        css: {
          bottom: '50px',
          right: '26px',
          color: '#000',
          width: '130px',
          height: '130px'
        }
      }
    ]
  }
}

function drawBasePoster() {
  return {
    width: '654px',
    height: '1000px',
    background: '#eee',
    views: [
      _textDecoration('overline', 0),
      _textDecoration('underline', 1),
      _textDecoration('line-through', 2),
      _textDecoration('overline underline line-through', 3, 'red'),
      {
        type: 'rect',
        css: {
          width: '200px',
          right: '20px',
          top: '30px',
          height: '100px',
          borderRadius: '100px',
          shadow: '10px 10px 5px #888888',
          color: 'linear-gradient(-135deg, #fedcba 0%, rgba(18, 52, 86, 1) 20%, #987 80%)'
        }
      },
      {
        id: 'my-text-id',
        type: 'text',
        text: "fontWeight: 'bold'",
        css: [
          {
            top: `${startTop + 4 * gapSize}px`,
            shadow: '10px 10px 5px #888888',
            fontWeight: 'bold'
          },
          common
        ]
      },
      {
        type: 'rect',
        css: {
          width: '20px',
          height: '20px',
          color: 'red',
          left: [`${startTop}px`, 'my-text-id'],
          top: `${startTop + 4 * gapSize + 15}px`
        }
      },
      {
        id: 'text-id-2',
        type: 'text',
        text: '我是把width设置为400px后，我就换行了xx行了',
        css: [
          {
            top: `${startTop + 5 * gapSize}px`,
            align: 'center',
            width: '400px',
            background: '#538e60',
            textAlign: 'center',
            padding: '10px'
          },
          common,
          { left: '300px' }
        ]
      },
      {
        type: 'rect',
        css: {
          width: '20px',
          height: '20px',
          color: 'red',
          left: '200px',
          top: [`${startTop + 5 * gapSize}px`, 'text-id-2']
        }
      },
      {
        type: 'text',
        text: '我设置了maxLines为1，看看会产生什么效果',
        css: [
          {
            top: `${startTop + 7 * gapSize}px`,
            width: '500px',
            maxLines: 1
          },
          common
        ]
      },
      _image(0),
      _des(0, '普通'),
      _image(1, 30),
      _des(1, 'rotate: 30'),
      _image(2, 30, '20px'),
      _des(2, 'borderRadius: 30px'),
      _image(3, 0, '60px'),
      _des(3, '圆形'),
      {
        type: 'image',
        url: require('./assets/avatar.jpg'),
        css: {
          bottom: '40px',
          left: '40px',
          borderRadius: '50px',
          borderWidth: '10px',
          borderColor: 'yellow',
          width: '100px',
          height: '100px'
        }
      },
      {
        type: 'qrcode',
        content: 'https://github.com/sunnie1992/vue_canvas_poster',
        css: {
          bottom: '40px',
          left: '180px',
          color: 'red',
          borderWidth: '10px',
          borderColor: 'blue',
          width: '120px',
          height: '120px'
        }
      },
      {
        type: 'rect',
        css: {
          bottom: '40px',
          right: '40px',
          color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)',
          borderRadius: '20px',
          borderWidth: '10px',
          width: '120px',
          height: '120px'
        }
      },
      {
        type: 'text',
        text: 'borderWidth',
        css: {
          bottom: '40px',
          right: '200px',
          color: 'green',
          borderWidth: '2px'
        }
      }
    ]
  }
}
const startTop = 50
const startLeft = 20
const gapSize = 70
const common = {
  left: `${startLeft}px`,
  fontSize: '40px'
}

function _textDecoration(decoration, index, color) {
  return {
    type: 'text',
    text: decoration,
    css: [
      {
        top: `${startTop + index * gapSize}px`,
        color: color,
        textDecoration: decoration
      },
      common
    ]
  }
}

function _image(index, rotate, borderRadius) {
  return {
    type: 'image',
    url: require('./assets/avatar.jpg'),
    css: {
      top: `${startTop + 8.5 * gapSize}px`,
      left: `${startLeft + 160 * index}px`,
      width: '120px',
      height: '120px',
      shadow: '10px 10px 5px #888888',
      rotate: rotate,
      borderRadius: borderRadius
    }
  }
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22px',
      top: `${startTop + 8.5 * gapSize + 140}px`
    }
  }
  if (index === 3) {
    des.css.right = '60px'
  } else {
    des.css.left = `${startLeft + 120 * index + 30}px`
  }
  return des
}

function drawImgPoster() {
  return {
    width: '654px',
    height: '1140px',
    background: '#eee',
    views: [
      {
        type: 'image',
        url: require('./assets/avatar.jpg')
      },
      {
        type: 'text',
        text: '未设置height、width时',
        css: {
          right: '0px',
          top: '60px',
          fontSize: '30px'
        }
      },
      {
        type: 'image',
        url: require('./assets/avatar.jpg'),
        css: {
          width: '200px',
          height: '200px',
          top: '430px'
        }
      },
      {
        type: 'text',
        text: "mode: 'aspectFill' 或 无",
        css: {
          left: '210px',
          fontSize: '30px',
          top: '490px'
        }
      },
      {
        type: 'image',
        url: require('./assets/avatar.jpg'),
        css: {
          width: '200px',
          height: '200px',
          mode: 'scaleToFill',
          top: '650px'
        }
      },
      {
        type: 'text',
        text: "mode: 'scaleToFill'",
        css: {
          left: '210px',
          top: '710px',
          fontSize: '30px'
        }
      },
      {
        type: 'image',
        url: require('./assets/avatar.jpg'),
        css: {
          width: '200px',
          height: 'auto',
          top: '870px'
        }
      },
      {
        type: 'text',
        text: '设置height为auto',
        css: {
          left: '210px',
          top: '930px',
          fontSize: '30px'
        }
      }
    ]
  }
}
