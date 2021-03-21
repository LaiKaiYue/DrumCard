import IBeatTypeList from '../interface/IBeatLib'

const tempo: IBeatTypeList = {
  layer1: [
    {
      display: '大鼓',
      value: '1',
      image: '圖片1.png'
    },
    {
      display: '小鼓',
      value: '2',
      image: '圖片2.png'
    },
    {
      display: 'HiHat',
      value: '3',
      image: '圖片3.png'
    },
    {
      display: '大鼓＋小鼓',
      value: '4',
      image: '圖片4.png'
    },
    {
      display: '大鼓＋HiHat',
      value: '5',
      image: '圖片5.png'
    },
    {
      display: '小鼓＋HiHat',
      value: '6',
      image: '圖片6.png'
    },
    {
      display: 'tom1',
      value: '7',
      image: '圖片7.png'
    },
    {
      display: 'tom2',
      value: '8',
      image: '圖片8.png'
    },
    {
      display: 'tom3',
      value: '9',
      image: '圖片9.png'
    },
    {
      display: '清空',
      value: '0',
      image: '圖片0.png'
    },
    {
      display: 'double snare',
      value: '-',
      image: '圖片-.png'
    },
    {
      display: 'double bass',
      value: '=',
      image: '圖片=.png'
    }],
  layer2: [
    {
      display: 'crash',
      value: 'q',
      image: '圖片q.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'w',
      value: 'w',
      image: '圖片w.png',
      classList: ['imageLayerSubMainUp']
    },
    {
      display: 'e',
      value: 'e',
      image: '圖片e.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'r',
      value: 'r',
      image: '圖片r.png',
      classList: ['imageLayerSubMainUp']
    },
    {
      display: 't',
      value: 't',
      image: '圖片t.png',
      classList: ['imageLayerSubMainUp']
    },
    {
      display: 'y',
      value: 'y',
      image: '圖片y.png',
      classList: ['imageLayerSubMainDown']
    },
    {
      display: 'u',
      value: 'u',
      image: '圖片u.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'i',
      value: 'i',
      image: '圖片i.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'o',
      value: 'o',
      image: '圖片o.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'p',
      value: 'p',
      image: '圖片p.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: '[',
      value: '[',
      image: '圖片[.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: '清空',
      value: ']',
      image: '圖片0.png',
      classList: ['imageLayerSubMain']
    }]
}

export default tempo
