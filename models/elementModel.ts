import { Play } from './generate'
export const ticket = (play: Play) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      width: '500px',
      height: '200px',
      backgroundColor: 'transparent',
      borderRadius: '8px',
      border: '4px solid black',
    },
    children: [
      // left column
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '1rem',
            width: '350px',
            padding: '1rem',
          },
          children: [
            {
              type: 'div',
              props: {
                children: `『${play.title}』`,
                style: {
                  // 300pxで３行超えるときはフォントサイズ小さくする
                  fontSize: play.title.length > 15 ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                },
              },
            },
            {
              type: 'div',
              props: {
                children: play.company,
                style: {
                  fontSize: play.company.length > 15 ? '1rem' : '1.25rem',
                  fontWeight: 'bold',
                },
              },
            },
          ],
        },
      },
      // right column
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '150px',
            borderLeft: '2px dashed #888',
            padding: '1rem',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '1.25rem',
                  paddingBottom: '0.5rem',
                },
                children: play.date,
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '1.5rem',
                },
                children: play.startAt,
              },
            },
          ],
        },
      },
    ],
  },
})

export const image = (img: { src: string; height: number; width: number }) => {
  const { src, height: _height, width: _width } = img
  let height = _height
  let width = _width

  // アスペクト比を維持して、幅のほうがながければ幅400pxに合わわせて、高さのほうが長ければ高さ500pxに合わせる
  if (_width > _height) {
    height = (height / width) * 400
    width = 400
  } else {
    width = (width / height) * 500
    height = 500
  }

  console.log('width', width)
  console.log('height', height)

  return {
    type: 'div',
    props: {
      style: {
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        position: 'absolute',
        top: '25px',
        left: '25px',
      },
    },
  }
}
