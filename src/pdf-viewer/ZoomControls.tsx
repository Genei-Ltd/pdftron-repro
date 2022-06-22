import { ZoomController } from './types'

export type ZoomControlsProps = {
  zoom: ZoomController
}

export const ZoomControls = (props: ZoomControlsProps) => {
  const { zoom } = props
  return (
    <div
      style={{
        position: 'absolute',
        left: 10,
        bottom: 10,
        display: 'flex',
        border: '1px solid red'
      }}
    >
      <button onClick={() => zoom.changeBy(0.25)}>
        +
      </button>
      <button onClick={() => zoom.changeBy(-0.25)}>
        -
      </button>
      <button onClick={() => zoom.fitPage()}>
        Fit
      </button>
    </div>
  )
}
