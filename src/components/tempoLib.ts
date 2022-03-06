import IBeatTypeList from '../interface/IBeatLib'

const tempo: IBeatTypeList = {
  layer1: [
    {
      display: '大鼓',
      value: '1',
      image: 'drum.png'
    },
    {
      display: '小鼓',
      value: '2',
      image: 'snare.png'
    },
    {
      display: 'HiHat',
      value: '3',
      image: 'hihat.png'
    },
    {
      display: '大鼓＋小鼓',
      value: '4',
      image: 'drum_snare.png'
    },
    {
      display: '大鼓＋HiHat',
      value: '5',
      image: 'drum_hihat.png'
    },
    {
      display: '小鼓＋HiHat',
      value: '6',
      image: 'snare_hihat.png'
    },
    {
      display: 'tom1',
      value: '7',
      image: 'tom1.png'
    },
    {
      display: 'tom2',
      value: '8',
      image: 'tom2.png'
    },
    {
      display: 'tom3',
      value: '9',
      image: 'tom3.png'
    },
    {
      display: 'empty',
      value: '0',
      image: 'empty.png'
    },
    {
      display: 'double snare',
      value: '-',
      image: 'double_snare.png'
    },
    {
      display: 'double bass',
      value: '=',
      image: 'double_drum.png'
    }],
  layer2: [
    {
      display: 'crash',
      value: 'q',
      image: 'crash.png',
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
      display: 'snare_small',
      value: 'u',
      image: 'snare_small.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'tom1_small',
      value: 'i',
      image: 'tom1_small.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'tom2_small',
      value: 'o',
      image: 'tom2_small.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'tom3_small',
      value: 'p',
      image: 'tom3_small.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'small_hihat',
      value: '[',
      image: 'small_hihat.png',
      classList: ['imageLayerSubMain']
    },
    {
      display: 'empty',
      value: ']',
      image: 'empty.png',
      classList: ['imageLayerSubMain']
    }]
}

export default tempo
