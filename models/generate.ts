import satori from 'satori'
import { image, ticket } from './elementModel'

export type Play = {
  title: string
  company: string
  date: string
  startAt: string
}

export const generate = async (
  play: Play,
  // img: { src: string; height: number; width: number },
) => {
  const res = await fetch('/BIZUDGothic-Regular.woff')
  const fontData = await res.arrayBuffer()
  const svg = await satori(
    {
      // root
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundImage:
            ' linear-gradient(90deg, rgba(251, 213, 251, 1), rgba(149, 233, 243, 1))',
        },
        // card
        children: [
          // image(img),
          // {
          //   type: 'div',
          //   props: {
          //     children: 'WATCHED',
          //     style: {
          //       fontSize: '4rem',
          //       marginBottom: '1rem',
          //     },
          //   },
          // },
          ticket(play),
        ],
      },
    },
    {
      width: 600,
      height: 600,
      fonts: [
        {
          name: 'BIZ UDGothic',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
  await svg2png(svg)

  return svg
}

const svg2png = async (svg: string) => {
  // wasm init
  // もしinit済みなら何もしない
  // @ts-ignore
  try {
    // @ts-ignore
    await resvg.initWasm(
      fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm'),
    )
  } catch (e) {
    if (
      e instanceof Error &&
      e.message ===
        'Already initialized. The `initWasm()` function can be used only once.'
    ) {
      console.log('already init')
    } else {
      throw e
    }
  }
  const opts = {
    background: 'rgba(238, 235, 230, .9)',
    fitTo: {
      mode: 'width',
      value: 600,
    },
  }
  // @ts-ignore
  const resvgjs = new resvg.Resvg(svg, opts)
  const pngData = resvgjs.render()
  const pngBuffer = pngData.asPng()
  const url = URL.createObjectURL(new Blob([pngBuffer], { type: 'image/png' }))
  // download
  const a = document.createElement('a')
  a.download = 'test.png'
  a.href = url
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
